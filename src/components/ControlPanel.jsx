import React from 'react';
import { BarChart2, RefreshCw, ArrowUpDown, Shuffle, Play, Pause, RotateCcw } from 'lucide-react';
import { ALGORITHMS, ALGORITHM_KEYS } from '../algorithms/algorithmData';

export default function ControlPanel({
    algorithm,
    setAlgorithm,
    arraySize,
    setArraySize,
    speed,
    setSpeed,
    status,
    onGenerate,
    onNearlySorted,
    onReversed,
    onStart,
    onPauseResume,
    onReset,
}) {
    const isRunning = status === 'running';
    const isPaused = status === 'paused';
    const isDone = status === 'done';
    const isIdle = status === 'idle';
    const canStart = isIdle || isDone;

    return (
        <div className="control-panel">
            {/* Algorithm Selector */}
            <div className="control-group">
                <label className="control-label">
                    <BarChart2 size={14} />
                    Algorithm
                </label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isRunning || isPaused}
                    className="select-input"
                >
                    {ALGORITHM_KEYS.map((key) => (
                        <option key={key} value={key}>
                            {ALGORITHMS[key].name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Array Size */}
            <div className="control-group">
                <label className="control-label">
                    Array Size: <span className="control-value">{arraySize}</span>
                </label>
                <input
                    type="range"
                    min={5}
                    max={150}
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isRunning || isPaused}
                    className="range-input"
                />
                <div className="range-labels">
                    <span>5</span>
                    <span>150</span>
                </div>
            </div>

            {/* Speed */}
            <div className="control-group">
                <label className="control-label">
                    Speed: <span className="control-value">{speed}</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={10}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="range-input"
                />
                <div className="range-labels">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>

            {/* Array Generate Buttons */}
            <div className="control-group">
                <label className="control-label">Generate Array</label>
                <div className="btn-group-col">
                    <button
                        className="btn btn-secondary"
                        onClick={onGenerate}
                        disabled={isRunning || isPaused}
                    >
                        <Shuffle size={14} />
                        Random Array
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onNearlySorted}
                        disabled={isRunning || isPaused}
                    >
                        <ArrowUpDown size={14} />
                        Nearly Sorted
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onReversed}
                        disabled={isRunning || isPaused}
                    >
                        <RefreshCw size={14} />
                        Reversed Array
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="control-group">
                <label className="control-label">Controls</label>
                <div className="btn-group-col">
                    <button
                        className="btn btn-primary"
                        onClick={onStart}
                        disabled={!canStart}
                    >
                        <Play size={14} />
                        Start Sorting
                    </button>
                    <button
                        className="btn btn-accent"
                        onClick={onPauseResume}
                        disabled={isIdle || isDone}
                    >
                        {isPaused ? <Play size={14} /> : <Pause size={14} />}
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={onReset}
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
