import { circleCoordinates } from "./coordinates";
import {
  Coordinate,
  ArrowDirection,
  RobotCommandENG,
  GeographyDirection,
  BoardVariant,
  RobotCommandSWE,
  Language,
} from "./types";

// used to compare coordinates
export const arraysAreEqual = <T>(array1: T[], array2: T[]): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};

export const moveRobot = <
  T extends ArrowDirection | RobotCommandENG | RobotCommandSWE
>(
  coordinate: Coordinate,
  direction: T,
  variant: BoardVariant
): Coordinate => {
  let y = coordinate[0];
  let x = coordinate[1];
  switch (direction) {
    case ArrowDirection.Up:
    case RobotCommandENG.UP:
    case RobotCommandSWE.UP:
      y = y + 1;
      break;
    case ArrowDirection.Down:
    case RobotCommandENG.Down:
    case RobotCommandSWE.Down:
      y = y - 1;
      break;
    case ArrowDirection.Right:
    case RobotCommandENG.Right:
    case RobotCommandSWE.Right:
      x = x + 1;
      break;
    case ArrowDirection.Left:
    case RobotCommandENG.Left:
    case RobotCommandSWE.Left:
      x = x - 1;
      break;
    default:
      break;
  }
  const newCoordinate: Coordinate = [y, x];

  if (variant === "square") {
    const position = convertOutOfBounds(newCoordinate);
    return position;
  } else {
    const outOfBoundsFound =
      circleCoordinates.filter((circleCoordinate) =>
        arraysAreEqual(circleCoordinate, newCoordinate)
      ).length === 0;

    if (outOfBoundsFound) {
      return coordinate;
    } else {
      return newCoordinate;
    }
  }
};

const convertOutOfBounds = (coordinate: Coordinate): Coordinate => {
  let y = coordinate[0];
  let x = coordinate[1];
  if (y > 2) {
    y = -2;
  }
  if (y < -2) {
    y = 2;
  }
  if (x > 2) {
    x = -2;
  }
  if (x < -2) {
    x = 2;
  }
  return [y, x];
};

export const convertArrowToRobotCommand = (
  direction: ArrowDirection,
  language: Language
): RobotCommandENG | RobotCommandSWE => {
  switch (direction) {
    case ArrowDirection.Up:
      switch (language) {
        case "ENG":
          return RobotCommandENG.UP;
        default:
          return RobotCommandSWE.UP;
      }

    case ArrowDirection.Down:
      switch (language) {
        case "ENG":
          return RobotCommandENG.Down;
        default:
          return RobotCommandSWE.Down;
      }

    case ArrowDirection.Right:
      switch (language) {
        case "ENG":
          return RobotCommandENG.Right;
        default:
          return RobotCommandSWE.Right;
      }

    case ArrowDirection.Left:
      switch (language) {
        case "ENG":
          return RobotCommandENG.Left;
        default:
          return RobotCommandSWE.Left;
      }
  }
};

export const convertCommandToGeography = <
  T extends RobotCommandENG | RobotCommandSWE
>(
  command: T
) => {
  switch (command) {
    case RobotCommandENG.UP:
    case RobotCommandSWE.UP:
      return GeographyDirection.North;
    case RobotCommandENG.Down:
    case RobotCommandSWE.Down:
      return GeographyDirection.South;
    case RobotCommandENG.Right:
    case RobotCommandSWE.Right:
      return GeographyDirection.East;
    case RobotCommandENG.Left:
    case RobotCommandSWE.Left:
      return GeographyDirection.West;
  }
};

// checks that the command is valid in terms of syntax and language
export const translateCommandCharacter = (
  command: string,
  language: Language
): RobotCommandENG | RobotCommandSWE | null => {
  if (language === "ENG") {
    if (
      command === RobotCommandENG.UP ||
      command === RobotCommandENG.Down ||
      command === RobotCommandENG.Right ||
      command === RobotCommandENG.Left
    ) {
      return command;
    }
  }

  if (language === "SWE") {
    if (
      command === RobotCommandSWE.UP ||
      command === RobotCommandSWE.Down ||
      command === RobotCommandSWE.Right ||
      command === RobotCommandSWE.Left
    ) {
      return command;
    }
  }
  return null;
};
