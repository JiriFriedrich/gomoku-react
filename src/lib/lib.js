import _ from 'lodash'

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

export { checkBoard }
