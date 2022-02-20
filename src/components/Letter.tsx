import React, { useEffect, useState } from "react";
import { BORDER_COLORS, COLORS, TEXT_COLORS } from "../data/variables";

interface PropsType {
  color: number;
  letter: string;
}

export default function Letter({ color, letter }: PropsType) {
  const [currColor, setCurrColor] = useState<number>(0);

  useEffect(() => {
    if (color === undefined) setCurrColor(letter ? 1 : 0);
    else setCurrColor(color);
  }, [color, letter]);

  return (
    <div
      className="letter"
      style={{
        backgroundColor: COLORS[currColor],
        borderColor: BORDER_COLORS[currColor],
        color: TEXT_COLORS[currColor],
      }}
      data-anim={currColor === 1 ? "1" : "0"}
    >
      {letter}
    </div>
  );
}
