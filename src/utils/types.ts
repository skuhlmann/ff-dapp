export type TreeNft = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image?: string;
    name: string;
    description?: string;
  };
};

export type PeachNft = {
  tokenID: string;
  contractAddress: string;
  tokenMetadata?: {
    image?: string;
    name: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { [key: string]: any }[];
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

export type PeachOrderData = {
  webUrl: string;
  checkoutId: string;
  orderId: string;
  createdAt: string;
};
