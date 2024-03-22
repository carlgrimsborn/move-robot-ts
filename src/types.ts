export enum ArrowDirection {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Right = "ArrowRight",
  Left = "ArrowLeft",
}

export enum RobotCommandENG {
  UP = "F",
  Down = "B",
  Right = "R",
  Left = "L",
}

export enum RobotCommandSWE {
  UP = "G",
  Down = "B",
  Right = "H",
  Left = "V",
}

export enum GeographyDirection {
  North = "N",
  South = "S",
  East = "Ö",
  West = "V",
}

export type Coordinate = [number, number];

export type BoardVariant = "square" | "circle";

export type Language = "SWE" | "ENG";
