import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

export  default function ConnectToMetaMask() {

    const divStyle = {
        margin : 100,
        width : 500
    }


    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");

    // Token BAT: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenBalance, setTokenBalance] = useState("");

    window.$provider= new ethers.providers.Web3Provider(window.ethereum);

    const ERC20ABI = require('./erc20.abi.json');

    const fetchBalanceData = async (_account) => {
        const data = await window.$provider.getBalance(_account);
        setBalance(ethers.utils.formatEther(data));
        console.log(`balance: ${balance} ETH`);
    }

    const contract = new ethers.Contract(tokenAddress, ERC20ABI, window.$provider);

    const fetchTokenData = async (_account) => {
        const data = await contract.balanceOf(_account);
        setTokenBalance(ethers.utils.formatEther(data));
        console.log(`token balance: ${tokenBalance} BAT`);
    }

    const connectWalletHandler = async () => {

        const accountName = await window.ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accountName[0]);
    }

    const getBalanceHandler = async () => {

        if (account !== ""){

            await fetchBalanceData(account)
                .catch(console.error);

            await fetchTokenData(account)
                .catch(console.error)
        }
    }

    useEffect(() => {

        getBalanceHandler()
            .catch(console.error);
    })

    return(
        <div style={divStyle}>
            <h2> Connect to MetaMask </h2>
            <label>
                Token Address:
            </label>
            <input
                type="text"
                required
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <button onClick={connectWalletHandler}>Click Here</button>
            <p>Account Address: {account}</p>
            <p>Balance: {balance}</p>
            <p>Token Balance: {tokenBalance}</p>
        </div>
    )
}