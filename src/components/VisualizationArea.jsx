import React, { memo } from 'react';

const VisualizationArea = memo(function VisualizationArea({ step, maxValue, showValues }) {
    if (!step) return null;

    const { array, comparing = [], swapped = [], sorted = [] } = step;
    const n = array.length;
    const showNums = n <= 40 && showValues;

    function getBarClass(index) {
        if (sorted.includes(index)) return 'bar sorted';
        if (swapped.includes(index)) return 'bar swapped';
        if (comparing.includes(index)) return 'bar comparing';
        return 'bar default';
    }

    return (
        <div className="viz-container">
            <div className="bars-wrapper">
                {array.map((value, index) => {
                    const heightPct = ((value - 10) / (maxValue - 10)) * 90 + 5;
                    return (
                        <div
                            key={index}
                            className="bar-column"
                            style={{ width: `${100 / n}%` }}
                        >
                            {showNums && (
                                <span className="bar-value">{value}</span>
                            )}
                            <div
                                className={getBarClass(index)}
                                style={{ height: `${heightPct}%` }}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-dot comparing-dot" />
                    <span>Comparing</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot swapped-dot" />
                    <span>Swapping</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot sorted-dot" />
                    <span>Sorted</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot default-dot" />
                    <span>Unsorted</span>
                </div>
            </div>
        </div>
    );
});

export default VisualizationArea;
