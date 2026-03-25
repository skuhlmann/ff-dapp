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

    const inventoryTotal = Number(maxSupply);
    const inventoryRemaining = Number(maxSupply - totalSupply);

    const product = {
      id: "alpha-red-2024",
      name: "Alpha Red Wine Bottle",
      description:
        "A limited release red wine blend from Colorado's Grand Valley AVA. Merlot · Mourvèdre · Malbec · Zweigelt. Each token includes a unique skele-grape digital collectible.",
      price: {
        eth: Number(priceEthWei) / 1e18,
        usdc: Number(priceErc20Units) / 10 ** PAYMENT_ERC20_DECIMALS,
        currencies: ["ETH", "USDC"],
      },
      payment_token_address: PAYMENT_ERC20_ADDRESS,
      inventory_total: inventoryTotal,
      inventory_remaining: inventoryRemaining,
      availability_status: inventoryRemaining > 0 ? "available" : "sold_out",
      vintage: "2024",
      drink_window_start: 2026,
      peak_window: "2028-2032",
      shipping_region: "United States",
      redeemable: true,
      tradable: true,
      giftable: true,
      human_redemption_required: true,
      contract_address: NFT_ADDRESS_BASE,
      purchase_endpoint: "https://forgottenfruit.xyz/api/agent/purchase",
      last_updated: new Date().toISOString(),
    };

    return NextResponse.json({ products: [product] }, { headers: CORS_HEADERS });
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
