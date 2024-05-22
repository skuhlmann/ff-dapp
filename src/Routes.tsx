import { Routes as Router, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Farm from "./pages/Farm";
import About from "./pages/About";
import BuyTrees from "./pages/BuyTrees";
import Leaderboard from "./pages/Leaderboard";
import Marketplace from "./pages/Marketplace";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buy-trees" element={<BuyTrees />} />
        <Route path="farm" element={<Farm />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="market" element={<Marketplace />} />
        <Route path="account" element={<Account />} />
        <Route path="about" element={<About />} />
      </Route>
    </Router>
  );
};
