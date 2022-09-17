import React from "react"

import {buildBoard} from '../utils/BoardLogic'
import {transferToBoard} from '../utils/TetrominoesLogic'

import BoardCell from './BoardCell'

const Preview = ({tetromino, index}) => {
    const {shape, className} = tetromino;

    const board = buildBoard({rows: 4, columns: 4});

    const style = {top: `${index * 10 + 2.2}vw`};

    board.rows = transferToBoard({
        className,
        isOccupied: false,
        position: { row: 0, column: 0 },
        rows: board.rows,
        shape
      });
    
      return (
        <div className="tetrisPreview" style={style}>
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