export type TreeNft = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image: string;
    name: string;
    description: string;
  };
};
