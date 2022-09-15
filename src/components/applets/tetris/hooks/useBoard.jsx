import {useState} from "react"
import {buildBoard} from "../utils/BoardLogic"

export const useBoard = ({rows, columns}) => {
    const board = useState(buildBoard({rows, columns}))

    return board
}

export default useBoard