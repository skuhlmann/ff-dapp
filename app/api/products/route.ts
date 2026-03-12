import { NextResponse } from "next/server";
import { getBasePublicClient, NFT_ADDRESS_BASE, PAYMENT_ERC20_ADDRESS, PAYMENT_ERC20_DECIMALS } from "@/lib/serverWallet";
import GrapeERC721Abi from "@/abis/GrapeERC721.json";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
};

export async function GET() {
  if (
    !NFT_ADDRESS_BASE ||
    NFT_ADDRESS_BASE === "0x0000000000000000000000000000000000000000"
  ) {
    return NextResponse.json(
      { error: "Contract not configured" },
      { status: 503, headers: CORS_HEADERS }
    );
  }

  try {
    const client = getBasePublicClient();
    const ownerAddress = process.env.OWNER_WALLET_ADDRESS as `0x${string}`;

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

    const available = Number(maxSupply - totalSupply);

    const product = {
      id: NFT_ADDRESS_BASE,
      name: "Alpha Red Wine Bottle",
      description:
        "A limited release red wine blend from Colorado's Grand Valley AVA. Merlot · Mourvèdre · Malbec · Zweigelt. Each token includes a unique skele-grape digital collectible.",
      price_eth: Number(priceEthWei) / 1e18,
      price_usdc: Number(priceErc20Units) / 10 ** PAYMENT_ERC20_DECIMALS,
      payment_token_address: PAYMENT_ERC20_ADDRESS,
      available,
      redeemable: true,
      vintage: "2024",
      token_contract: NFT_ADDRESS_BASE,
    };

    return NextResponse.json([product], { headers: CORS_HEADERS });
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
