import {useState, useCallback } from 'react';

import { randomTetromino } from '../utils/TetrominoesLogic';

// previous argument is present when used with setPlayer (represents previous
// state of player), NOT INITIALLY 
const buildPlayer = (previous) => {
    let tetrominoes;

    // if there is a previous state of player, tetrominoes array is equal to previous
    // tetrominoes array
    if (previous) {
        tetrominoes = [...previous.tetrominoes];

        // unshift inserts a new, random tetromino to start of array
        tetrominoes.unshift(randomTetromino());

    // if the player is NEW, created an array of 
    } else {
        tetrominoes = Array(5)
            .fill(0)
            .map((_) => randomTetromino());
    }

    // DEFAULT PLAYER CONSISTS OF: collided boolean, isFastDropping boolean (false and false),
    // position of 0 4, the array of tetrominoes, and the current tetromino (popped from end of 
    // tetrominoes list)
    return {
        collided: false,
        isFastDropping: false,
        position: {row: 0, column: 4},
        tetrominoes,
        tetromino: tetrominoes.pop()
    }
};

export const usePlayer = () => {
    // lazy initialization with method above
    const [player, setPlayer] = useState(buildPlayer());

    // unshifts a tetromino upon reset
    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
}