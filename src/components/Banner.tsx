import React, { useState } from "react";
import { ICONS, STATES, STATE_TYPE } from "../data/variables";
import Countdown from "./Countdown";

import { IoMdClose } from "react-icons/io";

interface PropTypes {
  state: STATE_TYPE;
  triedWords: string[];
  colors: number[][];
}

export default function Banner({ state, triedWords, colors }: PropTypes) {
  const [visible, setVisible] = useState(true);

  if (state === STATES.pending) return <></>;

  let title = state === STATES.lost ? "Sorry! You lost" : "You won!";
  let color = state === STATES.lost ? "#8e4242" : "#6aaa64";

  const handleShare = () => {
    let result = `Dani's wordle - ${
      state === STATES.won ? triedWords.length : "X"
    }/6\n\n`;

    for (const row of colors) {
      for (const c of row) {
        result += ICONS[c];
      }
      result += "\n";
    }

    if (navigator.share) navigator.share({ text: "result" });
    else navigator.clipboard.writeText(result);
  };

  return (
    <div className="banner" style={{ display: visible ? "flex" : "none" }}>
      <div className="banner-content">
        <div className="banner-icon">
          <IoMdClose onClick={() => setVisible(false)} />
        </div>
        <h1 style={{ color: color }}>{title}</h1>
        <p>Come back in</p>
        <Countdown color={color} />
        <p>for more :)</p>
        <button onClick={handleShare}>Share!</button>
      </div>
    </div>
  );
}
