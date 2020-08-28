import React from "react";
import "./game.css";

const Cell = (props) => {
  const width = ((1 / props.size) * 100).toString();
  const styleCell = {
    width: width + "%",
    height: "100%",
  };
  return (
    <div
      className={props.value ? "cell on" : "cell off"}
      onClick={() => {
        if (!props.running) props.toggle(props.yAxis, props.xAxis);
      }}
    />
  );
};

export default Cell;
