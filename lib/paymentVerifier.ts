import { parseEventLogs } from "viem";
import { getBasePublicClient } from "./serverWallet";

const ERC20_TRANSFER_ABI = [
  {
    name: "Transfer",
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
  },
] as const;

export function parsePaymentProof(authHeader: string): `0x${string}` | null {
  // Expected format: "x402 0x<txHash>"
  const parts = authHeader.trim().split(/\s+/);
  if (parts.length !== 2 || parts[0].toLowerCase() !== "x402") return null;
  const hash = parts[1];
  if (!/^0x[0-9a-fA-F]{64}$/.test(hash)) return null;
  return hash as `0x${string}`;
}

export async function verifyPayment(
  txHash: `0x${string}`,
  expectedEthWei: bigint,
  expectedErc20Units: bigint,
  payToAddress: `0x${string}`,
  erc20Address: `0x${string}`
): Promise<{
  valid: boolean;
  asset?: "ETH" | "USDC";
  fromAddress?: `0x${string}`;
  error?: string;
}> {
  const client = getBasePublicClient();

  let tx: Awaited<ReturnType<typeof client.getTransaction>>;
  try {
    tx = await client.getTransaction({ hash: txHash });
  } catch {
    return { valid: false, error: "Transaction not found on Base" };
  }

  // ETH payment path
  if (tx.value > 0n) {
    if (tx.to?.toLowerCase() !== payToAddress.toLowerCase()) {
      return { valid: false, error: "ETH payment sent to wrong address" };
    }
    if (tx.value < expectedEthWei) {
      return { valid: false, error: `ETH amount too low: got ${tx.value}, expected ${expectedEthWei}` };
    }

    let receipt: Awaited<ReturnType<typeof client.getTransactionReceipt>> | null;
    try {
      receipt = await client.getTransactionReceipt({ hash: txHash });
    } catch {
      return { valid: false, error: "Could not fetch ETH transaction receipt" };
    }
    if (!receipt || receipt.status !== "success") {
      return { valid: false, error: "ETH transaction did not succeed" };
    }

    return { valid: true, asset: "ETH", fromAddress: tx.from };
  }

  // USDC (ERC20) payment path — tx.value === 0n
  let receipt: Awaited<ReturnType<typeof client.getTransactionReceipt>> | null;
  try {
    receipt = await client.getTransactionReceipt({ hash: txHash });
  } catch {
    return { valid: false, error: "Could not fetch USDC transaction receipt" };
  }
  if (!receipt || receipt.status !== "success") {
    return { valid: false, error: "USDC transaction did not succeed" };
  }

  const logs = parseEventLogs({
    abi: ERC20_TRANSFER_ABI,
    logs: receipt.logs.filter(
      (l) => l.address.toLowerCase() === erc20Address.toLowerCase()
    ),
  });

  const matchingLog = logs.find(
    (l) => l.args.to.toLowerCase() === payToAddress.toLowerCase()
  );

  if (!matchingLog) {
    return { valid: false, error: "No USDC Transfer to merchant wallet found in transaction" };
  }

  if (matchingLog.args.value < expectedErc20Units) {
    return {
      valid: false,
      error: `USDC amount too low: got ${matchingLog.args.value}, expected ${expectedErc20Units}`,
    };
  }

  return { valid: true, asset: "USDC", fromAddress: matchingLog.args.from };
}
