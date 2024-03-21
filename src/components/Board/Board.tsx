import React from "react";
import "./Board.css";
import { coordinates } from "../../constants";

import Row from "../Row/Row";
import { Coordinate } from "../../types";

interface IBoard {
  robotCoordinate: Coordinate;
}

const Board: React.FC<IBoard> = ({ robotCoordinate }) => {
  return (
    <div className="Board">
      <Row
        coordinates={coordinates.slice(0, 5)}
        robotCoordinate={robotCoordinate}
      />
      <Row
        coordinates={coordinates.slice(5, 10)}
        robotCoordinate={robotCoordinate}
      />
      <Row
        coordinates={coordinates.slice(10, 15)}
        robotCoordinate={robotCoordinate}
      />
      <Row
        coordinates={coordinates.slice(15, 20)}
        robotCoordinate={robotCoordinate}
      />
      <Row
        coordinates={coordinates.slice(20, 25)}
        robotCoordinate={robotCoordinate}
      />
    </div>
  );
};

export default Board;
