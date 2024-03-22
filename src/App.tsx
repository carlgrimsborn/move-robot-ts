import React, { useEffect, useRef, KeyboardEvent } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { useState } from "react";
import {
  convertArrowToRobotCommand,
  convertCommandToGeography,
  moveRobot,
} from "./helpers";

import { Coordinate, ArrowDirection, RobotCommand } from "./types";

const App = () => {
  const robotInitialCoordinate: Coordinate = [1, 2];
  const [robotCoordinate, setRobotCoordinate] = useState<Coordinate>(
    robotInitialCoordinate
  );
  const [robotCommandList, setRobotCommandList] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const screenRef = useRef<HTMLDivElement>(null);

  const informationText = "press the arrow keys or use the text input to begin";
  const inputPlaceholderText = "enter L,R,F,B";
  const maxCommands = 10;
  const IS_STARTED = robotCommandList.length === 0;
  const IS_COMPLETED = robotCommandList.length >= 10;

  const reset = () => {
    setRobotCoordinate(robotInitialCoordinate);
    setRobotCommandList("");
    setReport("");
  };

  useEffect(() => {
    if (robotCommandList.length >= maxCommands) {
      const lastCommand = robotCommandList.charAt(robotCommandList.length - 1);
      const report = `Report: ${robotCoordinate} ${convertCommandToGeography(
        lastCommand as RobotCommand
      )}`;
      setReport(report);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      movementKey === ArrowDirection.Up ||
      movementKey === ArrowDirection.Down ||
      movementKey === ArrowDirection.Right ||
      movementKey === ArrowDirection.Left
    ) {
      const newRobotCoordinate = moveRobot(robotCoordinate, movementKey);
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandList(
        (prev) => prev + convertArrowToRobotCommand(movementKey)
      );
    }
  };

  const onTextInputChange = (commands: string) => {
    const lastCommand = commands.charAt(commands.length - 1);
    if (report.length > 0) {
      return;
    }
    if (
      lastCommand === RobotCommand.UP ||
      lastCommand === RobotCommand.Down ||
      lastCommand === RobotCommand.Right ||
      lastCommand === RobotCommand.Left
    ) {
      const newRobotCoordinate = moveRobot(robotCoordinate, lastCommand);
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandList(commands);
    }
  };

  //disabling deleting in the input field
  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;

    if (keyCode === 8 || keyCode === 46) {
      event.preventDefault();
    }
  };

  return (
    <div
      className="App"
      onKeyDown={(event) => onArrowKeyMovement(event.key)}
      tabIndex={0}
      ref={screenRef}
    >
      <p className="InformationText">{IS_STARTED && informationText}</p>
      <p className="ReportText">{report}</p>
      {!IS_COMPLETED && !IS_STARTED && (
        <p>commands left: {10 - robotCommandList.length}</p>
      )}
      <Board robotCoordinate={robotCoordinate} />
      <input
        className="Input"
        value={robotCommandList}
        onChange={(event) =>
          onTextInputChange(event.target.value.toUpperCase())
        }
        onKeyDown={(event) => handleInputKeyDown(event)}
        placeholder={inputPlaceholderText}
      />
      <button onClick={reset} className="ResetButton">
        reset
      </button>
    </div>
  );
};

export default App;
