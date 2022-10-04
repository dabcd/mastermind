import React from "react";
import { colors } from "./prefs";

export default function Pegs(props) {
  return (
    <div className="Pegs">
      {colors.map((color, index) => (
        <div
          key={index}
          className={props.activeColor === index ? "peg active" : "peg"}
          style={{ backgroundColor: color }}
          onClick={() => props.chooseColor(index)}
        ></div>
      ))}
    </div>
  );
}
