// import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

import { PageHeader } from "../components/PageHeader";
import { TreePreview } from "../components/TreePreview";
import { LogIn } from "../components/LogIn";
import { TreeList } from "../components/TreeList";
import { Box } from "@chakra-ui/react";
import { RouteLink } from "../components/RouteLink";

// states
// // unconnected - login/signup
// // connected && needs funds - or needs funds is more on the mint and used elsewhere
// //  connected = mint && see farm

// todo: add gas to target

function Farm() {
  const { ready, authenticated, user } = usePrivy();

  console.log("user", user);

  return (
    <>
      <PageHeader title="THE FARM" superTitle="PΞACH TYCOON">
        {!ready && null}

        {ready && !authenticated && <LogIn />}

        {ready && authenticated && user?.wallet?.address && (
          <Box mt="3rem">
            <Box mb="3rem">
              <TreeList address={user.wallet.address} />
            </Box>
            <RouteLink linkText="Back" path="/play" direction="left" />
          </Box>
        )}
      </PageHeader>
    </>
  );
}

export default Farm;
