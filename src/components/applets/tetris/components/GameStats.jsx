import React from "react"

const GameStats = ({gameStats}) => {
    const {level, points, linesCompleted, linesPerLevel} = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted

    return (
        <ul className="tetrisGameStats">
            <li>Level</li>
            <li className="text-white">{level}</li>
            <li>Lines to level</li>
            <li className="text-white">{linesToLevel}</li>
            <li>Points</li>
            <li className="text-white">{points}</li>
            <br/>
            <li><span className="text-danger">↔</span> Left/Right</li>
            <li><span className="text-danger">↑</span> Rotate</li>
            <li><span className="text-danger">Space</span> Drop</li>
            <li><span className="text-danger">Q</span> Quit</li>
            <li><span className="text-danger">Tab</span> Refocus</li>
        </ul>
    )

}

export default React.memo(GameStats)