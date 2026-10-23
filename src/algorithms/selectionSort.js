export function generateSelectionSortSteps(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            steps.push({
                array: [...arr],
                comparing: [minIdx, j],
                swapped: [],
                sorted: [...sortedIndices],
                comparisons,
                swaps,
            });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            swaps++;
            steps.push({
                array: [...arr],
                comparing: [],
                swapped: [i, minIdx],
                sorted: [...sortedIndices],
                comparisons,
                swaps,
            });
        }
        sortedIndices.push(i);
    }
    sortedIndices.push(n - 1);

    steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: [...sortedIndices],
        comparisons,
        swaps,
        done: true,
    });

    return steps;
}
