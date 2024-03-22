import { BoardVariant } from "./components/Board/Board";
import { circleCoordinates } from "./constants";
import {
  Coordinate,
  ArrowDirection,
  RobotCommand,
  GeographyDirection,
} from "./types";

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

export const moveRobot = <T extends ArrowDirection | RobotCommand>(
  coordinate: Coordinate,
  direction: T,
  variant: BoardVariant
): Coordinate => {
  let y = coordinate[0];
  let x = coordinate[1];
  switch (direction) {
    case ArrowDirection.Up:
    case RobotCommand.UP:
      y = y + 1;
      break;
    case ArrowDirection.Down:
    case RobotCommand.Down:
      y = y - 1;
      break;
    case ArrowDirection.Right:
    case RobotCommand.Right:
      x = x + 1;
      break;
    case ArrowDirection.Left:
    case RobotCommand.Left:
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

    console.log(outOfBoundsFound, newCoordinate);
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
  direction: ArrowDirection
): RobotCommand => {
  switch (direction) {
    case ArrowDirection.Up:
      return RobotCommand.UP;
    case ArrowDirection.Down:
      return RobotCommand.Down;
    case ArrowDirection.Right:
      return RobotCommand.Right;
    case ArrowDirection.Left:
      return RobotCommand.Left;
  }
};

export const convertCommandToGeography = (command: RobotCommand) => {
  switch (command) {
    case RobotCommand.UP:
      return GeographyDirection.North;
    case RobotCommand.Down:
      return GeographyDirection.South;
    case RobotCommand.Right:
      return GeographyDirection.East;
    case RobotCommand.Left:
      return GeographyDirection.West;
  }
};
