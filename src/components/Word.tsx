import React, { ReactElement, useEffect, useState } from "react";
import Letter from "./Letter";

interface PropTypes {
  word: string;
  colors: number[];
}

export default function Word({ word, colors }: PropTypes) {
  const [letters, setLetters] = useState<ReactElement[]>([]);

  useEffect(() => {
    let newLetters = [];
    let currWord = word ? word : "";

    for (let i = 0; i < 5; i++) {
      newLetters.push(
        <Letter letter={currWord[i]} color={colors[i]} key={i} />
      );
    }

    setLetters(newLetters);
  }, [word, colors]);

  return <div className="word">{letters}</div>;
}
