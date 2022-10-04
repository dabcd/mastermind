import React from "react";
import Header from "./Header";
import Row from "./Row";
import Pegs from "./Pegs";
import { nanoid } from "nanoid";
import { INT_CHOICES } from "./prefs";

export default function App() {
  const [game, setGame] = React.useState({
    isWon: false,
    isLost: false,
    isPlayAgain: false
  });
  const [draw, setDraw] = React.useState([]);
  const [keysRows, setKeysRows] = React.useState(
    Array.from(Array(INT_CHOICES).keys())
  );
  const [isActive, setIsActive] = React.useState(
    Array(INT_CHOICES).fill(true).fill(false, 1)
  );
  const [activeColor, setActiveColor] = React.useState(null);

  React.useEffect(() => {
    let a = [];
    for (let i = 0; i < 4; i++) {
      a.push(Math.floor(Math.random() * 6));
    }
    setDraw(a);
    let k = [];
    for (let i = 0; i < INT_CHOICES; i++) {
      k.push(nanoid());
    }
    setKeysRows(k);
    setGame({ isWon: false, isLost: false, isPlayAgain: false });
  }, [game.isPlayAgain]);

  function chooseColor(id) {
    setActiveColor(id);
  }

  function shiftIsActive() {
    let id = isActive.findIndex((elem) => elem === true);
    let array = Array(INT_CHOICES).fill(false);
    array[id + 1] = true;
    setIsActive(array);
    if (id === INT_CHOICES - 1) {
      // Game is lost
      setGame((prev) => ({ ...prev, isLost: true }));
      return;
    }
  }

  function gameWon() {
    setGame((prev) => ({ ...prev, isWon: true }));
  }

  const newGame = () => {
    // Play a new game:
    setGame((prev) => ({ ...prev, isPlayAgain: true }));
    setIsActive(Array(INT_CHOICES).fill(true).fill(false, 1));
    setActiveColor(null);
  };

  let rowElements = [];
  for (let i = 0; i < INT_CHOICES; i++) {
    rowElements.push(
      <Row
        key={keysRows[i]}
        id={i}
        game={game}
        gameWon={gameWon}
        draw={draw}
        isActive={isActive}
        shiftIsActive={shiftIsActive}
        activeColor={activeColor}
      />
    );
  }

  return (
    <div className="App">
      <Header game={game} newGame={newGame} />
      <div className="main">
        <div>{rowElements}</div>
        <Pegs chooseColor={chooseColor} activeColor={activeColor} />
      </div>
    </div>
  );
}
