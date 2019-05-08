import React from 'react';
import Square from './Square'
import {ROWS_COUNT} from '../lib/config'

/**
 * Main game board
 * @param props
 */
const Board = (props) => {

	/**
	 * Render one game field
	 * @param i
	 * @returns {*}
	 */
	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	};

	/**
	 * Create and return 2D array representing game board
	 * @returns {Array}
	 */
	const renderBoard = () => {
		const createRow = (row_index) => {
			return Array.from(Array(ROWS_COUNT), (value, index) => renderSquare((row_index * ROWS_COUNT) + index))
		};

		return Array.from(Array(ROWS_COUNT), (value, index) => (
			<div className="board-row" key={index}>
				{createRow(index)}
			</div>
		));
	};

	return (
		<div className="board">
			{renderBoard()}
		</div>
	);
};

export default Board;
