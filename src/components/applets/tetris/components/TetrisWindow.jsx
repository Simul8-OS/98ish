import Board from './Board'
import GameController from './GameController'
import GameStats from './GameStats'
import Previews from './Previews'

import {useBoard} from '../hooks/useBoard'
import {useGameStats} from '../hooks/useGameStats'
import {usePlayer} from '../hooks/usePlayer'

// Game rows=20 columns=10 setGameOver (true=game not started)
const TetrisWindow = ({rows, columns, setGameOver}) => {

    // gameStats initial state = buildGameStats() (LAZY INITIALIZATION, computation done only once and not necessary on subsequent re-renders)
    // buildGameStats sets initial state to --> level: 1, linesCompleted: 0, 
    // linesPerLevel: 10, points: 0

    // addLinesCleared is a function that takes in the number of new lines cleared
    // and adjusts the state of gameStats accordingly. Utilizes useCallback for performance 
    // optimization (? still need to know how exactly)
    const [gameStats, addLinesCleared] = useGameStats();

    // initial player has the following attributes --> collided: false, isFastDropping: false,
    // position: up top, array of tetrominoes, popped off tetromino from end of array of tetrominoes
    const [player, setPlayer, resetPlayer] = usePlayer();

    // takes in rows, columns from game, player/reset player from above, addLinesCleared from above
    const [board] = useBoard({
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