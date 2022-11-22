import React, {useState} from "react";

// Extra: 1
// import Fortmatic from 'fortmatic';
// import {ethers} from 'ethers';

export  default function Balance() {

    const [address, setAddress] = useState("");
    const [chainID, setChainID] = useState("");

    //Extra: 2
    const Web3 = require('web3');

    // Goerli
    // let url = 'https://goerli.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe';

    //Sepolia
    // let url = 'https://sepolia.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe';

    // Ganache
    let url = 'HTTP://127.0.0.1:7545';

    // let url = new Array(3).fill('');
    // url[0][0] = 'https://sepolia.infura.io/v3/5ce1f1a940c747edae9706d2b73428fe';

    let web3 = new Web3(new Web3.providers.HttpProvider(url));

    async function getEthBalance(address) {

        await web3.eth.getBalance(address, (err, balance) => {

            console.log(address + " Balance: ", web3.utils.fromWei(balance)) });
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        // const info = {address, chainID};
        getEthBalance(address).then(r => {});

        // console.log(info);

        // Extra: 1
        // const fm = new Fortmatic('pk_test_8D23FBCB660FFD0A', 'rinkeby');
        // const provider = new ethers.providers.Web3Provider(fm.getWebSocketProvider());
        // const signer = provider.getSigner();
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
                <p> {address}</p>
                <p> {chainID}</p>
            </form>
        </div>
    );
}