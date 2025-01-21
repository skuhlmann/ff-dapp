import { Routes as Router, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Cellar from "./pages/Cellar";
import About from "./pages/About";
import BuyWine from "./pages/BuyWine";
import Leaderboard from "./pages/Leaderboard";
import Marketplace from "./pages/Marketplace";
import ShippingLocations from "./pages/ShippingLocations";
// import Listing from "./pages/Listing";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buy-wine" element={<BuyWine />} />
        <Route path="cellar" element={<Cellar />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="market" element={<Marketplace />} />
        {/* <Route path="market/:tokenId" element={<Listing />} /> */}
        <Route path="account" element={<Account />} />
        <Route path="about" element={<About />} />
        <Route path="shipping" element={<ShippingLocations />} />
      </Route>
    </Router>
  );
};
