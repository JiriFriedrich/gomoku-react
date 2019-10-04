import _ from 'lodash'
import {COUNT_TO_WIN, ROWS_COUNT} from './config'

/**
 * Inspect whole board and returns whether someone won
 * @param squares
 * @param position
 * @returns {boolean}
 */
export const checkBoard = (squares, position) => {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    const board = _.chunk(squares, ROWS_COUNT);
    const rowIndex = parseInt(position / ROWS_COUNT);
    const pointIndex = position % ROWS_COUNT;

    return directions.reduce((accumulator, direction) => {
        if (accumulator) return true;
        for (let i = 1; i < COUNT_TO_WIN; i++) {
            const absolute_value = Math.abs(direction[0]);
            const direction_point = direction[0] * i;
            const x_point = rowIndex + (absolute_value * direction_point);
            if (!board[x_point]) return false;

            const absolute_value_y = Math.abs(direction[1]);
            const direction_point_y = direction[1] * i;

            if (squares[position] !== board[x_point][pointIndex + (absolute_value_y * direction_point_y)])
                return false;
        }
        return true;
    }, false);
};
