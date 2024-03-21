import { Coordinate, ArrowDirection, RobotTextCommand } from "./types";

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
  direction: ArrowDirection | RobotTextCommand
): Coordinate => {
  let y = coordinate[0];
  let x = coordinate[1];
  console.log(direction === RobotTextCommand.UP);
  switch (direction) {
    case ArrowDirection.Up:
    case RobotTextCommand.UP:
      y = y + 1;
      break;
    case ArrowDirection.Down:
    case RobotTextCommand.Down:
      y = y - 1;
      break;
    case ArrowDirection.Right:
    case RobotTextCommand.Right:
      x = x + 1;
      break;
    case ArrowDirection.Left:
    case RobotTextCommand.Left:
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

export const convertDirection = <T extends ArrowDirection | RobotTextCommand>(
  direction: T
) => {
  switch (direction) {
    case ArrowDirection.Up:
      return RobotTextCommand.UP;
    case ArrowDirection.Down:
      return RobotTextCommand.Down;
    case ArrowDirection.Right:
      return RobotTextCommand.Right;
    case ArrowDirection.Left:
      return RobotTextCommand.Left;
    case RobotTextCommand.UP:
      return ArrowDirection.Up;
    case RobotTextCommand.Down:
      return ArrowDirection.Down;
    case RobotTextCommand.Right:
      return ArrowDirection.Right;
    case RobotTextCommand.Left:
      return ArrowDirection.Left;
  }
};
