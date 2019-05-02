import React from 'react';
import Square from './Square'

const Board = (props) => {
	const renderSquare = (i) => {
		return (
			<Square
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	const renderBoard = () => {
		let rows = Array(3)
		let board = []
		let position = 0;
		for (const [index] of rows.entries()) {
			board.push(
				<div className="board-row" key={index}>
					{renderSquare(position++)}
					{renderSquare(position++)}
					{renderSquare(position++)}
				</div>
			)
		}
		return board
	}

	return (
		<div className="board">{renderBoard()}</div>
	);
}

export default Board;
