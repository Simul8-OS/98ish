import Board from './Board'
import GameStats from './GameStats.jsx'
import {useBoard} from '../hooks/useBoard'
import {useGameStats} from '../hooks/useGameStats'

const TetrisWindow = ({rows, columns, setGameOver}) => {
    const [board, setBoard] = useBoard({rows, columns})
    const [gameStats, addLinesCleared] = useGameStats();

    return (
        <div className="tetrisWindow">
            <Board board={board}/>
            <GameStats gameStats={gameStats}/>
            <div>Hey</div>
            <div>Hey 2</div>
        </div>
    )
}

export default TetrisWindow