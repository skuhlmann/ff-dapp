import { Image } from "@chakra-ui/react";
import { TreeNft } from "../utils/types";

export const TreeNftItem = ({ tree }: { tree?: TreeNft }) => {
  if (!tree) return null;
  return (
    <>
      <p>{tree.tokenMetadata?.name}</p>
      <Image src={tree.tokenMetadata?.image} width="100px" />
    </>
  );
};
