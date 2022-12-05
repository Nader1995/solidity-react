import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./components/layout";
import Button from "./components/button";
import Balance from "./components/balance";
import ConnectToMetaMask from "./components/connectToMetaMask";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Button" element={<Button />} />
            <Route path="Balance" element={<Balance />} />
            <Route path="ConnectToMetaMask" element={<ConnectToMetaMask />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
