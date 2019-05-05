import React, {useState} from 'react'
import Board from './Board'
import {checkBoard, playerSymbol} from '../lib/lib'
import {ROWS_COUNT, STARTING_PLAYER} from '../lib/config'

/**
 * Game root component
 */
const Game = () => {
	const [history, setHistory] = useState([{
		squares: Array(Math.pow(ROWS_COUNT, 2)).fill(null)
	}])

	const [stepNumber, setStepNumber] = useState(0)

	const [currentPlayer, setCurrentPlayer] = useState(STARTING_PLAYER)

	const handleClick = (i) => {
		const updatedHistory = history.slice(0, stepNumber + 1)
		const current = updatedHistory[updatedHistory.length - 1]
		const squares = current.squares.slice()
		if (checkBoard(squares) || squares[i]) {
			return;
		}
		squares[i] = playerSymbol[currentPlayer];
		setHistory(updatedHistory.concat([{squares: squares}]))
		setStepNumber(updatedHistory.length)
		setCurrentPlayer(nextPlayer())
	}

	const jumpTo = (step) => {
		setStepNumber(step)
		setCurrentPlayer(((step % 2) === 0) ? 'x' : 'o')
	}

	const nextPlayer = () => {
		return (currentPlayer === 'x') ? 'o' : 'x'
	}

	const current = history[stepNumber];
	const winner = checkBoard(current.squares)

	const moves = history.map((step, move) => {
		const desc = move ?
			'Go to move #' + move :
			'Go to game start'
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status
	if (winner) {
		status = "Winner: " + (playerSymbol[nextPlayer()])
	} else {
		status = "Next player: " + playerSymbol[currentPlayer]
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
	)
}

export default Game;
