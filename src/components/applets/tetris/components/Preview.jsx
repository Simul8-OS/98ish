import React from "react"

import {buildBoard} from '../utils/BoardLogic'
import {transferToBoard} from '../utils/TetrominoesLogic'

import BoardCell from './BoardCell'


const Preview = ({tetromino}) => {
    const {shape, className} = tetromino;

    // same board logic for main gameboard is used for each preview !!!
    const board = buildBoard({rows: 4, columns: 4});

    // transferToBoard from TetrominoesLogic, generates NEW ARRAY with "occupied", "className=color" for 
    board.rows = transferToBoard({

        // className from passed down tetromino prop, will only apply to OCCUPIED CELLS
        className,

        isOccupied: false,
        position: { row: 0, column: 0 },
        rows: board.rows,

        // shape from prop, THIS IS A 2D ARRAY DEPICTING THE ACTUAL SHAPE OF TETROMINO
        shape
      });
    
      return (
        <div className="tetrisPreview">
          <div className="tetrisPreviewBoard">
            {board.rows.map((row, y) =>
              row.map((cell, x) => (
                <BoardCell key={x * board.size.columns + x} cell={cell} />
              ))
            )}
          </div>
        </div>
      );
    };
    
    export default React.memo(Preview);