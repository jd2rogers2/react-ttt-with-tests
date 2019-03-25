import React, { Component } from 'react';

const Board = props => (
  <div>
    <table style={{width: '50%'}}>
      <tr>
        <td onClick={() => props.onTileClick(0)}>{props.board[0]}</td>
        <td onClick={() => props.onTileClick(1)}>{props.board[1]}</td>
        <td onClick={() => props.onTileClick(2)}>{props.board[2]}</td>
      </tr>
      <tr>
        <td onClick={() => props.onTileClick(3)}>{props.board[3]}</td>
        <td onClick={() => props.onTileClick(4)}>{props.board[4]}</td>
        <td onClick={() => props.onTileClick(5)}>{props.board[5]}</td>
      </tr>
      <tr>
        <td onClick={() => props.onTileClick(6)}>{props.board[6]}</td>
        <td onClick={() => props.onTileClick(7)}>{props.board[7]}</td>
        <td onClick={() => props.onTileClick(8)}>{props.board[8]}</td>
      </tr>
    </table>
  </div>
)

export default Board;
