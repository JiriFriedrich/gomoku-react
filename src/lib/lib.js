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

	const calculateRow = (point, reverse = false) => {
    	let rows = 0;
    	const direction = (reverse) ? -1 : 1;
		for (let i = 1; i < COUNT_TO_WIN; i++) {
			const x_point = rowIndex + calculatePoint(point[0], i) * direction;
			if (!board[x_point])
				break;

			const y_point = calculatePoint(point[1], i);
			if (squares[position] !== board[x_point][pointIndex + (y_point * direction)])
				break;
			rows++;
		}

		return rows;
	}

    return DIRECTIONS.reduce((accumulator, direction) => {
        if (accumulator) return true;
        let count = 1;
        count += calculateRow(direction);
        count += calculateRow(direction, true)
        return count >= COUNT_TO_WIN;
    }, false);
};
