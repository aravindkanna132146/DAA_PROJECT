export function generateMergeSortSteps(array) {
    const steps = [];
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;

    function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;
            steps.push({
                array: [...arr],
                comparing: [left + i, mid + 1 + j],
                swapped: [],
                sorted: [],
                comparisons,
                swaps,
            });
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
                swaps++;
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapped: [k],
                    sorted: [],
                    comparisons,
                    swaps,
                });
            }
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++; k++;
        }
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++; k++;
        }
    }

    function mergeSort(arr, left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    mergeSort(arr, 0, arr.length - 1);

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
