import Board from './Board'
import GameController from './GameController'
import GameStats from './GameStats'
import Previews from './Previews'

import {useBoard} from '../hooks/useBoard'
import {useGameStats} from '../hooks/useGameStats'
import {usePlayer} from '../hooks/usePlayer'

const TetrisWindow = ({rows, columns, setGameOver}) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board, setBoard] = useBoard({
        rows, 
        columns,
        player,
        resetPlayer,
        addLinesCleared
    })

    return (
        <div className="tetrisWindow">
            <Board board={board}/>
            <GameStats gameStats={gameStats}/>
            <Previews tetrominoes={player.tetrominoes} />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setGameOver={setGameOver}
                setPlayer={setPlayer}
            />
            </div>
    )
}

export default TetrisWindow