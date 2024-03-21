import React, { useEffect, useRef, KeyboardEvent } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { useState } from "react";
import { convertDirection, moveRobot } from "./helpers";

import { Coordinate, ArrowDirection, RobotTextCommand } from "./types";

const App = () => {
  const robotInitialCoordinate: Coordinate = [0, 0];
  const [robotCoordinate, setRobotCoordinate] = useState<Coordinate>(
    robotInitialCoordinate
  );
  const [robotCommandList, setRobotCommandList] = useState<
    RobotTextCommand | string
  >("");
  const [report, setReport] = useState<string>("");
  const screenRef = useRef<HTMLDivElement>(null);

  const informationText = "press the arrow keys or use the text input to begin";
  const inputPlaceholderText = "enter N,S,Ö,V";

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
      movementKey === ArrowDirection.Up ||
      movementKey === ArrowDirection.Down ||
      movementKey === ArrowDirection.Right ||
      movementKey === ArrowDirection.Left
    ) {
      const newRobotCoordinate = moveRobot(robotCoordinate, movementKey);
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandList((prev) => prev + convertDirection(movementKey));
      console.log(newRobotCoordinate);
    }
  };

  const onTextInputChange = (commands: string) => {
    const lastCommand = commands.charAt(commands.length - 1);
    if (report.length > 0) {
      return;
    }
    if (
      lastCommand === RobotTextCommand.UP ||
      lastCommand === RobotTextCommand.Down ||
      lastCommand === RobotTextCommand.Right ||
      lastCommand === RobotTextCommand.Left
    ) {
      const newRobotCoordinate = moveRobot(
        robotCoordinate,
        lastCommand as RobotTextCommand
      );
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
      <p className='InformationText'>{robotCommandList.length === 0 && informationText}</p>
      <p className="ReportText">{report}</p>
      <Board robotCoordinate={robotCoordinate} />
      <input
        value={robotCommandList}
        onChange={(event) =>
          onTextInputChange(event.target.value.toUpperCase())
        }
        onKeyDown={(event) => handleInputKeyDown(event)}
        placeholder={inputPlaceholderText}
        className="Input"
      />
      <button onClick={reset} className="ResetButton">
        reset
      </button>
    </div>
  );
};

export default App;
