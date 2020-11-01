import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Canvas() {
  const [countOfRows, setCountOfRows] = useState(5);
  const [countOfColumns, setCountOfColumns] = useState(6);
  const [lineBreak, setLineBreak] = useState(null);
  const [arrayCanvas, setArrayCanvas] = useState([]);
  const [fillColor, setFillColor] = useState("red");
  const [x1, setX1] = useState(1);
  const [y1, setY1] = useState(1);
  const [x2, setX2] = useState(4);
  const [y2, setY2] = useState(4);
  const [xColor, setXColor] = useState(3);
  const [yColor, setYColor] = useState(3);

  const getCoordinate = (x, y) => x + countOfColumns * y;

  const drawHorizontal = (min, max, copyArray) => {
    const arrayWithHorizontalLines = copyArray.map((square, index) => {
      if (index <= max && index >= min) {
        const obj = { ...square, color: "black" };
        return obj;
      } else {
        return square;
      }
    });
    return arrayWithHorizontalLines;
  };

  const drawVertical = (min, max, copyArray) => {
    const arrayVerticalLines = copyArray.map((square, index) => {
      if (index >= min && index <= max && (index - min) % lineBreak === 0) {
        const obj = { ...square, color: "black" };
        return obj;
      } else {
        return square;
      }
    });
    return arrayVerticalLines;
  };

  const drawLine = (x1, y1, x2, y2) => {
    let copyArray = arrayCanvas;
    if (!(x1 === x2 || y1 === y2)) {
      alert("You can draw line only horizontal or vertical!!!");
    } else {
      const min = Math.min(getCoordinate(x1, y1), getCoordinate(x2, y2));

      const max = Math.max(getCoordinate(x1, y1), getCoordinate(x2, y2));

      if (y1 === y2) {
        setArrayCanvas(drawHorizontal(min, max, copyArray));
      } else if (x1 === x2) {
        setArrayCanvas(drawVertical(min, max, copyArray));
      }
    }
  };

  const drawRectangle = (x1, y1, x2, y2) => {
    const min1 = Math.min(getCoordinate(x1, y1), getCoordinate(x2, y1));
    const max1 = Math.max(getCoordinate(x1, y1), getCoordinate(x2, y1));

    const min2 = Math.min(getCoordinate(x1, y2), getCoordinate(x2, y2));
    const max2 = Math.max(getCoordinate(x1, y2), getCoordinate(x2, y2));

    const min3 = Math.min(getCoordinate(x1, y1), getCoordinate(x1, y2));
    const max3 = Math.max(getCoordinate(x1, y1), getCoordinate(x1, y2));

    const min4 = Math.min(getCoordinate(x2, y1), getCoordinate(x2, y2));
    const max4 = Math.max(getCoordinate(x2, y1), getCoordinate(x2, y2));

    let copyArray = drawHorizontal(min1, max1, arrayCanvas);
    copyArray = drawHorizontal(min2, max2, copyArray);
    copyArray = drawVertical(min3, max3, copyArray);
    copyArray = drawVertical(min4, max4, copyArray);
    setArrayCanvas(copyArray);
  };

  const drawCanvas = () => {
    setLineBreak(countOfColumns);
    setArrayCanvas(
      new Array(countOfRows * countOfColumns).fill({ color: "white" })
    );
  };

  const fillCanvas = (
    x,
    y,
    countOfColumns,
    countOfRows,
    fillColor,
    copyArrayCanvas
  ) => {
    let copyArray = copyArrayCanvas.slice();
    if (
      x >= 0 &&
      x < countOfColumns &&
      y >= 0 &&
      y < countOfRows &&
      copyArray[getCoordinate(x, y)].color === "white" &&
      copyArray[getCoordinate(x, y)].color !== fillColor 
    ) {
      copyArray[getCoordinate(x, y)].color = fillColor;

      fillCanvas(x + 1, y, countOfColumns, countOfRows, fillColor, copyArray);
      fillCanvas(x - 1, y, countOfColumns, countOfRows, fillColor, copyArray);
      fillCanvas(x, y + 1, countOfColumns, countOfRows, fillColor, copyArray);
      fillCanvas(x, y - 1, countOfColumns, countOfRows, fillColor, copyArray);
    }
    setArrayCanvas(copyArray);
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
              setCountOfRows(Number(event.target.value));
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
              setCountOfColumns(Number(event.target.value));
            }}
          />
          <br />
          <br />
          <label>Coordinates</label>
          <br />
          <label>x1</label>
          <input
            type="number"
            name="x1"
            value={x1}
            onChange={(event) => {
              setX1(Number(event.target.value));
            }}
          />
          <label>y1</label>
          <input
            type="number"
            name="y1"
            value={y1}
            onChange={(event) => {
              setY1(Number(event.target.value));
            }}
          />
          <label>x2</label>
          <input
            type="number"
            name="x2"
            value={x2}
            onChange={(event) => {
              setX2(Number(event.target.value));
            }}
          />
          <label>y2</label>
          <input
            type="number"
            name="y2"
            value={y2}
            onChange={(event) => {
              setY2(Number(event.target.value));
            }}
          />
          <br />
          <br />
          <label>Bucket Fill</label>
          <br />
          <label>x1</label>
          <input
            type="number"
            name="x1"
            value={xColor}
            onChange={(event) => {
              setXColor(Number(event.target.value));
            }}
          />
          <label>y1</label>
          <input
            type="number"
            name="yColor"
            value={yColor}
            onChange={(event) => {
              setYColor(Number(event.target.value));
            }}
          />
          <label>Color</label>
          <input
            type="text"
            name="fillColor"
            value={fillColor}
            onChange={(event) => {
              setFillColor(event.target.value);
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
          <input
            type="button"
            onClick={() => drawRectangle(x1, y1, x2, y2)}
            defaultValue="Draw rectangle "
          />
          <input
            type="button"
            onClick={() =>
              fillCanvas(
                xColor,
                yColor,
                countOfColumns,
                countOfRows,
                fillColor,
                arrayCanvas
              )
            }
            defaultValue="Bucket Fill"
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
