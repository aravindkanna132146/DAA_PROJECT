export const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        key: 'bubble',
        description:
            'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. With early termination, it stops once no swaps occur in a pass.',
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        stable: true,
        inPlace: true,
    },
    selection: {
        name: 'Selection Sort',
        key: 'selection',
        description:
            'Selection Sort divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted portion and places it at the beginning of that region.',
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        stable: false,
        inPlace: true,
    },
    insertion: {
        name: 'Insertion Sort',
        key: 'insertion',
        description:
            'Insertion Sort builds the final sorted array one element at a time. It picks each element and inserts it into its correct position among the already-sorted elements.',
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)',
        stable: true,
        inPlace: true,
    },
    merge: {
        name: 'Merge Sort',
        key: 'merge',
        description:
            'Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges them back in sorted order. It guarantees O(n log n) in all cases.',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)',
        stable: true,
        inPlace: false,
    },
    quick: {
        name: 'Quick Sort',
        key: 'quick',
        description:
            'Quick Sort picks a pivot element and partitions the array so that elements less than the pivot come before it and greater elements after it, then recursively sorts both partitions.',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)',
        stable: false,
        inPlace: true,
    },
};

export const ALGORITHM_KEYS = Object.keys(ALGORITHMS);
