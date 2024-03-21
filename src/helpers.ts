import { Coordinate, Direction, RobotCommand } from "./types";

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

export const moveRobot = (
  coordinate: Coordinate,
  direction: Direction
): Coordinate => {
  let y = coordinate[0];
  let x = coordinate[1];
  switch (direction) {
    case Direction.Up:
      y = y + 1;
      break;
    case Direction.Down:
      y = y - 1;
      break;
    case Direction.Right:
      x = x + 1;
      break;
    case Direction.Left:
      x = x - 1;
      break;
    default:
      break;
  }

  const position = convertOutOfBounds([y, x]);
  return position;
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

export const convertDirection = <T extends Direction | RobotCommand>(
  direction: T
) => {
  switch (direction) {
    case Direction.Up:
      return RobotCommand.UP;
    case Direction.Down:
      return RobotCommand.Down;
    case Direction.Right:
      return RobotCommand.Right;
    case Direction.Left:
      return RobotCommand.Left;
    case RobotCommand.UP:
      return Direction.Up;
    case RobotCommand.Down:
      return Direction.Down;
    case RobotCommand.Right:
      return Direction.Right;
    case RobotCommand.Left:
      return Direction.Left;
  }
};
