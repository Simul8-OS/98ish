import { useState, useCallback } from "react";

const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  // lines = new amount of lines cleared (1-4)
  const addLinesCleared = useCallback((lines) => {

    // setGameStats (and ANY setter for useState hook) can be passed an optional function which 
    // receives the previous value of state and return an updated value
    setGameStats((previous) => {

      const points = previous.points + lines * 100;
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;

      // 10 lines per level
      const linesCompleted = newLinesCompleted % linesPerLevel;

      // This return is the new state of gameStats
      return {
        level,
        linesCompleted,
        linesPerLevel,
        points
      };
      // still not sure about this second empty array argument
    }, []);
  }, []);

  return [gameStats, addLinesCleared];
};
