/**
 * Server-side loot minting via a pre-authorized shaman wallet.
 * Calls mintLoot on the Baal DAO contract using a private key from env.
 * Safe to call from API routes only — never expose to client.
 */

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, sepolia } from "viem/chains";
import DAOAbi from "@/abis/DAO.json";
import { CHAIN_OBJ, ALCHEMY_RPC, DISCOUNT_DAO_ADDRESS } from "@/utils/constants";

// 1 loot token in wei (18 decimals)
const LOOT_AMOUNT = 1_000_000_000_000_000_000n;

/**
 * Mints 1 loot token to the given recipient address using the shaman wallet.
 * Returns the transaction hash once the tx is confirmed on-chain.
 */
export async function mintLootToAddress(
  recipientAddress: `0x${string}`,
  chainid: string
): Promise<`0x${string}`> {
  const privateKey = process.env.DAO_SHAMAN_PK;
  if (!privateKey) throw new Error("DAO_SHAMAN_PK is not set");

  const daoAddress = DISCOUNT_DAO_ADDRESS[chainid] as `0x${string}`;
  if (!daoAddress) throw new Error(`No DAO address configured for chain ${chainid}`);

  const account = privateKeyToAccount(privateKey as `0x${string}`);

  const chain = CHAIN_OBJ;

  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(ALCHEMY_RPC),
  });

  const publicClient = createPublicClient({
    chain,
    transport: http(ALCHEMY_RPC),
  });

  const txHash = await walletClient.writeContract({
    account,
    address: daoAddress,
    abi: DAOAbi,
    functionName: "mintLoot",
    args: [[recipientAddress], [LOOT_AMOUNT]],
  });

  // Wait for on-chain confirmation before returning
  await publicClient.waitForTransactionReceipt({ hash: txHash });

  return txHash;
}
