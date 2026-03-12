import { NextRequest, NextResponse } from "next/server";
import { isAddress, parseEventLogs } from "viem";
import {
  getBasePublicClient,
  getOwnerWalletClient,
  getOwnerAddress,
  NFT_ADDRESS_BASE,
  PAYMENT_ERC20_ADDRESS,
  PAYMENT_ERC20_DECIMALS,
} from "@/lib/serverWallet";
import { parsePaymentProof, verifyPayment } from "@/lib/paymentVerifier";
import GrapeERC721Abi from "@/abis/GrapeERC721.json";

const PRODUCT_ID = "0x1b8d8139772599a636410245bd4E1e6ab304558e";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, Idempotency-Key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory idempotency store. Lost on restart — contract supply cap is the final safety net.
const idempotencyStore = new Map<
  string,
  { status: string; token_id?: number | null; tx_hash?: string }
>();

async function fetchPrices(ownerAddress: `0x${string}`) {
  const client = getBasePublicClient();
  const [priceEthWei, priceErc20Units, totalSupply, maxSupply] =
    await Promise.all([
      client.readContract({
        address: NFT_ADDRESS_BASE,
        abi: GrapeERC721Abi,
        functionName: "getMintPrice",
        args: [ownerAddress, false],
      }) as Promise<bigint>,
      client.readContract({
        address: NFT_ADDRESS_BASE,
        abi: GrapeERC721Abi,
        functionName: "getMintPrice",
        args: [ownerAddress, true],
      }) as Promise<bigint>,
      client.readContract({
        address: NFT_ADDRESS_BASE,
        abi: GrapeERC721Abi,
        functionName: "totalSupply",
      }) as Promise<bigint>,
      client.readContract({
        address: NFT_ADDRESS_BASE,
        abi: GrapeERC721Abi,
        functionName: "maxSupply",
      }) as Promise<bigint>,
    ]);
  return { priceEthWei, priceErc20Units, totalSupply, maxSupply };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  let body: { product_id?: string; recipient_wallet?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { product_id, recipient_wallet } = body;

  if (product_id?.toLowerCase() !== PRODUCT_ID.toLowerCase()) {
    return NextResponse.json(
      { error: "Unknown product_id" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (!recipient_wallet || !isAddress(recipient_wallet)) {
    return NextResponse.json(
      { error: "Invalid recipient_wallet address" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  let ownerAddress: `0x${string}`;
  try {
    ownerAddress = getOwnerAddress();
  } catch (err) {
    console.error("[purchase] Owner wallet not configured:", err);
    return NextResponse.json(
      { error: "Server not configured for minting" },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  const { priceEthWei, priceErc20Units, totalSupply, maxSupply } =
    await fetchPrices(ownerAddress);

  // Check supply
  if (totalSupply >= maxSupply) {
    return NextResponse.json(
      { error: "Sold out" },
      { status: 410, headers: CORS_HEADERS }
    );
  }

  const authHeader = req.headers.get("authorization");

  // ── Path A: No auth header → return 402 with payment options ──
  if (!authHeader) {
    return NextResponse.json(
      {
        payment_options: [
          {
            protocol: "x402",
            network: "base",
            asset: "ETH",
            amount: (Number(priceEthWei) / 1e18).toFixed(6),
            pay_to: ownerAddress,
          },
          {
            protocol: "x402",
            network: "base",
            asset: "USDC",
            amount: (Number(priceErc20Units) / 10 ** PAYMENT_ERC20_DECIMALS).toFixed(2),
            token_address: PAYMENT_ERC20_ADDRESS,
            pay_to: ownerAddress,
          },
        ],
        product_id: PRODUCT_ID,
      },
      { status: 402, headers: CORS_HEADERS }
    );
  }

  // ── Path B: Auth header present → verify payment and mint ──
  const txHash = parsePaymentProof(authHeader);
  if (!txHash) {
    return NextResponse.json(
      { error: "Malformed Authorization header. Expected: x402 <txHash>" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Idempotency check
  const idempotencyKey = req.headers.get("idempotency-key") ?? "";
  if (idempotencyKey && idempotencyStore.has(idempotencyKey)) {
    return NextResponse.json(idempotencyStore.get(idempotencyKey)!, {
      headers: CORS_HEADERS,
    });
  }

  // Re-check supply before minting
  if (totalSupply >= maxSupply) {
    return NextResponse.json(
      { error: "Sold out" },
      { status: 410, headers: CORS_HEADERS }
    );
  }

  // Verify payment on-chain
  const verification = await verifyPayment(
    txHash,
    priceEthWei,
    priceErc20Units,
    ownerAddress,
    PAYMENT_ERC20_ADDRESS
  );

  if (!verification.valid) {
    return NextResponse.json(
      { error: "Payment verification failed", detail: verification.error },
      { status: 422, headers: CORS_HEADERS }
    );
  }

  // Mint
  let mintTxHash: `0x${string}`;
  try {
    const { account, walletClient } = getOwnerWalletClient();
    mintTxHash = await walletClient.writeContract({
      address: NFT_ADDRESS_BASE,
      abi: GrapeERC721Abi,
      functionName: "mintTo",
      args: [[recipient_wallet as `0x${string}`]],
      account,
    });
  } catch (err) {
    console.error("[purchase] mintTo failed:", err);
    return NextResponse.json(
      { error: "Mint transaction failed", detail: String(err) },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  // Wait for receipt
  const client = getBasePublicClient();
  let receipt: Awaited<ReturnType<typeof client.waitForTransactionReceipt>> | null = null;
  try {
    receipt = await client.waitForTransactionReceipt({
      hash: mintTxHash,
      timeout: 60_000,
    });
  } catch {
    // Timeout — return 202 so agent can poll
    return NextResponse.json(
      { status: "pending", mint_tx_hash: mintTxHash },
      { status: 202, headers: CORS_HEADERS }
    );
  }

  // Parse tokenId from Transfer(address(0), recipient, tokenId) event
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  let tokenId: number | null = null;
  try {
    const transferLogs = parseEventLogs({
      abi: GrapeERC721Abi as Parameters<typeof parseEventLogs>[0]["abi"],
      eventName: "Transfer",
      logs: receipt.logs,
    });
    type TransferArgs = { from: string; tokenId: bigint };
    const mintLog = transferLogs.find(
      (l) => (l as unknown as { args: TransferArgs }).args.from === ZERO_ADDRESS
    );
    if (mintLog) {
      tokenId = Number((mintLog as unknown as { args: TransferArgs }).args.tokenId);
    }
  } catch (err) {
    console.warn("[purchase] Could not parse tokenId from logs:", err);
  }

  const result = { status: "success", token_id: tokenId, tx_hash: mintTxHash };

  if (idempotencyKey) {
    idempotencyStore.set(idempotencyKey, result);
  }

  return NextResponse.json(result, { headers: CORS_HEADERS });
}
