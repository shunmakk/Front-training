"use client";

import { useAtom } from "jotai";
import { incAtomX, incAtomY } from "./atom";
import React from "react";

export default function Page() {
  const [valueIncX, setIncX] = useAtom(incAtomX);
  const [valueIncY, setIncY] = useAtom(incAtomY);

  const [inputX, setInputX] = React.useState<number | "">("");
  const [inputY, setInputY] = React.useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncX(Number(inputX));
    setIncY(Number(inputY));
    setInputX("");
    setInputY("");
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="formControl">
        <div>
          <label htmlFor="x">X</label>
          <input
            id="x"
            type="number"
            value={inputX}
            onChange={(e) => setInputX(Number(e.target.value) || 0)}
            onBlur={() => setInputX((prev) => (prev === 0 ? 0 : prev))}
          />
        </div>
        <span>※半角数字で入力</span>
      </div>
      <div className="formControl">
        <div>
          <label htmlFor="y">Y</label>
          <input
            id="y"
            type="number"
            value={inputY}
            onChange={(e) => setInputY(Number(e.target.value) || 0)}
            onBlur={() => setInputY((prev) => (prev === 0 ? 0 : prev))}
          />
        </div>
        <span>※半角数字で入力</span>
      </div>
      <button type="submit">送信</button>
      <div className="content">
        <span>Result</span>
        <div className="contentInner result">
          <p>X: {valueIncX}</p>
          <p>Y: {valueIncY}</p>
        </div>
      </div>
    </form>
  );
}
