import React from "react";

const Rules =
  "Guess the color of each of the four pegs. The colors can repeat. After each guess you will recieve a hint: black color means that you have guessed the position and a color of a peg, white - that you guessed a color, 'x' means that both position and color are wrong.";

export default function Header(props) {
  const [isShowRules, setIsShowrules] = React.useState(false);
  function showRules() {
    setIsShowrules((prevValue) => !prevValue);
  }
  return (
    <div className="Header">
      <h1>MASTERMIND</h1>
      {props.game.isWon && (
        <div>
          <h2>You won!</h2>
          <button onClick={props.newGame}>Play again</button>
        </div>
      )}
      {props.game.isLost && !props.game.isWon && (
        <div>
          <h2>You lost.</h2>
          <button onClick={props.newGame}>Play again</button>
        </div>
      )}
      {!props.game.isWon && !props.game.isLost && (
        <div>
          <button onClick={showRules}>
            {isShowRules ? "Hide rules" : "Show rules"}
          </button>
          {isShowRules ? <p>{Rules}</p> : null}
        </div>
      )}
    </div>
  );
}
