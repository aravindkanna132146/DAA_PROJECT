import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateQuickSortSteps } from './quickSort';

export function generateSteps(algorithmKey, array) {
    switch (algorithmKey) {
        case 'bubble':
            return generateBubbleSortSteps(array);
        case 'selection':
            return generateSelectionSortSteps(array);
        case 'insertion':
            return generateInsertionSortSteps(array);
        case 'merge':
            return generateMergeSortSteps(array);
        case 'quick':
            return generateQuickSortSteps(array);
        default:
            return generateBubbleSortSteps(array);
    }
}

export function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 380) + 10);
}

export function generateNearlySortedArray(size) {
    const arr = Array.from({ length: size }, (_, i) => Math.floor((i / size) * 380) + 10);
    // Swap a few random pairs
    const swapCount = Math.max(2, Math.floor(size * 0.05));
    for (let i = 0; i < swapCount; i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }
    return arr;
}

export function generateReversedArray(size) {
    return Array.from({ length: size }, (_, i) => Math.floor(((size - i) / size) * 380) + 10);
}

// Speed: 1 (slow) -> 10 (fast)
export function speedToDelay(speed) {
    // Map 1..10 to 1200ms..10ms exponentially
    const min = 10;
    const max = 1200;
    return Math.round(max * Math.pow(min / max, (speed - 1) / 9));
}
