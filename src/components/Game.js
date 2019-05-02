import React, {useState} from 'react'
import Board from './Board'
import {calculateWinner, checkBoard} from '../lib/lib'

const Game = () => {
	const [history, setHistory] = useState([{
		squares: Array(9).fill(null)
	}])

	const [stepNumber, setStepNumber] = useState(0)

	const [xIsNext, setXIsNext] = useState(true)

	const handleClick = (i) => {
		const updatedHistory = history.slice(0, stepNumber + 1);
		const current = updatedHistory[updatedHistory.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
		setHistory(updatedHistory.concat([{squares: squares}]))
		setStepNumber(updatedHistory.length)
		setXIsNext(!xIsNext)
	}

	const jumpTo = (step) => {
		setStepNumber(step)
		setXIsNext((step % 2) === 0)
	}

	const current = history[stepNumber];
	const winner = checkBoard(current.squares);

	const moves = history.map((step, move) => {
		const desc = move ?
			'Go to move #' + move :
			'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = "Winner: " + (!xIsNext ? "X" : "O");
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
		if (!current.squares.includes(null)) {
			status = "Draw!"
		}
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={i => handleClick(i)}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

export default Game;
