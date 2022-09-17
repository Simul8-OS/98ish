import Menu from './Menu'
import TetrisWindow from './TetrisWindow'
import {useGameOver} from '../hooks/useGameOver'

const Game = ({rows, columns}) => {

    const [gameOver, setGameOver, resetGameOver] = useGameOver(); 

    const start = () => resetGameOver();
    
    return (
        <div className="tetrisGame">
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <TetrisWindow rows={rows} columns={columns} setGameOver={setGameOver}/>
            )}
        </div>
    )
}

export default Game