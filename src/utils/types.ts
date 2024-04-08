export type TreeNft = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image: string;
    name: string;
    description: string;
  };
};

export type WateringRes = {
  count: number;
  waterings: {
    createdAt: number;
    tokenId: string;
    createdBy: string;
    wateringDay: string;
  };
  today: boolean;
};

export type EnsData = {
  ensName: string | null;
  ensText: string | undefined;
};

export type LeadersRes = Array<Array<string | number | EnsData>>;
