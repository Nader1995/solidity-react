// import React and useState hook to define ...
// ... initial value for address and chainID to be NULL
import React, {useState} from "react";

// Define input fields to receive address and chain ID ...
// ... and show balance of address
export  default function Balance() {

    // We use address and chainID to display the address.balance ...
    //... on a specific chain
    const [address, setAddress] = useState("");
    const [chainID, setChainID] = useState("");

    // Store web3 module in Web3 variable
    const Web3 = require('web3');

    // Ganache RPC Server
    let url = 'HTTP://127.0.0.1:7545';

    // Call Provider
    let web3 = new Web3(new Web3.providers.HttpProvider(url));

    // Pure JS part: waiting for the thread to ...
    //... fetch the address balance and display it in console
    async function getEthBalance(address) {

        await web3.eth.getBalance(address, (err, balance) => {
            console.log(address + " Balance: ", web3.utils.fromWei(balance))

        });
    }

    // On click: display address.balance and clear the fields
    const handleSubmit = (e) => {

        e.preventDefault();

        getEthBalance(address).then(r => {});

    }

    // Create Address and chainID fields, and button
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2> Address to Balance: </h2>
                <label>
                    Address:
                </label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label>
                    Chain ID:
                </label>
                <input
                    type="text"
                    required
                    value={chainID}
                    onChange={(e) => setChainID(e.target.value)}
                />
                <input type="submit" value="Submit" />
                <p> {address}</p>
                <p> {chainID}</p>
            </form>
        </div>
    );
}