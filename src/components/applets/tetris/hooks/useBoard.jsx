import {useState, useEffect} from "react"
import {buildBoard, nextBoard} from "../utils/BoardLogic"


// PROPS DESTRUCTURED
export const useBoard = ({rows, columns, player, resetPlayer, addLinesCleared}) => {

    // THIS BUILDS BOARD USING METHOD FROM BoardLogic
    // buildBoard takes in rows and columns and returns a 2D array called 'rows' and 
    // a size object {rows, columns} (2d array rows != second 'rows' for size)
    const [board, setBoard] = useState(buildBoard({ rows, columns }));

    // UseEffect which will re-render board whenever player, resetPlayer, or addLinesCleared 
    // change
    useEffect(() => {
        setBoard((previousBoard) =>
          // uses previous state of board and creates next board
          nextBoard({
            board: previousBoard,
            player,
            resetPlayer,
            addLinesCleared
          })
        );
      }, [player, resetPlayer, addLinesCleared]);

    return [board]
}

