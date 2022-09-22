import Menu from './Menu'
import TetrisWindow from './TetrisWindow'
import {useGameOver} from '../hooks/useGameOver'

// Tetris.jsx rows=20 columns=10 -> Game
const Game = ({rows, columns}) => {

    // [gameOver, setGameOver] = useState(true)
    // resetGameOver = useCallback(() => {setGameOver(false)}, [])
    
    const [gameOver, setGameOver, resetGameOver] = useGameOver(); 

    // gameOver -> false  == game has started
    const start = () => resetGameOver();
    
    return (
        <div className="tetrisGame">
            {gameOver ? (
                // onClick can be passed down just like any other prop
                <Menu onClick={start} />
            ) : (
                <TetrisWindow rows={rows} columns={columns} setGameOver={setGameOver}/>
            )}
        </div>
    )
}

export default Game