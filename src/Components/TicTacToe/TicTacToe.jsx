// Tic Tac Toe game
import React, { useState } from "react";
import "./TicTacToe.css";
import Card from "./Card.jsx";
import winSound from '../Sound/success-trumpet.mp3.mp3';
import drawSound from '../Sound/oh-no-sound-for-loss.mp3';
import Header from "../../Header.js";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  //To play win music
  const winnerSoundMain = new Audio(winSound);
  winnerSoundMain.volume = 1.0;

  //To play draw music
  const drawSoundMain = new Audio(drawSound);
  drawSoundMain.volume = 1.0;

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const calculatedWinner = calculateWinner(newBoard);

    if (calculatedWinner) {
      setWinner(calculatedWinner);
      winnerSoundMain.play();
    } else if (newBoard.every((square) => square !== null)){
      setWinner("Match is Draw");
      drawSoundMain.play();
    }

    setXIsNext(!xIsNext);
  };

  const handleRematch = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const renderBoxes = () => {
    return board.map((value, index) => (
      <Card
        key={index}
        value={value}
        onClick={() => handleClick(index)}
        winner={winner}
      />
    ));
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  return (
    <>
    <Header/>
    <div className="tic-tac-toe">
        {winner && (
        <div className="alert-in-tictactoe">
          {winner === "Match is Draw" ? (
            <p style={{color: 'white'}}>Oh no! Match is draw 🥲</p>
          ) : (
            <p style={{color: 'white'}}>{`Winner is : ${winner} 🎉`}</p>
          )}
          <button onClick={handleRematch}>Rematch</button>
        </div>
      )}
      <h1 className="game-heading">Tic Tac Toe</h1>
      <div className="game-board">{renderBoxes()}</div>
      <div className="game-info">
        <div className="status">{winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`}</div>
      </div>
    </div>
    </>
  );
}

export default TicTacToe;