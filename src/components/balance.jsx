import React, {useState} from "react";

export  default function Balance() {

    const [address, setAddress] = useState("");
    const [chainID, setChainID] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        const info = {address, chainID};
        console.log(info);
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
