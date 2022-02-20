import React, { ReactElement, useEffect, useState } from "react";
import { getHintsKeyboard } from "../functions";
import Key from "./Key";
import { KeyboardEvent, KeyState } from "./KeyboardInterface";

interface PropTypes {
  checkKeyDown(e: KeyboardEvent | React.KeyboardEvent): void;
  correctWord: string;
  triedWords: string[];
}

// COMPONENT
export default function Keyboard({
  checkKeyDown,
  correctWord,
  triedWords,
}: PropTypes) {
  const [keyboard, setKeyboard] = useState<KeyState[]>([]);

  useEffect(() => {
    const newKeysState = getHintsKeyboard(correctWord, triedWords);
    setKeyboard(JSON.parse(JSON.stringify(newKeysState)));
  }, [triedWords]);

  const _checkKeyDown = (keyCode: number, key: string): void => {
    checkKeyDown({ keyCode, key });
  };

  return (
    <div className="keyboard">
      {keyboard.map((row, key1) => (
        <div className="keyboard-row" key={key1}>
          {Object.keys(row).map((letter, key) => (
            <Key
              color={row[letter]}
              letter={letter}
              key={key}
              checkKeyDown={_checkKeyDown}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
