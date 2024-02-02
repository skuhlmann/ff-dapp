import { useWallets } from "@privy-io/react-auth";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

export const Wallets = () => {
  const { wallets } = useWallets();
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi();

  return (
    <div>
      <h2>Active Wallet {activeWallet?.address}</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.address}>
            <button onClick={() => setActiveWallet(wallet)}>
              Activate {wallet.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
