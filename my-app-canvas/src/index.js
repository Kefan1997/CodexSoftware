import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <span className="square" onClick={props.onClick}>
      {props.value}
    </span>
  );
}

function Raw(arrayCanvas, countOfColumns, countOfRows) {
  
  const createSquares = arrayCanvas.map((square, index) => (
    <span className="square" key={index} id={index}>
      
    </span>
  ));
  // const row;
  const arrayRows = new Array(countOfRows).map((row, index) => (
    <div className="board-row" key={index}></div>
  ));
  
  return <div className="board-row"></div>;
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Canvas";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>
    );
  }
}

function Canvas() {
  const [countOfRows, setCountOfRows] = useState(4);
  const [countOfColumns, setCountOfColumns] = useState(20);

  const arrayCanvas = [];
  console.log(arrayCanvas);

  const drawCanvas = (raws, columns) => {
    // setCountOfRaws(raws);
    // setCountOfColumns(columns);
    console.log(`raws: ${countOfRows}, columns: ${countOfColumns}`);
    arrayCanvas.length = countOfColumns * countOfRows;
    arrayCanvas.fill({ color: "white" });
    console.log(arrayCanvas);
  };

  return (
    <div className="canvas">
      <div className="canvas-input">
        <form>
          <label>Number of Rows:</label>
          <br />
          <input
            type="number"
            value={countOfRows}
            onChange={(event) => setCountOfRows(event.target.value)}
          />
          <br />
          <br />
          <label>Number of Columns:</label>
          <br />
          <input
            type="number"
            value={countOfColumns}
            onChange={(event) => setCountOfColumns(event.target.value)}
          />
          <br />
          <br />
          <input
            type="button"
            onClick={() => drawCanvas()}
            defaultValue="Draw Canvas"
          />
        </form>
      </div>
      <div className="canvas-board">
        <Board />
      </div>
      <div className="canvas-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Canvas></Canvas>, document.getElementById("root"));
