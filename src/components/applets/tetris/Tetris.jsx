import Game from './components/Game'

const Tetris = () => {
    return (
        <div className="tetrisApp">
            <Game rows={20} columns={10} />
        </div>
    )
}

export default Tetris

