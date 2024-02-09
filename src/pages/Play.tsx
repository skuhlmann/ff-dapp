// import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

import { PageHeader } from "../components/PageHeader";
import { TreePreview } from "../components/TreePreview";
import { LogIn } from "../components/LogIn";
import { BalanceCheck } from "../components/BalanceCheck";
import { NFT_MINT_PRICE } from "../utils/constants";

// states
// // unconnected - login/signup
// // connected && needs funds - or needs funds is more on the mint and used elsewhere
// //  connected = mint && see farm

// todo: add gas to target

function Play() {
  // const [playState, setPlayState] = useState("unconnected");
  const { ready, authenticated, user } = usePrivy();

  console.log("user", user);

  return (
    <>
      <PageHeader title="BUY TREES" superTitle="PΞACH TYCOON">
        {!ready && null}

        <TreePreview />

        {ready && !authenticated && <LogIn />}

        {ready && authenticated && user?.wallet && (
          <BalanceCheck
            address={user.wallet.address}
            targetBalance={NFT_MINT_PRICE}
          >
            <p>poopin</p>
          </BalanceCheck>
        )}
      </PageHeader>
    </>
  );
}

export default Play;
