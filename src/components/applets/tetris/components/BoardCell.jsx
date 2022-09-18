const BoardCell = ({cell}) => {
    return(
    <div className={`tetrisBoardCell ${cell.className}`}>
    </div>
    )
}

export default BoardCell