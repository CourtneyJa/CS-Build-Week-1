import React from "react";
import Cell from "./Cell";
import "./game.css";

const Row = (props) => {
  const height = (1 / props.size * 100).toString()
  return (
    <div className="row">
      {props.cells.map((cell, idx) => (
        <Cell
          key={idx}
          value={cell}
          yAxis={props.yAxis}
          xAxis={props.xAxis}
          running={props.running}
          toggle={props.toggle}
          size={props.size}
        />
      ))}
    </div>
  );
};

export default Row;
