export type SortStep = {
    array: number[];
    comparison: number[];
    description: string;
};

export function* bubbleSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            yield {
                array: [...arr],
                comparison: [j, j + 1],
                description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
            };

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                yield {
                    array: [...arr],
                    comparison: [j, j + 1],
                    description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
                };
            }
        }
    }

    yield {
        array: [...arr],
        comparison: [],
        description: 'Sorting complete!',
    };
}

export function* mergeSort(array: number[]): Generator<SortStep> {
    const arr = [...array];

    function* merge(start: number, mid: number, end: number): Generator<SortStep> {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            yield { array: [...arr], comparison: [start + i, mid + 1 + j], description: `Comparing ${left[i]} and ${right[j]}` };

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            yield { array: [...arr], comparison: [k], description: `Merged ${arr[k]} into position ${k}` };
            k++;
        }

        while (i < left.length) {
            yield { array: [...arr], comparison: [start + i], description: `Copying remaining ${left[i]}` };
            arr[k] = left[i];
            yield { array: [...arr], comparison: [k], description: `Placed ${arr[k]} at position ${k}` };
            i++;
            k++;
        }

        while (j < right.length) {
            yield { array: [...arr], comparison: [mid + 1 + j], description: `Copying remaining ${right[j]}` };
            arr[k] = right[j];
            yield { array: [...arr], comparison: [k], description: `Placed ${arr[k]} at position ${k}` };
            j++;
            k++;
        }
    }

    function* mergeSortHelper(start: number, end: number): Generator<SortStep> {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        yield* mergeSortHelper(start, mid);
        yield* mergeSortHelper(mid + 1, end);
        yield* merge(start, mid, end);
    }

    yield* mergeSortHelper(0, arr.length - 1);
    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}

export function* quickSort(array: number[]): Generator<SortStep> {
    const arr = [...array];

    function* quickSortHelper(low: number, high: number): Generator<SortStep> {
        if (low < high) {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                yield { array: [...arr], comparison: [j, high], description: `Comparing ${arr[j]} with pivot ${pivot}` };
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    yield { array: [...arr], comparison: [i, j], description: `Swapping ${arr[i]} and ${arr[j]}` };
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            yield { array: [...arr], comparison: [i + 1, high], description: `Placing pivot ${arr[i + 1]} in correct position` };

            const pi = i + 1;

            yield* quickSortHelper(low, pi - 1);
            yield* quickSortHelper(pi + 1, high);
        }
    }

    yield* quickSortHelper(0, arr.length - 1);
    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}

export function* insertionSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        yield { array: [...arr], comparison: [i, j], description: `Selecting ${key} to insert` };

        while (j >= 0 && arr[j] > key) {
            yield { array: [...arr], comparison: [j, j + 1], description: `${arr[j]} > ${key}, shifting right` };
            arr[j + 1] = arr[j];
            j = j - 1;
            yield { array: [...arr], comparison: [j + 1], description: `Shifted element to position ${j + 2}` };
        }
        arr[j + 1] = key;
        yield { array: [...arr], comparison: [j + 1], description: `Inserted ${key} at position ${j + 2}` };
    }

    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}

export function* selectionSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            yield { array: [...arr], comparison: [minIdx, j], description: `Comparing ${arr[minIdx]} and ${arr[j]}, finding minimum` };
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            yield { array: [...arr], comparison: [i, minIdx], description: `Swapping ${arr[i]} with minimum ${arr[minIdx]}` };
        }
    }

    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}

export function* heapSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    function* heapify(n: number, i: number): Generator<SortStep> {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            yield { array: [...arr], comparison: [largest, left], description: `Comparing parent ${arr[largest]} with left child ${arr[left]}` };
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            yield { array: [...arr], comparison: [largest, right], description: `Comparing with right child ${arr[right]}` };
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            yield { array: [...arr], comparison: [i, largest], description: `Swapping ${arr[i]} with ${arr[largest]} to maintain heap` };
            yield* heapify(n, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        yield { array: [...arr], comparison: [0, i], description: `Extracting ${arr[i]} from heap` };
        yield* heapify(i, 0);
    }

    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}

export function* cocktailShakerSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    let start = 0;
    let end = arr.length - 1;
    let swapped = true;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            yield { array: [...arr], comparison: [i, i + 1], description: `Forward pass: comparing ${arr[i]} and ${arr[i + 1]}` };
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                yield { array: [...arr], comparison: [i, i + 1], description: `Swapping ${arr[i + 1]} and ${arr[i]}` };
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            yield { array: [...arr], comparison: [i, i + 1], description: `Backward pass: comparing ${arr[i]} and ${arr[i + 1]}` };
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                yield { array: [...arr], comparison: [i, i + 1], description: `Swapping ${arr[i + 1]} and ${arr[i]}` };
            }
        }

        start++;
    }

    yield { array: [...arr], comparison: [], description: 'Sorting complete!' };
}
