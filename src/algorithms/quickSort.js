export function generateQuickSortSteps(array) {
    const steps = [];
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            comparisons++;
            steps.push({
                array: [...arr],
                comparing: [j, high],
                swapped: [],
                sorted: [],
                comparisons,
                swaps,
            });
            if (arr[j] <= pivot) {
                i++;
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;
                    steps.push({
                        array: [...arr],
                        comparing: [],
                        swapped: [i, j],
                        sorted: [],
                        comparisons,
                        swaps,
                    });
                }
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        steps.push({
            array: [...arr],
            comparing: [],
            swapped: [i + 1, high],
            sorted: [i + 1],
            comparisons,
            swaps,
        });
        return i + 1;
    }

    function quickSort(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    quickSort(arr, 0, arr.length - 1);

    steps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: Array.from({ length: arr.length }, (_, k) => k),
        comparisons,
        swaps,
        done: true,
    });

    return steps;
}
