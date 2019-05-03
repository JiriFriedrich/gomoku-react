import React from 'react';
import Square from './Square'
import {ROWS_COUNT} from '../lib/config'

const Board = (props) => {
	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	const renderBoard = () => {
		let board = []
		let position = 0;

		for (let i = 0; i < ROWS_COUNT; i++) {
			let row = []
			for (let j = 0; j < ROWS_COUNT; j++) {
				row.push(renderSquare(position++))
			}
			board.push(
				<div className="board-row" key={i}>
					{row}
				</div>)
		}
		return board
	}

	return (
		<div className="board">
			{renderBoard()}
		</div>
	);
}

export default Board;
