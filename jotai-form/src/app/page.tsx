"use client";
import { useState } from "react";
import { Form } from "./_components/Form";
import { Result } from "./_components/Result";

export default function Home() {
  // Resultコンポーネント表示用 State
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="container">
      <p className="message">
        <b>コンポーネント側</b> で Atom を編集する場合
      </p>
      <Form onSubmit={setShowResult} />
      <Result isShow={showResult} />
    </div>
  );
}
