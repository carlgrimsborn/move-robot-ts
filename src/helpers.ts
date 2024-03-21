import { Coordinate } from "./interfaces";
import { Direction } from "./types";


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
  return [y, x];
};
