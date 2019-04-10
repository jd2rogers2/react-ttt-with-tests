import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Board from './components/board';

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
      currentPlayer: 'X',
      winner: false,
      isOver: false,
      previousGames: [],
      // {id: 1, isTwoPlayer: true, board: [blah]}
      isTwoPlayer: true,
      currentGameId: 1,
      showSavePrompt: false,
      previousGameId: null
    };
  }

  onTileClick = index => {
    if (this.state.showSavePrompt) {return;}

    this.setState(prevState => {
      let newPlayer = prevState.currentPlayer;
      let newBoard = [...prevState.board];

      if (!prevState.isOver && newBoard[index] === '') {
        newBoard[index] = prevState.currentPlayer;
        if (!prevState.isTwoPlayer) {
          newBoard = this.compMove(newBoard);
        } else {
          newPlayer = prevState.currentPlayer === 'O' ? 'X' : 'O';
        }
      }

      const winner = this.winner(newBoard);

      if (winner) {
        this.saveGame();
      }

      return {winner,
              board: newBoard,
              currentPlayer: newPlayer,
              isOver: winner || this.isFull(newBoard)
            };
    });
  }

  compMove = board => {
    const empty = board.indexOf('');
    if (empty !== -1) {
      board[empty] = 'O';
    }
    return board;
  }

  winner = board => {
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

  isFull = board => board.every(space => space !== '');
  togglePlayer2 = () => {
    if (this.state.showSavePrompt) {return;}
    this.setState(prevState => ({isTwoPlayer: !prevState.isTwoPlayer}));
  }
  getCurrent = board => board.filter(space => space !== '').length % 2 ? 'O' : 'X';

  startNewGame = () => {
    if (this.state.showSavePrompt) {return;}

    this.setState(prevState => {
      return {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        winner: false,
        isOver: false,
        isTwoPlayer: true,
        currentGameId: prevState.previousGames.length + 1,
      };
    });
  }

  recallGame = id => {
    if (this.state.showSavePrompt) {return;}

    this.setState(prevState => {
      const prevGame = prevState.previousGames.find(game => game.id === id);
      const prevBoard = prevGame.board;
      const winner = this.winner(prevBoard);
      return {
              currentGameId: id,
              board: prevBoard,
              winner,
              isTwoPlayer: prevGame.isTwoPlayer,
              isOver: winner || this.isFull(prevBoard),
              currentPlayer: this.getCurrent(prevBoard)
             };
    });
  }

  saveGame = () => {
    this.setState(prevState => {
      const existingGame = prevState.previousGames.find(game => game.id === prevState.currentGameId);
      if (existingGame) {
        const newPrevGames = prevState.previousGames.map(game => {
          if (game.id === prevState.currentGameId) {
            return {...game, board: prevState.board};
          } else {
            return game;
          }
        });

        return {previousGames: newPrevGames};
      } else {
        return {previousGames: [...prevState.previousGames, {id: prevState.previousGames.length + 1, board: prevState.board, isTwoPlayer: prevState.isTwoPlayer}]};
      }
    });
  }

  onNewGameClick = () => {
    this.setState({showSavePrompt: true});
  }

  onPromptclick = shouldSave => {
    this.setState({showSavePrompt: false}, () => {
      if (shouldSave) {
        this.saveGame();
      }
      if (this.state.previousGameId) {
        this.recallGame(this.state.previousGameId);
      } else {
        this.startNewGame();
      }
      this.setState({previousGameId: null});
    });
  }

  onPrevGameClick = id => {
    this.setState({showSavePrompt: true, previousGameId: id});
  }

//         <Board onTileClick={this.onTileClick} board={this.state.board} />
  render() {
    return (
      <div className="App">
        {(this.state.isOver || this.state.showSavePrompt) && (
          <div className="messages">
            {this.state.showSavePrompt && (
              <div>
                <p>save previous game?</p>
                <button className="save-and-new" onClick={() => this.onPromptclick(true)}>yes</button>
                <button onClick={() => this.onPromptclick(false)}>no</button>
              </div>
            )}
            {this.state.isOver && this.state.winner && (
              <div className="overlay">The winner is {this.state.winner}!</div>
            )}
            {this.state.isOver && !this.state.winner && (
              <div className="overlay">Tie Game!</div>
            )}
          </div>
        )}
        <table>
          <tbody>
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
          </tbody>
        </table>
        <div>
          <button className="new-game-button" onClick={() => this.onNewGameClick()}>Start a new game!</button>
          <button onClick={() => this.saveGame()}>Save this game</button>
          <p>currently playing against: {this.state.isTwoPlayer ? 'Player 2' : 'Computer'}</p>
          {this.state.board.every(spot => spot === '') && <button className="togglePlayer2" onClick={() => this.togglePlayer2()}>toggle</button>}
          {this.state.isTwoPlayer && <p>current player: {this.state.currentPlayer}</p>}
          {!!this.state.previousGames.length && (
            <div className="previous-games">
              <p>continue a previous game</p>
              {this.state.previousGames.map(game => (<button key={game.id} onClick={() => this.onPrevGameClick(game.id)}>{game.id}</button>))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
