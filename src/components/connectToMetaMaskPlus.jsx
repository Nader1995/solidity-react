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

    const ERC20ABI = require('./erc20.abi.json');
    
    const connectWalletHandler = async () => {

        if (account) {

            const contract = new ethers.Contract(tokenAddress, ERC20ABI, window.$provider);
            const chainID = await window.ethereum.request({method: 'eth_chainId'});

            const fetchTokenData = async () => {
                const data = await contract.balanceOf(account);
                setTokenBalance(ethers.utils.formatEther(data));
            }

            if (chainID !== '0x1'){
                alert("Please connect to Mainnet!");
            }else {
                fetchTokenData()
                    .catch(console.error)
            }
        }
    }

    useEffect(() => {

        window.$provider= new ethers.providers.Web3Provider(window.ethereum);

            const fetchData = async () => {
                const accountName = await window.ethereum.request({method: 'eth_requestAccounts'});

                setAccount(accountName[0]);
            };

            fetchData()
                .catch(console.error);

            const fetchBalanceData = async () => {

                const data = await window.$provider.getBalance(account);
                setBalance(ethers.utils.formatEther(data));
            }

            fetchBalanceData()
                .catch(console.error);

            window.ethereum.on('chainChanged', () => {

                window.$provider= new ethers.providers.Web3Provider(window.ethereum);
                fetchData()
                    .catch(console.error);

                fetchBalanceData()
                    .catch(console.error);
            });

            window.ethereum.on('accountsChanged', () => {

                fetchData()
                    .catch(console.error);

                fetchBalanceData()
                    .catch(console.error);
                });

        }, [account, balance, tokenAddress, tokenBalance, ERC20ABI])

    return(
        <div style={divStyle}>
            <h2> Connect to MetaMask </h2>
            <p>Account Address: {account}</p>
            <p>Balance: {balance}</p>
            <label>
                Enter Mainnet Token Address:
            </label>
            <input
                type="text"
                required
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <button onClick={connectWalletHandler}>Get Token</button>
            <p>Token Balance: {tokenBalance}</p>
        </div>
    )
}
