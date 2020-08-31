import React, { Component } from "react";
import Row from "./Row";
import "./game.css";

class Grid extends Component {
  //initial states
  state = {
    grid: [[]],
    running: false,
    size: 0,
    gen: 0,
    random: 0,
  };
  componentDidMount() {}
  setGrid(int) {
    const grid = [];
    for (let i = 0; i < int; i++) {
      grid[i] = new Array(int).fill(false);
    }
    return grid;
  }
  homieCheck(x, y, arr) {
    //setting rules for alive or dead cells
    const countBuddies = {
      alive: 0,
      dead: 0,
    };
    //set cardinals "Norths"
    if (y < this.state.size - 1) {
      if (arr[x][y + 1]) {
        countBuddies.alive++;
      }
    }
    if (x < this.state.size - 1 && y < this.state.size - 1) {
      if (arr[x + 1][y + 1]) {
        countBuddies.alive++;
      }
    }
    if (x >= 1 && y < this.state.size - 1) {
      if (arr[x - 1][y + 1]) {
        countBuddies.alive++;
      }
    }
    //set cardinals "Souths"
    if (y >= 1) {
      if (arr[x][y - 1]) {
        countBuddies.alive++;
      }
    }
    if (y >= 1 && x < this.state.size - 1) {
      if (arr[x + 1][y - 1]) {
        countBuddies.alive++;
      }
    }
    if (x >= 1 && y >= 1) {
      if (arr[x - 1][y - 1]) {
        countBuddies.alive++;
      }
    }
    //set cardinals East
    if (x < this.state.size - 1 && y < this.state.size - 1) {
      if (arr[x + 1][y]) {
        countBuddies.alive++;
      }
    }
    //set cardinals West
    if (x >= 1) {
      if (arr[x - 1][y]) {
        countBuddies.alive++;
      }
    }
    return countBuddies;
  }

  changeGrid() {
    const newGrid = this.setGrid(parseInt(this.state.size));
    const newGen = this.state.gen + 1;
    //outer for
    for (let i = 0; i < newGrid.length; i++) {
      //inner for
      for (let j = 0; j < newGrid[i].length; j++) {
        const { alive } = this.homieCheck(i, j, this.state.grid);
        if (this.state.grid[i][j]) {
          //apply Conway's rules
          if (alive < 2) {
            newGrid[i][j] = false;
            continue;
          }
          if (alive > 3) {
            newGrid[i][j] = false;
            continue;
          } else {
            newGrid[i][j] = true;
            continue;
          }
        } else {
          if (alive >= 3) {
            newGrid[i][j] = true;
            continue;
          }
        }
      }
    }
    this.setState({
      grid: newGrid,
      gen: newGen,
    });
  }
  toggleCells = (y, x) => {
    const newGrid = this.state.grid;
    newGrid[y][x] = !newGrid[y][x];
    this.setState({
      grid: newGrid,
    });
  };
  makeGrid = () => {
    const newGrid = this.setGrid(parseInt(this.state.size));
    this.setState({
      grid: newGrid,
      gen: 1,
    });
  };
  //make changes to stop/start, move, reset and set a change handler
  startGrid = (e) => {
    e.preventDefault();
    this.gameInt = setInterval(() => this.changeGrid(), 25);
  };
  stopGrid = (e) => {
    e.preventDefault();
    clearInterval(this.gameInt);
  };
  moveOn = (e) => {
    e.preventDefault();
    this.changeGrid();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  resetGrid = (e) => {
    e.preventDefault();
    const newGrid = this.changeGrid(this.state.size);
    this.setState({
      grid: newGrid,
      gen: 1,
    });
  };

  render() {
    if (this.state.gen === 0) {
      return (
        <form onSubmit={this.makeGrid}>
          <input
            type="number"
            min="10"
            max="75"
            value={this.state.size}
            name="size"
            placeholder="enter desired your cell size"
            onChange={this.handleChange}
          />
          <button type="submit">Enter</button>
        </form>
      );
    } else {
      return (
        <div className="game-cont">
          <div className="grid">
            {this.state.grid.map((row, idx) => (
              <Row
                className="row"
                key={idx}
                cells={row}
                yAxis={idx}
                running={this.state.running}
                toggle={this.toggleCells}
                size={this.state.size}
              />
            ))}
          </div>
          <div className="controls">
            <button onClick={this.startGrid}>Start Game</button>
            <button onClick={this.moveOn}>Make a Move</button>
            <button onClick={this.resetGrid}>Reset</button>
            <button onClick={this.stopGrid}>End Game</button>
            <p>Generation: {this.state.gen}</p>
          </div>
        </div>
      );
    }
  }
}

export default Grid;
