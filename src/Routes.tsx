import { Routes as Router, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Play from "./pages/Play";
import Farm from "./pages/Farm";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="play" element={<Play />} />
        <Route path="farm" element={<Farm />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Router>
  );
};
