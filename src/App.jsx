import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, GitBranch } from 'lucide-react';
import ControlPanel from './components/ControlPanel';
import VisualizationArea from './components/VisualizationArea';
import StatsPanel from './components/StatsPanel';
import AlgorithmInfo from './components/AlgorithmInfo';
import {
  generateSteps,
  generateRandomArray,
  generateNearlySortedArray,
  generateReversedArray,
  speedToDelay,
} from './algorithms/index';

const DEFAULT_SIZE = 40;
const DEFAULT_SPEED = 5;
const DEFAULT_ALGORITHM = 'bubble';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [algorithm, setAlgorithm] = useState(DEFAULT_ALGORITHM);
  const [arraySize, setArraySize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [status, setStatus] = useState('idle'); // idle | running | paused | done
  const [currentStep, setCurrentStep] = useState(null);
  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    size: DEFAULT_SIZE,
    elapsed: 0,
  });

  const stepsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseAccumulatedRef = useRef(0);
  const pauseStartRef = useRef(null);
  const statusRef = useRef('idle');
  const speedRef = useRef(DEFAULT_SPEED);
  const initialArrayRef = useRef([]);

  // Keep refs in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Init with a random array on mount
  useEffect(() => {
    const arr = generateRandomArray(DEFAULT_SIZE);
    initialArrayRef.current = arr;
    const initStep = { array: arr, comparing: [], swapped: [], sorted: [], comparisons: 0, swaps: 0 };
    setCurrentStep(initStep);
    setStats({ comparisons: 0, swaps: 0, size: DEFAULT_SIZE, elapsed: 0 });
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const applyArray = useCallback((arr) => {
    clearTimer();
    setStatus('idle');
    statusRef.current = 'idle';
    stepsRef.current = [];
    stepIndexRef.current = 0;
    pauseAccumulatedRef.current = 0;
    pauseStartRef.current = null;
    initialArrayRef.current = arr;
    const initStep = { array: arr, comparing: [], swapped: [], sorted: [], comparisons: 0, swaps: 0 };
    setCurrentStep(initStep);
    setStats({ comparisons: 0, swaps: 0, size: arr.length, elapsed: 0 });
  }, []);

  const handleGenerate = useCallback(() => {
    applyArray(generateRandomArray(arraySize));
  }, [arraySize, applyArray]);

  const handleNearlySorted = useCallback(() => {
    applyArray(generateNearlySortedArray(arraySize));
  }, [arraySize, applyArray]);

  const handleReversed = useCallback(() => {
    applyArray(generateReversedArray(arraySize));
  }, [arraySize, applyArray]);

  // When arraySize changes: regenerate
  useEffect(() => {
    applyArray(generateRandomArray(arraySize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const runNextStep = useCallback(() => {
    if (statusRef.current !== 'running') return;

    const steps = stepsRef.current;
    const idx = stepIndexRef.current;

    if (idx >= steps.length) {
      setStatus('done');
      statusRef.current = 'done';
      return;
    }

    const step = steps[idx];
    stepIndexRef.current = idx + 1;
    setCurrentStep(step);

    const elapsed = startTimeRef.current
      ? Date.now() - startTimeRef.current - pauseAccumulatedRef.current
      : 0;

    setStats({
      comparisons: step.comparisons,
      swaps: step.swaps,
      size: step.array.length,
      elapsed,
    });

    if (step.done) {
      setStatus('done');
      statusRef.current = 'done';
      return;
    }

    const delay = speedToDelay(speedRef.current);
    timerRef.current = setTimeout(runNextStep, delay);
  }, []);

  const handleStart = useCallback(() => {
    if (statusRef.current !== 'idle' && statusRef.current !== 'done') return;

    clearTimer();
    stepsRef.current = generateSteps(algorithm, initialArrayRef.current);
    stepIndexRef.current = 0;
    pauseAccumulatedRef.current = 0;
    pauseStartRef.current = null;
    startTimeRef.current = Date.now();

    setStatus('running');
    statusRef.current = 'running';

    // Start stepping
    const delay = speedToDelay(speedRef.current);
    timerRef.current = setTimeout(runNextStep, delay);
  }, [algorithm, runNextStep]);

  const handlePauseResume = useCallback(() => {
    if (statusRef.current === 'running') {
      clearTimer();
      pauseStartRef.current = Date.now();
      setStatus('paused');
      statusRef.current = 'paused';
    } else if (statusRef.current === 'paused') {
      if (pauseStartRef.current) {
        pauseAccumulatedRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      setStatus('running');
      statusRef.current = 'running';
      const delay = speedToDelay(speedRef.current);
      timerRef.current = setTimeout(runNextStep, delay);
    }
  }, [runNextStep]);

  const handleReset = useCallback(() => {
    clearTimer();
    setStatus('idle');
    statusRef.current = 'idle';
    stepsRef.current = [];
    stepIndexRef.current = 0;
    pauseAccumulatedRef.current = 0;
    pauseStartRef.current = null;

    const arr = initialArrayRef.current;
    const initStep = { array: arr, comparing: [], swapped: [], sorted: [], comparisons: 0, swaps: 0 };
    setCurrentStep(initStep);
    setStats({ comparisons: 0, swaps: 0, size: arr.length, elapsed: 0 });
  }, []);

  // Cleanup on unmount
  useEffect(() => () => clearTimer(), []);

  const maxValue = currentStep
    ? Math.max(...currentStep.array)
    : 390;

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="14" width="4" height="12" rx="1" fill="#6366f1" />
              <rect x="8" y="9" width="4" height="17" rx="1" fill="#8b5cf6" />
              <rect x="14" y="4" width="4" height="22" rx="1" fill="#a78bfa" />
              <rect x="20" y="11" width="4" height="15" rx="1" fill="#7c3aed" />
            </svg>
          </div>
          <div>
            <h1 className="brand-name">Sortify</h1>
            <p className="brand-subtitle">Interactive Sorting Algorithm Visualizer</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setDarkMode((d) => !d)}
            title="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-btn"
            title="GitHub (DAA Academic Project)"
            onClick={() => { }}
          >
            <GitBranch size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <ControlPanel
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            arraySize={arraySize}
            setArraySize={setArraySize}
            speed={speed}
            setSpeed={setSpeed}
            status={status}
            onGenerate={handleGenerate}
            onNearlySorted={handleNearlySorted}
            onReversed={handleReversed}
            onStart={handleStart}
            onPauseResume={handlePauseResume}
            onReset={handleReset}
          />
          <AlgorithmInfo algorithmKey={algorithm} />
        </aside>

        {/* Center */}
        <section className="center-pane">
          <StatsPanel stats={stats} status={status} />
          <div className="viz-card">
            <VisualizationArea
              step={currentStep}
              maxValue={maxValue}
              showValues={true}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Sortify — DAA Academic Project &middot; Built with React + Vite</span>
      </footer>
    </div>
  );
}
