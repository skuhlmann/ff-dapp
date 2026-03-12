import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

// Always Base mainnet — never reads NEXT_PUBLIC_TARGET_NETWORK.
// Server-only: never import this from client components.

const BASE_RPC = "https://base-rpc.publicnode.com";

export const NFT_ADDRESS_BASE: `0x${string}` =
  "0x1b8d8139772599a636410245bd4E1e6ab304558e";

export const PAYMENT_ERC20_ADDRESS: `0x${string}` =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base

export const PAYMENT_ERC20_DECIMALS = 6;

if (
  !NFT_ADDRESS_BASE ||
  NFT_ADDRESS_BASE === "0x0000000000000000000000000000000000000000"
) {
  console.warn("[serverWallet] WARNING: NFT_ADDRESS_BASE is the zero address. Agent commerce will not function.");
}

export function getBasePublicClient() {
  return createPublicClient({
    chain: base,
    transport: http(BASE_RPC),
  });
}

export function getOwnerWalletClient() {
  const pk = process.env.OWNER_PRIVATE_KEY as `0x${string}` | undefined;
  if (!pk || pk === "0x_REPLACE_WITH_CONTRACT_OWNER_PRIVATE_KEY") {
    throw new Error("OWNER_PRIVATE_KEY is not set");
  }
  const account = privateKeyToAccount(pk);
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(BASE_RPC),
  });
  return { account, walletClient };
}

export function getOwnerAddress(): `0x${string}` {
  const addr = process.env.OWNER_WALLET_ADDRESS as `0x${string}` | undefined;
  if (!addr || addr === "0x_REPLACE_WITH_CONTRACT_OWNER_ADDRESS") {
    throw new Error("OWNER_WALLET_ADDRESS is not set");
  }
  return addr;
}
