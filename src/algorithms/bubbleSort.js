export function generateBubbleSortSteps(array) {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            steps.push({
                array: [...arr],
                comparing: [j, j + 1],
                swapped: [],
                sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
                comparisons,
                swaps,
            });

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
                swapped = true;
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapped: [j, j + 1],
                    sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
                    comparisons,
                    swaps,
                });
            }
        }
        if (!swapped) break;
    }

    // Mark all as sorted
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
