import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="./button">Button</Link>
        </li>
        <li>
          <Link to="./balance">Balance</Link>
        </li>
        <li>
          <Link to="./connectToMetaMask">Connect To Meta Mask</Link>
        </li>
      </ul>
    </nav>
  );
}
