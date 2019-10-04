import React, { useState } from 'react'
import Board from './Board'
import GameInfo from './GameInfo'
import {checkBoard} from '../lib/lib'
import {ROWS_COUNT, PLAYER_SYMBOLS, STARTING_PLAYER} from '../lib/config'

/**
 * Game root component
 */
const Game = () => {
	const [history, setHistory] = useState([{
		squares: Array(Math.pow(ROWS_COUNT, 2)).fill(null),
		state: 'play',
		player: STARTING_PLAYER,
	}]);

	const [stepNumber, setStepNumber] = useState(0);

	const [winner, setWinner] = useState(null);

	const handleClick = (i, next) => {
		// check game state
		if (!winner) { next(i) }
	};

	const updateBoard = (i) => {
		const updatedHistory = history.slice(0, stepNumber + 1);
		const current = updatedHistory[updatedHistory.length - 1];
		const squares = current.squares.slice();

		if (squares[i]) { return }

		squares[i] = PLAYER_SYMBOLS[current.player];
		let isWinner = false;

		if (checkBoard(squares, i)) {
			isWinner = true;
			setWinner(current.player);
		}

		setHistory(updatedHistory.concat([{
			squares: squares,
			state: (isWinner) ? 'end' : 'play',
			player: nextPlayer(),
		}]));
		setStepNumber(updatedHistory.length);
	};

	const stepChange = (step) => {
		setStepNumber(step);
		if (history[step].state === 'play') { setWinner(null) }
	};

	const nextPlayer = () => {
		return Object.keys(PLAYER_SYMBOLS).filter((player) => player !== history[stepNumber].player).find((el) => el)
	};

	const current = history[stepNumber];

	let status;
	if (winner) {
		status = "Winner: " + (PLAYER_SYMBOLS[nextPlayer()])
	} else {
		status = "Next player: " + PLAYER_SYMBOLS[current.player];
		if (!current.squares.includes(null)) {
			status = "Draw!"
		}
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current.squares} onClick={i => handleClick(i, updateBoard)} />
			</div>
			<GameInfo status={status} history={history} stepChange={step => stepChange(step)} />
		</div>
	)
};

export default Game;
