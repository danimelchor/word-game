import React, { ReactElement, useEffect, useState } from "react";
import { BsBackspace } from "react-icons/bs";
import { BORDER_COLORS, COLORS, TEXT_COLORS } from "../data/variables";

interface PropTypes {
  letter: string;
  color: number;
  checkKeyDown(keyCode: number, key: string): void;
}

export default function Key({ letter, color, checkKeyDown }: PropTypes) {
  const [width, setWidth] = useState<number>(0);
  const [code, setCode] = useState<number>(0);
  const [element, setElement] = useState<ReactElement | string>("");

  useEffect(() => {
    if (letter === "enter") {
      setCode(13);
      setWidth(100);
      setElement("enter");
    } else if (letter === "backspace") {
      setCode(8);
      setWidth(80);
      setElement(<BsBackspace />);
    } else {
      setWidth(40);
      setCode(65);
      setElement(letter);
    }
  }, [color]);

  return (
    <div
      style={{
        background: COLORS[color],
        color: TEXT_COLORS[color],
        borderColor: BORDER_COLORS[color],
        width,
      }}
      className="keyboard-key"
      onClick={() => checkKeyDown(code, letter)}
    >
      {element}
    </div>
  );
}
