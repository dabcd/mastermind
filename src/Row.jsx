import React from "react";
import Hint from "./Hint";
import { colors } from "./prefs";

export default function Row(props) {
  const [pegs, setPegs] = React.useState([null, null, null, null]);
  const [hint, setHint] = React.useState([null, null, null, null]);

  function choosePeg(id) {
    if (!props.game.isLost && !props.game.isWon && props.isActive[props.id]) {
      setPegs((prevs) =>
        prevs.map((prev, index) =>
          index === id ? (prev = props.activeColor) : prev
        )
      );
    }
  }

  function checkGuess() {
    if (props.isActive[props.id] && !pegs.includes(null)) {
      let array = [];
      let black = 0;
      let white = 0;
      let flags = [false, false, false, false];

      // Counting correct positions & colors (blacks):
      for (let i = 0; i < 4; i++) {
        if (pegs[i] === props.draw[i]) {
          black++;
        }
      }

      // Counting correct colors regardless of positions (whites + blacks)
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (pegs[j] === props.draw[i] && !flags[j]) {
            white++;
            flags[j] = true;
            // console.log("j= ", j, "i= ", i);
            // console.log(flags);
            break;
          }
        }
      }
      white = white - black;

      // Constracting hint array:
      for (let i = 0; i < black; i++) {
        array.push("black");
      }
      for (let i = 0; i < white; i++) {
        array.push("white");
      }
      for (let i = 0; i < 4 - black - white; i++) {
        array.push("wrong");
      }
      setHint(array);

      // The next row becomes active:
      props.shiftIsActive();

      if (black === 4) {
        // The game is won!
        props.gameWon();
        return;
      }
    }
  }

  return (
    <div className="Row">
      {pegs.map((peg, index) => (
        <div
          key={index}
          className={props.isActive[props.id] ? "peg active" : "peg"}
          onClick={() => choosePeg(index)}
          style={
            peg === null
              ? null
              : { backgroundColor: colors[peg] }
          }
        ></div>
      ))}
      <div
        className={
          props.isActive.findIndex((elem) => elem === true) > props.id
            ? "check used"
            : !pegs.includes(null) 
              ? "check hovering :hover" 
              : "check"
        }
        onClick={checkGuess}
      >
        <div>+</div>
      </div>
      <Hint hint={hint} />
    </div>
  );
}
