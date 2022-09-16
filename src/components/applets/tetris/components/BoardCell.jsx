const BoardCell = ({cell}) => {
    return(
    <div className={`tetrisBoardCell ${cell.className}`}>
        <div></div>
    </div>
    )
}

export default BoardCell