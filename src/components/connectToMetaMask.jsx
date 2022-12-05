import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

export  default function ConnectToMetaMask() {

    const divStyle = {
        margin : 100,
        width : 500
    }

    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");

    const connectWalletHandler = async () => {

			// Define global variable: 
            window.$provider= new ethers.providers.Web3Provider(window.ethereum);

            const accountName = await window.ethereum.request({method: 'eth_requestAccounts'});
            setAccount(accountName[0]);

    }

    useEffect(() => {
	
        if (account){
            // declare the data fetching function
                const fetchData = async () => {
                const data = await window.$provider.getBalance(account);
                setBalance(ethers.utils.formatEther(data));
            }

            // call the function
            fetchData()
                // make sure to catch any error
                .catch(console.error);
        }
    }, [account])

    return(
        <div style={divStyle}>
            <h2> Connect to MetaMask </h2>
            <button onClick={connectWalletHandler}>Click Here</button>
            <p>Address: {account}</p>
            <p>Balance: {balance}</p>
        </div>
    )
}