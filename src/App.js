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

// 2 player and computer player features
// saved games
//

class App extends Component {

  constructor() {
    super();
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      winner: false,
      isOver: false,
      // previousGames: [],
      // isTwoPlayer: true,
      // currentGameId: 0,
    };
  }

  onTileClick = index => {
    this.setState(prevState => {
      let newPlayer = prevState.currentPlayer;
      let newBoard = [...prevState.board];

      if (newBoard[index] === '') {
        newBoard[index] = prevState.currentPlayer;
        newPlayer = prevState.currentPlayer === 'O' ? 'X' : 'O';
      }

      return {board: newBoard, currentPlayer: newPlayer};
    });
    this.setState({winner: this.winner(), isOver: this.winner() || this.isFull()});
  }

  winner = () => {
    const {board} = this.state;
    let winner = false;
    WIN_COMBOS.forEach(combo => {
      if (board[combo[0]] !== '' &&
          board[combo[0]] === board[combo[1]] &&
          board[combo[1]] === board[combo[2]]
      ) {
        winner = board[combo[0]];
      }
    });
    return winner;
  }

// console.log(this.state.board);
  isFull = () => this.state.board.every(space => space !== '');

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
