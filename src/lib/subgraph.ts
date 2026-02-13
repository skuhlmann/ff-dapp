/**
 * Server-side subgraph helper for DAO member lookups.
 * No React context — safe to call from API routes.
 */

import { GraphQLClient } from "graphql-request";
import { FIND_MEMBER } from "@/utils/queries";
import { getGraphUrl } from "@/utils/endpoints";
import { MemberItem } from "@/utils/types";

type MemberQueryResult = { member: MemberItem | null };

/**
 * Fetch a DAO member record from the Daohaus subgraph.
 * Returns null if the member does not exist.
 */
export async function fetchMember({
  chainid,
  daoid,
  memberAddress,
}: {
  chainid: string;
  daoid: string;
  memberAddress: string;
}): Promise<MemberItem | null> {
  const graphKey = process.env.NEXT_PUBLIC_GRAPH_KEY;
  if (!graphKey) throw new Error("NEXT_PUBLIC_GRAPH_KEY is not set");

  const url = getGraphUrl({ chainid, graphKey, subgraphKey: "DAOHAUS" });
  const client = new GraphQLClient(url);

  // Daohaus member id format: {daoAddress}-member-{memberAddress}
  const memberid = `${daoid.toLowerCase()}-member-${memberAddress.toLowerCase()}`;

  const result = (await client.request(FIND_MEMBER, {
    memberid,
  })) as MemberQueryResult;

  return result.member ?? null;
}

/**
 * Returns true if the wallet already holds ≥1 loot token in the DAO.
 */
export async function walletHasLoot({
  chainid,
  daoid,
  memberAddress,
}: {
  chainid: string;
  daoid: string;
  memberAddress: string;
}): Promise<boolean> {
  const member = await fetchMember({ chainid, daoid, memberAddress });
  if (!member) return false;
  return BigInt(member.loot) > 0n;
}
