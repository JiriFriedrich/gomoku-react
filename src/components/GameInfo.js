import React from 'react'
import {SHOW_GAME_INFO} from '../lib/config'

const GameInfo = (props) => {

    const moves = props.history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => props.stepChange(move)}>{desc}</button>
            </li>
        );
    });

    const renderInfo = () => {
        if (SHOW_GAME_INFO) {
            return (
                <div className="game-info">
                    <div>{props.status}</div>
                    <ol>{moves}</ol>
                </div>
            )
        }

        return null;
    };

    return (
        <React.Fragment>
            {renderInfo()}
        </React.Fragment>
    )
};

export default GameInfo;
