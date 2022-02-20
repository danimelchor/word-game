import React from "react";
import { MdDelete } from "react-icons/md";

export default function Nav() {
  const handleReset = () => {
    localStorage.removeItem("gameState");
    window.location.reload();
  };

  return (
    <div id="nav">
      <h1>
        <span className="green-title">Word</span>el
        <span className="green-title">*</span>
      </h1>
      <MdDelete className="icon" onClick={handleReset} />
    </div>
  );
}
