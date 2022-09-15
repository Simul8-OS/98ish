const BoardCell = ({cell}) => {
    return(
    <div className={`tetrisBoardCell ${cell.className}`}>
        <div>Hey</div>
    </div>
    )
}

export default BoardCell