import _ from 'lodash'
import {COUNT_TO_WIN, ROWS_COUNT, DIRECTIONS} from './config'

/**
 * Inspect whole board and returns whether someone won
 * @param squares
 * @param position
 * @returns {boolean}
 */
export const checkBoard = (squares, position) => {
    const board = _.chunk(squares, ROWS_COUNT);
    const rowIndex = parseInt(position / ROWS_COUNT);
    const pointIndex = position % ROWS_COUNT;

    const calculatePoint = (point, range) => {
    	return Math.abs(point) * (point * range);
	}

	const calculateRow = (point) => {
    	let rows = 0;
		for (let i = 1; i < COUNT_TO_WIN; i++) {
			const x_point = rowIndex + calculatePoint(point[0], i);
			if (!board[x_point])
				break;

			const y_point = calculatePoint(point[1], i);
			if (squares[position] !== board[x_point][pointIndex + y_point])
				break;
			rows++;
		}

		return rows;
	}

    return DIRECTIONS.reduce((accumulator, direction) => {
        if (accumulator) return true;
        let count = 1;
        count += calculateRow(direction);
		for (let i = 1; i < COUNT_TO_WIN; i++) {
			const x_point = rowIndex + calculatePoint(direction[0], i) * (-1);
			if (!board[x_point])
				break;

			const y_point = calculatePoint(direction[1], i);
			if (squares[position] !== board[x_point][pointIndex + (y_point  * (-1))])
				break;
			count++;
		}
        return count >= COUNT_TO_WIN;
    }, false);
};
