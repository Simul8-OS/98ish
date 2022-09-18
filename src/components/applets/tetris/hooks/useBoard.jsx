import {useState, useEffect} from "react"
import {buildBoard, nextBoard} from "../utils/BoardLogic"

// This hook is first instance of using a separate "business logic" file to handle all of
// the logic related to the board. buildBoard takes in rows and columns as integers and returns 
// a 2D array of defaultCells (from CellLogic) and the size in object format {rows, columns}

// PROPS DESTRUCTURED
export const useBoard = ({rows, columns, player, resetPlayer, addLinesCleared}) => {

    // THIS BUILDS BOARD USING METHOD FROM BoardLogic
    // buildBoard takes in rows and columns and returns a 2D array called 'rows' and 
    // a size object {rows, columns} 
    const [board, setBoard] = useState(buildBoard({ rows, columns }));

    // UseEffect which will re-render board whenever player, resetPlayer, or addLinesCleared 
    // change
    useEffect(() => {
        setBoard((previousBoard) =>
          // uses previous state of board and creates next board

          // implicit return of next board
          nextBoard({
            // rows/columns of cells
            board: previousBoard,
            
            player,
            resetPlayer,
            addLinesCleared
          })
        );
      }, [player, resetPlayer, addLinesCleared]);

    return [board]
}

