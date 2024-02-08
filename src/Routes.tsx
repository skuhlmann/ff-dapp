import { Routes as Router, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import TreeMint from "./pages/TreeMint";
import Account from "./pages/Account";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tree" element={<TreeMint />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Router>
  );
};
