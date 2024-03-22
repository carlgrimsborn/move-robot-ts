import React, { useEffect, useRef, KeyboardEvent } from "react";
import "./App.css";
import { useState } from "react";
import {
  convertArrowToRobotCommand,
  convertCommandToGeography,
  moveRobot,
  translateCommandCharacter,
} from "./helpers";

import {
  Coordinate,
  ArrowDirection,
  RobotCommandENG,
  BoardVariant,
  Language,
  RobotCommandSWE,
} from "./types";
import Input from "./components/Input/Input";
import Board from "./components/Board/Board";

const App = () => {
  const squareInitialCoordinate: Coordinate = [1, 2];
  const [robotCoordinate, setRobotCoordinate] = useState<Coordinate>(
    squareInitialCoordinate
  );
  const [robotCommandList, setRobotCommandList] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [boardVariant, setBoardVariant] = useState<BoardVariant>("square");
  const [language, setCurrentLanguage] = useState<Language>("ENG");
  const screenRef = useRef<HTMLDivElement>(null);

  const informationText = "press the arrow keys or use the text input to begin";
  const inputPlaceholder =
    language === "ENG" ? "enter L,R,F,B" : "skriv V,H,G,B";
  const maxCommands = 10;
  const IS_STARTED = robotCommandList.length === 0;
  const IS_COMPLETED = robotCommandList.length >= 10;

  const reset = (initialCoordinate?: Coordinate) => {
    setRobotCoordinate(initialCoordinate ? initialCoordinate : [0, 0]);
    setRobotCommandList("");
    setReport("");
  };

  useEffect(() => {
    if (robotCommandList.length >= maxCommands) {
      const lastCommand = robotCommandList.charAt(robotCommandList.length - 1);
      const report = `Report: ${robotCoordinate} ${convertCommandToGeography(
        lastCommand as RobotCommandENG | RobotCommandSWE
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
      const newRobotCoordinate = moveRobot(
        robotCoordinate,
        movementKey,
        boardVariant
      );
      setRobotCoordinate(newRobotCoordinate);
      setRobotCommandList(
        (prev) => prev + convertArrowToRobotCommand(movementKey, language)
      );
    }
  };

  const onTextInputChange = (commands: string) => {
    const lastCommand = commands.charAt(commands.length - 1);
    if (report.length > 0) {
      return;
    }
    const commandCharacter = translateCommandCharacter(lastCommand, language);

    if (!!commandCharacter) {
      const newRobotCoordinate = moveRobot(
        robotCoordinate,
        commandCharacter,
        boardVariant
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

  const toggleVariant = () => {
    if (boardVariant === "square") {
      setBoardVariant("circle");
      reset();
    } else {
      setBoardVariant("square");
      reset(squareInitialCoordinate);
    }
  };

  const onChangeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    reset(boardVariant === "square" ? squareInitialCoordinate : undefined);
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
      <Board robotCoordinate={robotCoordinate} variant={boardVariant} />
      <Input
        value={robotCommandList}
        placeholder={inputPlaceholder}
        language={language}
        handleInputKeyDown={handleInputKeyDown}
        onTextInputChange={onTextInputChange}
        onChangeLanguage={onChangeLanguage}
      />
      <button onClick={() => reset()} className="ResetButton">
        reset
      </button>
      <div className="ToggleField">
        <p>variant:</p>
        <p onClick={toggleVariant} className="VariantText">
          {boardVariant}
        </p>
      </div>
    </div>
  );
};

export default App;
