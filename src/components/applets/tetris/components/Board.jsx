import BoardCell from './BoardCell'

const Board = ({board}) => {
    console.log(board.rows.length)
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

    return (
        <div className="tetrisBoard" style={boardStyles}>
            {board.rows.map((row, y) => 
               row.map((cell, x) => 
                <BoardCell key={y+x} cell={cell}/>       
                )
              )}
        </div>
    )
}

export default Board