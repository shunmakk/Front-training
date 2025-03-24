"use client";

import { useAtom } from "jotai";
import { incAtomX, incAtomY } from "./atom";
import React from "react";

export default function Page() {
  const [valueIncX, setIncX] = useAtom(incAtomX);
  const [valueIncY, setIncY] = useAtom(incAtomY);

  return (
    <>
      <form className="conatiner">
        <div className="formControll">
          <div>
            <label htmlFor="x" aria-label="x">
              X
            </label>
            <input
              id="x"
              type="number"
              onChange={(e) => setIncX(Number(e.target.value))}
            />
          </div>
          <span>※半角数字で入力</span>
        </div>
        <div className="formControll">
          <div>
            <label htmlFor="y" aria-label="y">
              Y
            </label>
            <input
              id="x"
              type="number"
              onChange={(e) => setIncY(Number(e.target.value))}
            />
          </div>
          <span>※半角数字で入力</span>
        </div>
      </form>
      <div className="content">
        <span>Result</span>
        <div className="contentInner result">
          <p>X: {valueIncX}</p>
          <p>Y: {valueIncY}</p>
        </div>
      </div>
    </>
  );
}
