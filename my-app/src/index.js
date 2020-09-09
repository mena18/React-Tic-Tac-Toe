import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xTurn: true,
      GameOn: true,
      status: "Next Player X"
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    let current_turn = this.state.xTurn;

    if (squares[i] == null && this.state.GameOn) {
      squares[i] = this.state.xTurn ? "X" : "O";
      current_turn = !this.state.xTurn;
      this.setState({ squares: squares, xTurn: current_turn });
    }

    this.setState({ status: `Next Player ${current_turn ? "X" : "O"}` });

    const winner = calculatewinner(squares);

    if (winner) {
      this.setState({ status: `The winner is ${winner}`, GameOn: false });
    }

    const result = squares.filter((square) => square);
    if (result.length === 9) {
      this.setState({ status: `Tie`, GameOn: false });
    }
  }

  render() {
    return (
      <div>
        <div className="status">{this.state.status}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculatewinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a]) {
      return squares[a];
    }
  }
  return false;
}
