import React from "react";

import Square from "../Square/Square";
import "./Row.css";
import { arraysAreEqual } from "../../helpers";
import { Coordinate } from "../../interfaces";

interface IRow {
  coordinates: Coordinate[];
  robotCoordinate: Coordinate;
}

const Row: React.FC<IRow> = ({ coordinates, robotCoordinate }) => {
  return (
    <div className="Row">
      {coordinates.map((coordinate, i) => {
        const robotPositionFound = arraysAreEqual(coordinate, robotCoordinate);
        return <Square robotOnSquare={robotPositionFound} key={i} />;
      })}
    </div>
  );
};

export default Row;
