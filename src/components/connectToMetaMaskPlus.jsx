import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

export  default function ConnectToMetaMask() {

    const divStyle = {
        margin : 100,
        width : 500
    }

    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const [status, setStatus] = useState("Connect to Network");

    // Token BAT: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenBalance, setTokenBalance] = useState("");

    const ERC20ABI = require('./erc20.abi.json');

    let fetchAccount = async () => {

        const accountName = await window.ethereum.request({method: 'eth_requestAccounts'});

        await setAccount(accountName[0]);
        // await console.log(account);
    };

    const fetchBalance = async (account) => {

        const data = await window.$provider.getBalance(account);

        await setBalance(ethers.utils.formatEther(data));
        await console.log(`balance: ${balance} ETH`);
    }

    const connectWalletHandler = async () => {

        // window.$provider= new ethers.providers.Web3Provider(window.ethereum);

        if(window.ethereum){

            setStatus("Connected");
        }else{

            setStatus("Not Connected");
        }
    }

    const getTokenHandler = async () => {

        const contract = new ethers.Contract(tokenAddress, ERC20ABI, window.$provider);
        const chainID = await window.ethereum.request({method: 'eth_chainId'});

        const fetchTokenData = async () => {
            const data = await contract.balanceOf(account);
            setTokenBalance(ethers.utils.formatEther(data));
            // console.log(`token balance: ${tokenBalance} BAT`);
        }

        if (chainID !== '0x1'){
            alert("Please connect to Mainnet!");
        }else if (chainID === '0x1' && account) {
            fetchTokenData()
                .catch(console.error)
        }else{
            alert("Please set the account first");
        }
    }

    const eventHandler = async () => {

        // It will not display balance the first time when I define
        // if (account === ""){

            window.$provider= new ethers.providers.Web3Provider(window.ethereum);

            await fetchAccount()
                .catch(console.error);

            await console.log(account);

            await fetchBalance(account)
                .catch(console.error);
        // }

        window.ethereum.on('chainChanged', async (chainId) => {

            window.$provider= new ethers.providers.Web3Provider(window.ethereum);
            await fetchAccount()
                .catch(console.error);

            await fetchBalance(account)
                .catch(console.error);
        });

        window.ethereum.on('accountsChanged', async (accounts) => {

            await setAccount(accounts);

            // await fetchAccount()
            //     .catch(console.error);

            await fetchBalance(accounts)
                .catch(console.error);
        });
    }

useEffect( () => {

        eventHandler()
            .catch(console.error)
        })

    return(
        <div style={divStyle}>
            <h2> Connect to MetaMask + </h2>
            <button onClick={connectWalletHandler}>{status}</button>
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
            <button onClick={getTokenHandler}>Get Token</button>
            <p>Token Balance: {tokenBalance}</p>
        </div>
    )
}