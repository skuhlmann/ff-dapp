import { SequenceIndexer } from "@0xsequence/indexer";
import { useQuery } from "react-query";
import { NFT_CONTRACT_ADDRESS, SEQUENCE_ENDPOINT } from "../utils/constants";

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
}: {
  accountAddress: string;
  contractAddress?: string;
}) => {
  if (!accountAddress || !contractAddress) {
    throw new Error("Missing Args");
  }

  const sequenceEndPoint = SEQUENCE_ENDPOINT;

  if (!sequenceEndPoint) {
    throw new Error("Invalid ChainId");
  }

  const indexer = new SequenceIndexer(sequenceEndPoint);

  const nftBalances = await indexer.getTokenBalances({
    contractAddress: contractAddress,
    accountAddress: accountAddress,
    includeMetadata: true,
  });

  console.log("nftBalances", nftBalances);

  return { balances: nftBalances, page: nftBalances.page };
};

export const useAccountNfts = ({
  accountAddress,
}: {
  accountAddress: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`accountNfts-${accountAddress}`],
    () =>
      fetchNftsForAccount({
        accountAddress,
        contractAddress: NFT_CONTRACT_ADDRESS,
      }),
    { enabled: !!NFT_CONTRACT_ADDRESS }
  );

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};
