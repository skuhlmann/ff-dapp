import "./App.css";

import { usePrivy } from "@privy-io/react-auth";
import { Layout } from "./components/Layout";
import { Mint } from "./components/Mint";
import { Wallets } from "./components/Wallets";
// import { Wallets } from "./components/Wallets";

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  // todo - nft mint if logged in

  return (
    <Layout>
      <div className="App">
        <header className="App-header">
          <h1>Peach Tycoon</h1>
          {/* If the user is not authenticated, show a login button */}
          {/* If the user is authenticated, show the user object and a logout button */}
          {ready && authenticated ? (
            <div>
              <textarea
                readOnly
                value={JSON.stringify(user, null, 2)}
                style={{ width: "600px", height: "250px", borderRadius: "6px" }}
              />
              <br />
              <button
                onClick={logout}
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "rgb(227, 108, 30)",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Log Out
              </button>

              <Mint />
              <Wallets />
            </div>
          ) : (
            <button
              onClick={login}
              style={{
                padding: "12px",
                backgroundColor: "rgb(227, 108, 30)",
                color: "#FFF",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Log In
            </button>
          )}
        </header>
      </div>
    </Layout>
  );
}

export default App;
