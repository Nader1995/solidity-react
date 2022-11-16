import React, {useState} from "react";

export  default function Balance() {

    const [address, setAddress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${address}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter Address:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}