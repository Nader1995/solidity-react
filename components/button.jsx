import React, {useState} from "react";

export default  function Button () {

    const [counter, setCounter] = useState(0);

    const increase = () => {

        setCounter(counter => counter + 1);
    }

    const decrease = () => {

        setCounter(counter => counter -1);
    }

    const resetCounter = () => {

        setCounter(counter => 0);
    }

        return (
        <div>
            <h1>Counter:</h1>
            <p>{counter}</p>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <button onClick={resetCounter}>reset</button>
        </div>
        );
}
