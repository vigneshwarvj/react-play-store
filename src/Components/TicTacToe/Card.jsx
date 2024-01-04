// Box.jsx
import React from "react";
import "./Card.css";

function Card({ value, onClick }) {
  return (
    <div className="game-box" onClick={onClick}>
      <h1 className={value === "O" ? "o-sign" : "x-sign"}>{value}</h1>
    </div>
  );
}

export default Card;
