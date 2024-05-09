import React, { FC, useMemo, useState } from "react";
import Button from "../components/Button";
import Page from "../components/Page";

const Sandbox: FC = () => {
  const [count, setCount] = useState(0);
  /* Does not need to be a function */
  const isCountNegative = useMemo(() => count < 1, [count]);
  /* Not an issue, but since we are in the modern times, let's use arrow functions :) */
  const decreaseCount = () => {
    setCount((count) => count - 1);
  };

  const increaseCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <Page contentClass="py-4">
      <div className="container d-flex justify-content-center gap-4">
        <Button
          className="btn btn-primary btn-lg"
          disabled={isCountNegative}
          clickHandler={decreaseCount}
        >
          Reduce
        </Button>
        <h1>{count}</h1>
        <Button className="btn btn-primary btn-lg" clickHandler={increaseCount}>
          Increase
        </Button>
      </div>
    </Page>
  );
};

export default Sandbox;
