import _ from 'lodash'

const calculateWinner = (squares) => {
    const lines = [
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const checkBoard = (squares) => {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]
    const board = _.chunk(squares, 3)
    let contains = false
    let winningMove = false;

    board.forEach((row, rowIndex) => {
        row.forEach((point, pointIndex) => {
            if (!point) return;
            directions.forEach((direction) => {
                for (let i = 1; i < 3; i++) {
                    contains = false
                    const absolute_value = Math.abs(direction[0])
                    const direction_point = direction[0] * i
                    const x_point = rowIndex + (absolute_value * direction_point)
                    if (!board[x_point]) continue

                    const absolute_value_y = Math.abs(direction[1])
                    const direction_point_y = direction[1] * i

                    if (point === board[x_point][pointIndex + (absolute_value_y * direction_point_y)]) {
                        contains = true
                    }
                    if (!contains) break
                }
                if (contains) winningMove = true
            })
        })
    })

    return winningMove
}

export { calculateWinner, checkBoard }
