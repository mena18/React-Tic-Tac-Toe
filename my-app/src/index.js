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

let winning_pattern = [];

function Square(props) {
  return (
    <button className={props.win + " square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let win;
    if (this.props.mark_board && this.props.mark_board.indexOf(i) !== -1) {
      win = "win";
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        win={win}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xTurn: true,
      stepNumber: 0
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xTurn: step % 2 === 0
    });
  }

  restart() {
    this.setState({
      history: [{ squares: Array(9).fill(null) }],
      xTurn: true,
      stepNumber: 0
    });
  }

  restart_button() {
    if (
      calculatewinner(this.state.history[this.state.history.length - 1].squares)
    ) {
      return (
        <button
          onClick={() => {
            this.restart();
          }}
        >
          Play again
        </button>
      );
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculatewinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xTurn ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      xTurn: !this.state.xTurn,
      stepNumber: history.length
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculatewinner(current.squares);
    let status;
    let mark_board;
    if (winner) {
      status = "winner : " + winner;
      console.log(winning_pattern);
      mark_board = winning_pattern;
    } else if (current.squares.filter((a) => a).length === 9) {
      status = "TIE";
    } else {
      status = "Next player : " + (this.state.xTurn ? "X" : "O");
    }

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            mark_board={mark_board}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{this.restart_button()}</div>
          <ol>{moves}</ol>
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
      winning_pattern = lines[i];
      return squares[a];
    }
  }
  return false;
}
