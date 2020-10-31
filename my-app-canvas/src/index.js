import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Canvas() {
  const [countOfRows, setCountOfRows] = useState(5);
  const [countOfColumns, setCountOfColumns] = useState(6);
  const [lineBreak, setLineBreak] = useState(null);
  const [arrayCanvas, setArrayCanvas] = useState([]);
  const [x1, setX1] = useState(2);
  const [y1, setY1] = useState(1);
  const [x2, setX2] = useState(2);
  const [y2, setY2] = useState(4);

  const getCoordinate = (x, y) => x + countOfColumns * y;

  const drawHorizontal = (min, max) => {
    console.log('arrayCanvas in function drawHorizontal:', arrayCanvas);
    const arrayWithHorizontalLine = arrayCanvas.map((square, index) => {
      const obj = {...square, color: index <= max && index >= min ? "red" : "white"};
      return obj;
    });
    console.log('arrayWithHorizontalLine in function drawHorizontal:',arrayWithHorizontalLine);
    return arrayWithHorizontalLine;
  };
  

  const drawVertical = (min, max) => {
    const copyArray = arrayCanvas;
    console.log('copyArray in function drawVertical:', copyArray);
    for (let i = min; i <= max; i += lineBreak) {
      copyArray[i] = {...copyArray[i], color: 'red'};
    }
    console.log(copyArray);
    // return copyArray;
  }

  const drawLine = (x1, y1, x2, y2) => {
    console.log('arrayCanvas in function drawLine:', arrayCanvas);
    // if (!(x1 === x2 || y1 === y2)) {
    //   alert("You can draw line only horizontal or vertical!!!");
    // } else {

      console.log(`x1: ${x1}`);
      console.log(`y1: ${y1}`);
      console.log(`x2: ${x2}`);
      console.log(`y2: ${y2}`);

      const firstCoordinate = getCoordinate(x1, y1);

      const secondCoordinate = getCoordinate(x2, y2);

      const min = Math.min(firstCoordinate, secondCoordinate);

      const max = Math.max(firstCoordinate, secondCoordinate);

      console.log(`firstCoordinate: ${firstCoordinate}`);
      console.log(`secondCoordinate: ${secondCoordinate}`);

      if (y1 === y2) {
        console.log('here 1')
        setArrayCanvas(drawHorizontal(min, max));
      } else if (x1 === x2 ) {
        console.log('here 2 ')
        setArrayCanvas(drawVertical(min, max));
      }
    // }
  };

  const drawCanvas = () => {
    setLineBreak(countOfColumns);
    setArrayCanvas(
      new Array(countOfRows * countOfColumns).fill({ color: "white" })
    );
  };

  return (
    <div className="canvas">
      <div className="canvas-input">
        <form>
          <label className=" blue">Number of Rows:</label>
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
          <label className="blue red">Number of Columns:</label>
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
          <label>Line</label>
          <br />
          <label>x1</label>
          <input
            type="number"
            name="x1"
            value={x1}
            onChange={(event) => {
              setX1(event.target.value);
            }}
          />
          <label>y1</label>
          <input
            type="number"
            name='y1'
            value={y1}
            onChange={(event) => {
              setY1(event.target.value);
            }}
          />
          <label>x2</label>
          <input
            type="number"
            name='x2'
            value={x2}
            onChange={(event) => {
              setX2(event.target.value);
            }}
          />
          <label>y2</label>
          <input
            type="number"
            name='y2'
            value={y2}
            onChange={(event) => {
              setY2(event.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="button"
            onClick={() => drawCanvas()}
            defaultValue="Draw Canvas"
          />
          <input
            type="button"
            onClick={() => drawLine(x1, y1, x2, y2)}
            defaultValue="Draw line "
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
                  >
                    {index}
                  </span>
                  <br />
                </React.Fragment>
              ) : (
                <span
                  className="square"
                  style={{ background: square.color }}
                  key={index}
                  id={index}
                >
                  {index}
                </span>
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
