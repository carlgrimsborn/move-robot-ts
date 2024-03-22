import React from "react";
import "./Board.css";
import { circleCoordinates, squareCoordinates } from "../../constants";

import Row from "../Row/Row";
import { Coordinate } from "../../types";

export type BoardVariant = "square" | "circle";

interface IBoard {
  robotCoordinate: Coordinate;
  variant: BoardVariant;
}

const Board: React.FC<IBoard> = ({ robotCoordinate, variant }) => {
  if (variant === "square") {
    return (
      <div className="SquareBoard">
        <Row
          coordinates={squareCoordinates.slice(0, 5)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={squareCoordinates.slice(5, 10)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={squareCoordinates.slice(10, 15)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={squareCoordinates.slice(15, 20)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={squareCoordinates.slice(20, 25)}
          robotCoordinate={robotCoordinate}
        />
      </div>
    );
  } else {
    return (
      <div className="CircleBoard">
        <Row
          coordinates={circleCoordinates.slice(0, 2)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(2, 6)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(6, 12)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(12, 20)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(20, 30)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(30, 38)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(38, 44)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(44, 48)}
          robotCoordinate={robotCoordinate}
        />
        <Row
          coordinates={circleCoordinates.slice(48, 50)}
          robotCoordinate={robotCoordinate}
        />
      </div>
    );
  }
};

export default Board;
