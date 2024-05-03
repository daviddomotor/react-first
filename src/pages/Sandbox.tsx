import React, {FC, useState} from "react";
import Button from "../components/Button";
import Page from "../components/Page";

const Sandbox: FC = () => {
    const [count, setCount] = useState(0);

    function decreaseCount() {
        setCount(count => count - 1);
    }

    function increaseCount() {
        setCount(count => count + 1);
    }

    function isCountNegative(): boolean {
        return count < 1;
    }

    return (
        <Page contentClass="py-4">
            <div className="container d-flex justify-content-center gap-4">
                <Button buttonText='Reduce' className='btn btn-primary btn-lg' disabled={isCountNegative()}
                        clickHandler={decreaseCount}/>
                <h1>{count}</h1>
                <Button buttonText='Increase' className='btn btn-primary btn-lg' clickHandler={increaseCount}/>
            </div>
        </Page>
    )
}

export default Sandbox;
