"use client";

import { useAtom } from "jotai";
import { locationAtom, paramsAtom } from "./atom";
import { useEffect } from "react";
import { FEMALE, MALE } from "./constants";
import { Result } from "./components/Result";
export default function Page() {
  const [location, setLocation] = useAtom(locationAtom);
  const [params, setParams] = useAtom(paramsAtom);

  //paramsを取得
  useEffect(() => {
    if (!location.searchParams) return;

    setParams({
      gender: location.searchParams.get("gender") ?? null,
    });
  }, [location.searchParams, setParams]);

  // male or female を切り替えるハンドラ
  const handleToggleParams = () => {
    setLocation((prev) => ({
      ...prev,
      pathname: "/params",
      searchParams: new URLSearchParams([
        ["gender", params.gender === MALE ? FEMALE : MALE],
      ]),
    }));
  };

  return (
    <div className="container">
      <div className="container__head">
        <p className="message">
          URLから <b>{params.gender}</b> を取得。Toggleボタンで 切り替え
        </p>
        <button onClick={handleToggleParams}>Toggle</button>
      </div>
      <Result />
    </div>
  );
}
