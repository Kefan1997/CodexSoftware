import React, { useState } from "react";
import ReactDOM from "react-dom";
// import classNames from "classnames";
import "./index.css";

function Canvas() {
  const [countOfRows, setCountOfRows] = useState(4);
  const [countOfColumns, setCountOfColumns] = useState(20);
  const [lineBreak, setLineBreak] = useState(null);
  const [arrayCanvas, setArrayCanvas] = useState([]);

  const drawCanvas = () => {
    console.log(`raws: ${countOfRows}, columns: ${countOfColumns}`);
    setLineBreak(countOfColumns);
    setArrayCanvas(
      new Array(countOfRows * countOfColumns).fill({ color: "white" })
    );
  };

  return (
    <div className="canvas">
      <div className="canvas-input">
        <form>
          <label>Number of Rows:</label>
          <br />
          <input
            type="number"
            name="Rows"
            value={countOfRows}
            onChange={(event) => {
              setCountOfRows(event.target.value);
            }}
          />
          <br />
          <br />
          <label>Number of Columns:</label>
          <br />
          <input
            type="number"
            name="Columns"
            value={countOfColumns}
            onChange={(event) => {
              setCountOfColumns(event.target.value);
            }}
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
        <div>
          <div className="status">Canvas</div>
          <div className="board-row">
            {arrayCanvas.map((square, index) =>
              (index + 1) % lineBreak === 0 ? (
                <React.Fragment>
                  <span
                    className="square"
                    style={{ background: square.color }}
                    key={index}
                    id={index}
                  ></span>
                  <br />
                </React.Fragment>
              ) : (
                <span className="square" style={{ background: square.color }} key={index} id={index}></span>
              )
            )}
          </div>
        </div>
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
