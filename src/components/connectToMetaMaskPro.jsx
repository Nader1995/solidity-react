import Web3Modal from "web3modal";
import {useState} from "react";
import {ethers} from "ethers";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


const providerOptions = {
    binancechainwallet: {
        package: true,
    },
    // coinbasewallet: {
    //     package: CoinbaseWalletSDK, // Required
    //     options: {
    //         appName: "Coinbase", // Required
    //         infuraId: process.env.INFURA_ID, // Required
    //         chainId: 11155111, //4 for Rinkeby, 1 for mainnet (default)
    //     },
    // },

    // walletconnect: {
    //     package: WalletConnect, // required
    //     options: {
    //         infuraId: process.env.INFURA_ID // required
    //     }
}

export  default function ConnectToMetaMaskPro() {

    const [connectedAccount, setConnectedAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    async function getAccountAddress(library){

        const web3Accounts = await library.listAccounts();
        setConnectedAccount(web3Accounts[0]);
    }

    async function getAccountBalance(library){

        const web3Accounts = await library.listAccounts();
        const data = await library.getBalance(web3Accounts[0]);
        setBalance(ethers.utils.formatEther(data));
    }

    async function getAccountToken(library){

        const network = await library.getNetwork();
    }

    async function connectHandler (web3Provider) {

        let library = new ethers.providers.Web3Provider(web3Provider);

        await getAccountAddress(library);
        await getAccountBalance(library);
        await getAccountToken(library);
        }

    const connectWeb3Wallet = async () => {

        try{
            window.$web3Modal = new Web3Modal({
                // network: "sepolia",
                theme: "dark",
                cacheProvider:false,
                providerOptions,
            });

            window.$web3Provider = await window.$web3Modal.connect();
            await connectHandler(window.$web3Provider);

        }catch (error){

            console.error(error);
        }
    };

    const disconnectWeb3Modal = async () => {
        await window.$web3Modal.clearCachedProvider();
        setConnectedAccount("");
    };

    window.ethereum.on('accountsChanged', async ()=> {

        if(connectedAccount) {
            setConnectedAccount("Wait to fetch data");
            setBalance("wait to fetch data");
            await connectHandler(window.$web3Provider);
            console.log("account changed");
        }
    });

    window.ethereum.on('chainChanged', async ()=>{

        if(connectedAccount){
            setConnectedAccount("Wait to fetch data");
            setBalance("wait to fetch data");
            await connectHandler(window.$web3Provider);
            console.log("chain changed");
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <br />
                {connectedAccount && <h6>Connected to <p>{connectedAccount}</p> Balance : <p>{balance}</p> </h6>}
                {!connectedAccount ? (
                    <button onClick={connectWeb3Wallet}>Connect Wallet</button>
                ) : (
                    <button onClick={disconnectWeb3Modal}>Disconnect</button>
                )}
            </header>
        </div>
    );
}