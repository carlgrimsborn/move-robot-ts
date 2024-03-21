import React from "react";
import "./Square.css";
import robot from "../../assets/robot.png";

interface ISquare {
  robotOnSquare: boolean;
}

const Square: React.FC<ISquare> = ({ robotOnSquare }) => {
  if (robotOnSquare) {
    return <img className="Square" src={robot} alt="robot" />;
  } else {
    return <div className="Square" />;
  }
};

export default Square;
