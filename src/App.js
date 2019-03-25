import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board';

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

class App extends Component {

  constructor() {
    super();
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X'
    };
  }

  onTileClick = index => {
    this.setState(prevState => {
      const newBoard = [...prevState.board];
      newBoard[index] = prevState.currentPlayer;
      const newPlayer = prevState.currentPlayer === 'O' ? 'X' : 'O';
      return {board: newBoard, currentPlayer: newPlayer};
    });
  }

  isWon = () => {
    WIN_COMBOS.forEach(combo => {
      if (this.state.board[combo[0]] !== '' &&
          this.state.board[combo[0]] === this.state.board[combo[1]] &&
          this.state.board[combo[1]] === this.state.board[combo[2]]
      ) {
        return true;
      }
    });
    return false;
  }

  winner = () => {}

//         <Board onTileClick={this.onTileClick} board={this.state.board} />
  render() {
    return (
      <div className="App">
        <table>
          <tr>
            <td onClick={() => this.onTileClick(0)}>{this.state.board[0]}</td>
            <td onClick={() => this.onTileClick(1)}>{this.state.board[1]}</td>
            <td onClick={() => this.onTileClick(2)}>{this.state.board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => this.onTileClick(3)}>{this.state.board[3]}</td>
            <td onClick={() => this.onTileClick(4)}>{this.state.board[4]}</td>
            <td onClick={() => this.onTileClick(5)}>{this.state.board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => this.onTileClick(6)}>{this.state.board[6]}</td>
            <td onClick={() => this.onTileClick(7)}>{this.state.board[7]}</td>
            <td onClick={() => this.onTileClick(8)}>{this.state.board[8]}</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
