import React, { useEffect, useRef } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { useState } from "react";
import { moveRobot } from "./helpers";
import { Coordinate } from "./interfaces";
import { Direction } from "./types";

const App = () => {
  const [robotCoordinate, setRobotCoordinate] = useState<Coordinate>([0, 0]);
  const screenRef = useRef<HTMLDivElement>(null);

  // Focuses the screen on load
  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  const onMovement = (movementKey: string) => {
    console.log(movementKey);
    if (
      movementKey === Direction.Up ||
      movementKey === Direction.Down ||
      movementKey === Direction.Right ||
      movementKey === Direction.Left
    ) {
      console.log(moveRobot(robotCoordinate, movementKey));
    }
  };

  return (
    <div
      className="App"
      onKeyDown={(event) => onMovement(event.key)}
      tabIndex={-1}
      ref={screenRef}
    >
      <p>{robotCoordinate[0] + "," + robotCoordinate[1]}</p>
      <Board robotCoordinate={robotCoordinate} />
    </div>
  );
};

export default App;
