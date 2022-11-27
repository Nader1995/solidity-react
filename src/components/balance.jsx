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

    // Define a dictionary to include different chain ID and chain name
    const chainNum = {

        // Localhost:
        0 : {
            address: "HTTP://127.0.0.1:7545",
            name:"Localhost",
        },

        // Ethereum: Main net
        1 : {
            address: "https://mainnet.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe",
            name: "Ethereum Main Net",
        },

        // Ethereum: Goerli
        5: {
            address: "https://goerli.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe",
            name: "Ethereum Goerli Test Net",
        },

        // Ethereum: Sepolia
        11155111: {
            address: "https://sepolia.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe",
            name: "Ethereum Sepolia Test Net",
        },
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let url = chainNum[chainID].address;

        // Use ethers to connect to network
        const ethers = require('ethers');

        const provider = ethers.getDefaultProvider(url);

        provider.getBalance(address).then((balance) => {

            // convert a currency unit from wei to ether
            const balanceInEth = ethers.utils.formatEther(balance)
            console.log(`balance: ${balanceInEth} ETH`)
        })
    }


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
                <p> You chose the following address: </p>
                <p>{address}</p>
                <p> You chose the following chain:</p>

                {/* We use ?. to avoid any undefined value warning */}
                <p> {chainNum[chainID]?.name}</p>

            </form>
        </div>
    );
}