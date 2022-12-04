// import React and useState hook to define ...
// ... initial value for address and chainID to be NULL
import React, {useState} from "react";

// Define input fields to receive address and chain ID ...
// ... and show balance of address
export  default function Balance() {

    // CSS Style
    const divStyle = {
        margin : 50,
        width : 1000
    }

    // We use address and chainID to display the address.balance ...
    //... on a specific chain
    const [address, setAddress] = useState("");
    const [chainID, setChainID] = useState("");
    const [balance, setBalance] = useState("");

    // Token BAT: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenBalance, setTokenBalance] = useState("");


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

    const handleSubmit = async (e)=>{

        e.preventDefault();

        let url = chainNum[chainID].address;
        const ethers = require('ethers');
        const provider = ethers.getDefaultProvider(url);

        // Getting ERC20 ABI and create and instance of contract:
        const ERC20ABI = require('./erc20.abi.json');
        const contract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

        const balanceInEth = ethers.utils.formatEther(await provider.getBalance(address));
        console.log(`balance: ${balanceInEth} ETH`);
        setBalance(balanceInEth);

        // Display token address:
        const tokenBalanceInEth = ethers.utils.formatEther(await contract.balanceOf(address));
        setTokenBalance(tokenBalanceInEth);
        console.log(`token balance: ${tokenBalanceInEth } BAT`);
    }

    return (
        <div style={divStyle}>
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
                <label>
                    Token Address:
                </label>
                <input
                    type="text"
                    required
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
                <input type="submit" value="Submit" />
                <h4> You chose the following address: </h4>
                <h6>{address}</h6>
                <h4> You chose the following chain:</h4>
                <h6> {chainNum[chainID]?.name}</h6>
                <h4> Your balance is: </h4>
                <h6> {balance}</h6>
                <h4> The Token Balance is: </h4>
                <h6>{tokenBalance}</h6>
            </form>
        </div>
    );
}