import "./App.css";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
} from "./sortingAlgorithms";

function App() {
  const [speed, setSpeed] = useState(250);
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    const newArray = Array.from(
      { length: 50 },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = 510 - Number(event.target.value);
    setSpeed(newSpeed);
  };

  const handleSort = useCallback(
    (algorithm: string) => {
      if (isSorting) return;
      setIsSorting(true);
      const newArray = [...array];
      switch (algorithm) {
        case "Bubble Sort":
          bubbleSort(newArray, updateArray, speedRef, setIsSorting);
          break;
        case "Quick Sort":
          quickSort(
            newArray,
            0,
            newArray.length - 1,
            updateArray,
            speedRef,
            setIsSorting
          );
          break;
        case "Merge Sort":
          mergeSort(
            newArray,
            0,
            newArray.length - 1,
            updateArray,
            speedRef,
            setIsSorting
          );
          break;
        case "Insertion Sort":
          insertionSort(newArray, updateArray, speedRef, setIsSorting);
          break;
        default:
          console.error("Unknown sorting algorithm: " + algorithm);
          setIsSorting(false);
          return;
      }
    },
    [array, isSorting]
  );

  const updateArray = (newArray: number[]) => {
    setArray([...newArray]);
  };

  const labelForSpeedSlider = () => {
    if (speed >= 400) return "Slowest";
    if (speed >= 300) return "Slower";
    if (speed >= 350) return "Slow";
    if (speed >= 250) return "Normal";
    if (speed >= 150) return "Fast";
    if (speed >= 25) return "Faster";
    return "Fastest";
  };

  return (
    <div className="app-container">
      <h1>Sorting Visualizer</h1>
      <div className="visualizer-container">
        <div className="speed-container">
          <div className="speed-label">
            Sorting Speed: {labelForSpeedSlider()}
          </div>
          <div className="speed-slider">
            <input
              type="range"
              min="10"
              max="500"
              value={510 - speed}
              onChange={handleSpeedChange}
            />
          </div>
        </div>
        <div className="button-container">
          {["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"].map(
            (algo) => (
              <button
                key={algo}
                className="sort-button"
                onClick={() => handleSort(algo)}
                disabled={isSorting}
              >
                {algo}
              </button>
            )
          )}
          <button
            className="sort-button"
            onClick={generateNewArray}
            disabled={isSorting}
          >
            Generate New Array
          </button>
        </div>
        <div className="bar-container">
          {array.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: `${value}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
