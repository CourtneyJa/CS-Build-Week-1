import React, { Component } from "react";

import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import LifeCanvas from "./Components/LifeCanvas";
import "./App.css";
import arrayClone from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false)),
      isPlaying: false,
      dropdownOpen: false,
      dropdownOpen2: false,
      modal: false,
      modal2: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  toggle2 = () => {
    this.setState((prevState) => ({
      dropdownOpen2: !prevState.dropdownOpen2,
    }));
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggleModal2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    });
  };

  selectBox = (row, col) => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[row][col] = !gridCopy[row][col];
      this.setState({
        gridFull: gridCopy,
      });
    } else {
      alert("Simulation in progress – cannot select cell!");
    }
  };

  seedGame = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            gridCopy[i][j] = true;
          }
        }
      }
      this.setState({
        gridFull: gridCopy,
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  gliderGun = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[5][1] = true;
      gridCopy[6][1] = true;
      gridCopy[5][2] = true;
      gridCopy[6][2] = true;
      gridCopy[5][11] = true;
      gridCopy[6][11] = true;
      gridCopy[7][11] = true;
      gridCopy[4][12] = true;
      gridCopy[8][12] = true;
      gridCopy[3][13] = true;
      gridCopy[9][13] = true;
      gridCopy[3][14] = true;
      gridCopy[9][14] = true;
      gridCopy[6][15] = true;
      gridCopy[4][16] = true;
      gridCopy[8][16] = true;
      gridCopy[5][17] = true;
      gridCopy[6][17] = true;
      gridCopy[7][17] = true;
      gridCopy[6][18] = true;
      gridCopy[3][21] = true;
      gridCopy[4][21] = true;
      gridCopy[5][21] = true;
      gridCopy[3][22] = true;
      gridCopy[4][22] = true;
      gridCopy[5][22] = true;
      gridCopy[2][23] = true;
      gridCopy[6][23] = true;
      gridCopy[1][25] = true;
      gridCopy[2][25] = true;
      gridCopy[6][25] = true;
      gridCopy[7][25] = true;
      gridCopy[3][35] = true;
      gridCopy[4][35] = true;
      gridCopy[3][36] = true;
      gridCopy[4][36] = true;
      this.setState({
        gridFull: gridCopy,
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  acorn = () => {
    if (this.state.isPlaying === false) {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy[13][19] = true;
      gridCopy[13][20] = true;
      gridCopy[11][20] = true;
      gridCopy[12][22] = true;
      gridCopy[13][23] = true;
      gridCopy[13][24] = true;
      gridCopy[13][25] = true;
      this.setState({
        gridFull: gridCopy,
      });
    } else {
      alert("Simulation in progress – cannot seed game!");
    }
  };

  gridSmall = () => {
    if (this.state.isPlaying === false) {
      this.rows = 20;
      this.cols = 40;
      this.clearButton();
    } else {
      alert("Simulation in progress – cannot change game size!");
    }
  };

  gridLarge = () => {
    if (this.state.isPlaying === false) {
      this.rows = 100;
      this.cols = 200;
      this.clearButton();
    } else {
      alert("Simulation in progress – cannot change game size!");
    }
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playGame, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
    this.setState({
      isPlaying: false,
    });
  };

  slowButton = () => {
    this.speed = 500;
    this.playButton();
  };

  normalButton = () => {
    this.speed = 100;
    this.playButton();
  };

  fastButton = () => {
    this.speed = 1;
    this.playButton();
  };

  clearButton = () => {
    let gridCopy = Array(this.rows).fill(Array(this.cols).fill(false));

    this.setState({
      gridFull: gridCopy,
      generation: 0,
      isPlaying: false,
    });
  };

  playGame = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        //checking each neighbor
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      isPlaying: true,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.seedGame();
  }

  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <LifeCanvas
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <h2>
          Generations:<div className="innerbox">{this.state.generation}</div>
        </h2>
        <ButtonGroup className="buttons">
          <Button onClick={this.playButton} color="primary">Start</Button>
          <Button onClick={this.pauseButton}color="primary">Pause</Button>
          <Button onClick={this.clearButton}color="primary">Clear</Button>
          <Button onClick={this.seedGame}color="primary">Seed</Button>
          <Button onClick={this.slowButton}color="primary">Slow</Button>
          <Button onClick={this.normalButton}color="primary">Normal</Button>
          <Button onClick={this.fastButton}color="primary">Fast</Button>
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret color="primary">Shapes</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.gliderGun}>Glider Gun</DropdownItem>
              <DropdownItem onClick={this.acorn}>Acorn</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown
            isOpen={this.state.dropdownOpen2}
            toggle={this.toggle2}
          >
            <DropdownToggle caret color="primary">Grid Size</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.gridSmall}>Small</DropdownItem>
              <DropdownItem onClick={this.gridLarge}>Large</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <span>
          <Button className="modals" color="info" onClick={this.toggleModal}>
            Rules
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleModal}>
              How it Works
            </ModalHeader>
            <ModalBody>
              <ol>
                <li>
                  Any live cell with fewer than two live neighbors dies, as if
                  by underpopulation.
                </li>
                <li>
                  Any live cell with two or three live neighbors lives on to the
                  next generation.
                </li>
                <li>
                  Any live cell with more than three live neighbors dies, as if
                  by overpopulation.
                </li>
                <li>
                  Any dead cell with exactly three live neighbors becomes a live
                  cell, as if by reproduction
                </li>
              </ol>
            </ModalBody>
          </Modal>
        </span>
        <span>
          <Button className="modals" color="info" onClick={this.toggleModal2}>
            About
          </Button>
          <Modal
            isOpen={this.state.modal2}
            toggle={this.toggleModal2}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleModal2}>About the Game</ModalHeader>
            <ModalBody>
              The Game of Life is not your typical computer game. It is a
              'cellular automaton', and was invented by Cambridge mathematician
              John Conway. As a zero-player game, the evolution of the game, is
              based solely on the initial state setup. It consists of a
              collection of cells which, based on a few mathematical rules, can
              live, die or multiply.
            </ModalBody>
          </Modal>
        </span>
      </div>
    );
  }
}

export default App;
