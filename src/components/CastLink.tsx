import { Box, Text } from "@chakra-ui/react";
import { SiFarcaster } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { frameUrl } from "../utils/formatting";
import { useState } from "react";

export const CastLink = ({ tokenId }: { tokenId: string }) => {
  const [hasCopied, setHasCopied] = useState(false);
  return (
    <CopyToClipboard text={frameUrl(tokenId)} onCopy={() => setHasCopied(true)}>
      <Box
        mt="1.5rem"
        display="flex"
        alignItems="center"
        gap=".5rem"
        _hover={{
          bg: "transparent",
          cursor: "pointer",
        }}
      >
        <Text fontSize="xs" color="brand.orange">
          Copy url to clipboard for casting in
        </Text>
        <Text color="brand.orange" fontSize="xs">
          <SiFarcaster />
        </Text>
        {hasCopied && (
          <Text color="brand.green" fontSize="xs">
            <FaCheck />
          </Text>
        )}
      </Box>
    </CopyToClipboard>
  );
};
