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
  const [robotCommandList, setRobotCommandList] = useState<
    RobotCommand | string
  >("");
  const [report, setReport] = useState<string>("");
  const screenRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setRobotCoordinate(robotInitialCoordinate);
    setRobotCommandList("");
    setReport("");
  };

  useEffect(() => {
    if (robotCommandList.length >= 10) {
      const report = `Report: ${robotCoordinate} ${robotCommandList.charAt(
        robotCommandList.length - 1
      )}`;
      setReport(report);
    }
  }, [robotCommandList]);

  // Focuses the screen on load
  useEffect(() => {
    screenRef.current?.focus();
  }, []);

  const onArrowKeyMovement = (movementKey: string) => {
    if (report.length > 0) {
      return;
    }
    if (
      movementKey === Direction.Up ||
      movementKey === Direction.Down ||
      movementKey === Direction.Right ||
      movementKey === Direction.Left
    ) {
      const newRobotCoordinate = moveRobot(robotCoordinate, movementKey);
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandList((prev) => prev + convertDirection(movementKey));
      console.log(newRobotCoordinate);
    }
  };

  return (
    <div
      className="App"
      onKeyDown={(event) => onArrowKeyMovement(event.key)}
      tabIndex={0}
      ref={screenRef}
    >
      <p>{report}</p>
      <Board robotCoordinate={robotCoordinate} />
      <p>{robotCommandList}</p>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default App;
