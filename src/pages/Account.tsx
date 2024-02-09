import { Flex, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { PageHeader } from "../components/PageHeader";
import { RouteLink } from "../components/RouteLink";
import { AccountAvatar } from "../components/AccountAvatar";
import { AccountActions } from "../components/AccountActions";
// import { useEnsAvatar, useEnsName } from "wagmi";
// import { normalize } from "viem/ens";

function Account() {
  const { ready, authenticated, user } = usePrivy();

  // const result = useEnsName({
  //   address: user?.wallet?.address as `0x${string}` | undefined,
  // });

  // const avatarResult = useEnsAvatar{
  //   name: normalize("wevm.eth"),
  // });

  // console.log("result", result.data);
  // console.log("avatarResult", avatarResult);

  if (!ready) {
    return null;
  }

  // console.log("user", user?.wallet?.address);

  return (
    <PageHeader>
      {authenticated && user && user.wallet ? (
        <>
          <AccountAvatar address={user?.wallet.address} />
          <AccountActions />
        </>
      ) : (
        <Text>No Wallet found</Text>
      )}

      <Flex justifyContent="space-around" w="100%" flexWrap="wrap">
        <RouteLink linkText="Market" path="/play" direction="right" />
        <RouteLink linkText="Your Farm" path="/farm" direction="right" />
      </Flex>
    </PageHeader>
  );
}

export default Account;

//  {/* {ready && authenticated && (
//     <textarea
//       readOnly
//       value={JSON.stringify(user, null, 2)}
//       style={{ width: "600px", height: "250px", borderRadius: "6px" }}
//     />
//   )}

//   <Wallets /> */}

//   {/* <Text>Actions</Text>
//   <Box border="1px solid white">
//     <UnorderedList>
//       <ListItem>Fund your wallet...</ListItem>
//       <ListItem>Export wallet...</ListItem>
//       <ListItem>Update settings...</ListItem>
//       <ListItem>Unlink email...</ListItem>
//       <ListItem>Add a password...</ListItem>
//     </UnorderedList>
//   </Box> */}
