export function generateInsertionSortSteps(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices = [0];

    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0) {
            comparisons++;
            steps.push({
                array: [...arr],
                comparing: [j, j - 1],
                swapped: [],
                sorted: [...sortedIndices],
                comparisons,
                swaps,
            });
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                swaps++;
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapped: [j, j - 1],
                    sorted: [...sortedIndices],
                    comparisons,
                    swaps,
                });
                j--;
            } else {
                break;
            }
        }
        sortedIndices.push(i);
    }

    steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        comparisons,
        swaps,
        done: true,
    });

    return steps;
}
