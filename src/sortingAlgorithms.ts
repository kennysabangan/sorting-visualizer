type UpdateArrayFunction = (newArray: number[]) => void;

export const bubbleSort = (
  arr: number[],
  updateArray: UpdateArrayFunction,
  speedRef: React.MutableRefObject<number>,
  setIsSorting: (value: boolean) => void
) => {
  let i = 0;
  let j = 0;
  const n = arr.length;

  const step = () => {
    if (i < n - 1) {
      if (j < n - i - 1) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          updateArray(arr);
        }
        j++;
      } else {
        i++;
        j = 0;
      }
      setTimeout(step, speedRef.current);
    } else {
      setIsSorting(false);
    }
  };

  step();
};

export const quickSort = (
  arr: number[],
  low: number,
  high: number,
  updateArray: UpdateArrayFunction,
  speedRef: React.MutableRefObject<number>,
  setIsSorting: (value: boolean) => void
) => {
  const stack: [number, number][] = [[low, high]];

  const step = () => {
    if (stack.length > 0) {
      const [l, h] = stack.pop()!;
      if (l < h) {
        const pivotIndex = partition(arr, l, h);
        stack.push([l, pivotIndex - 1]);
        stack.push([pivotIndex + 1, h]);
      }
      updateArray(arr);
      setTimeout(step, speedRef.current);
    } else {
      setIsSorting(false);
    }
  };

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  step();
};

export const mergeSort = (
  arr: number[],
  left: number,
  right: number,
  updateArray: UpdateArrayFunction,
  speedRef: React.MutableRefObject<number>,
  setIsSorting: (value: boolean) => void
) => {
  const step = (left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      step(left, middle);
      step(middle + 1, right);
      merge(arr, left, middle, right);
      updateArray(arr);
      setTimeout(() => step(left, right), speedRef.current);
    } else {
      setIsSorting(false);
    }
  };

  const merge = (arr: number[], left: number, middle: number, right: number) => {
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  };

  step(left, right);
};

export const insertionSort = (
  arr: number[],
  updateArray: UpdateArrayFunction,
  speedRef: React.MutableRefObject<number>,
  setIsSorting: (value: boolean) => void
) => {
  let i = 1;

  const step = () => {
    if (i < arr.length) {
      let j = i;
      while (j > 0 && arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        j--;
      }
      i++;
      updateArray(arr);
      setTimeout(step, speedRef.current);
    } else {
      setIsSorting(false);
    }
  };

  step();
};
