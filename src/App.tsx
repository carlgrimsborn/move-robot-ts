import React, { useEffect, useRef } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { useState } from "react";
import { convertDirection, moveRobot } from "./helpers";

import { Coordinate, Direction, RobotCommand } from "./types";

const App = () => {
  const robotInitialCoordinate: Coordinate = [0, 0];
  const [robotCoordinate, setRobotCoordinate] = useState<Coordinate>(
    robotInitialCoordinate
  );
  const [robotCommandMap, setRobotCommandMap] = useState<RobotCommand | string>(
    ""
  );
  const screenRef = useRef<HTMLDivElement>(null);

  // Focuses the screen on load
  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  const onReset = () => {
    setRobotCoordinate(robotInitialCoordinate);
    setRobotCommandMap("");
  };

  const onMovement = (movementKey: string) => {
    console.log(movementKey);
    if (
      movementKey === Direction.Up ||
      movementKey === Direction.Down ||
      movementKey === Direction.Right ||
      movementKey === Direction.Left
    ) {
      const newRobotCoordinate = moveRobot(robotCoordinate, movementKey);
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandMap((prev) => prev + convertDirection(movementKey));
      console.log(newRobotCoordinate);
    }
  };

  return (
    <div
      className="App"
      onKeyDown={(event) => onMovement(event.key)}
      tabIndex={0}
      ref={screenRef}
    >
      <p>{robotCoordinate[0] + "," + robotCoordinate[1]}</p>
      <Board robotCoordinate={robotCoordinate} />
      <p>{robotCommandMap}</p>
      <button onClick={onReset}>reset</button>
    </div>
  );
};

export default App;
