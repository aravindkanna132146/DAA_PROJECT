# Sortify — Interactive Sorting Algorithm Visualizer

> **DAA Academic Project** — Design and Analysis of Algorithms

A modern, interactive web application that visually demonstrates how popular sorting algorithms work — built with **React + Vite**.

---

## 🚀 Live Demo

Run locally with:

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

- **5 Sorting Algorithms** with step-by-step animation
- **Color-coded visualization** — comparing (amber), swapping (rose), sorted (green)
- **Live statistics** — comparisons, swaps, elapsed time, array size, status
- **Algorithm info panel** — time/space complexity, stability, in-place properties
- **Controls** — Start, Pause/Resume, Reset at any point
- **Array generators** — Random, Nearly Sorted, Reversed
- **Adjustable** array size (5–150 elements) and animation speed (1–10)
- **Dark / Light** theme toggle
- Fully **responsive** — desktop, tablet, mobile

---

## 🔢 Algorithms Implemented

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |

---

## 🛠️ Tech Stack

- **React 19 + Vite 8** — frontend framework & build tool
- **Lucide React** — icons
- **Vanilla CSS** — dark/light design system with CSS variables
- **JavaScript (ES2024)** — all sorting logic runs purely in the browser

---

## 📁 Project Structure

```
src/
├── App.jsx                     # Main app + sorting engine
├── index.css                   # Design system (dark/light themes)
├── algorithms/
│   ├── bubbleSort.js
│   ├── selectionSort.js
│   ├── insertionSort.js
│   ├── mergeSort.js
│   ├── quickSort.js
│   ├── algorithmData.js        # Complexity metadata
│   └── index.js                # Dispatchers + array generators
└── components/
    ├── ControlPanel.jsx        # Sliders, selects, buttons
    ├── VisualizationArea.jsx   # Animated bars + legend
    ├── StatsPanel.jsx          # Live stats cards
    └── AlgorithmInfo.jsx       # Complexity + stability display
```

---

## 📖 How It Works

Each sorting algorithm is instrumented to **generate all animation steps upfront** before playback begins. Each step records:
- The current array state
- Which indices are being **compared**
- Which indices are being **swapped**
- Which indices are **sorted/finalized**
- Running totals of **comparisons** and **swaps**

The animation engine replays these steps using `setTimeout` with a configurable delay mapped from the speed slider.

---

## 📚 Academic Context

This project was created as part of the **Design and Analysis of Algorithms (DAA)** course. It demonstrates:

- Algorithmic correctness of all 5 sorting algorithms
- Visual understanding of time complexity differences
- Comparative analysis through live statistics

---

*Built by Kanna Aravind — DAA Academic Project*
