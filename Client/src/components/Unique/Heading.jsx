import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Unique","Key","Smart"];

  return (
    <div className="px-4 my-2">
      <div className="text-4xl mx-auto font-medium text-neutral-600 dark:text-neutral-400">
        <FlipWords words={words} />  Features
      </div>
    </div>
  );
}
