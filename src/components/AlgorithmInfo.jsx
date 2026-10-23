import React from 'react';
import { ALGORITHMS } from '../algorithms/algorithmData';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function AlgorithmInfo({ algorithmKey }) {
    const algo = ALGORITHMS[algorithmKey];
    if (!algo) return null;

    return (
        <div className="algo-info-panel">
            <div className="algo-info-header">
                <Info size={16} />
                <h3 className="panel-title" style={{ margin: 0 }}>Algorithm Info</h3>
            </div>
            <h4 className="algo-name">{algo.name}</h4>
            <p className="algo-description">{algo.description}</p>

            <div className="complexity-grid">
                <ComplexityRow label="Best Case" value={algo.best} color="green" />
                <ComplexityRow label="Average Case" value={algo.average} color="yellow" />
                <ComplexityRow label="Worst Case" value={algo.worst} color="red" />
                <ComplexityRow label="Space" value={algo.space} color="blue" />
            </div>

            <div className="algo-badges">
                <Badge
                    label="Stable"
                    value={algo.stable}
                    trueLabel="Yes"
                    falseLabel="No"
                />
                <Badge
                    label="In-Place"
                    value={algo.inPlace}
                    trueLabel="Yes"
                    falseLabel="No"
                />
            </div>
        </div>
    );
}

function ComplexityRow({ label, value, color }) {
    return (
        <div className="complexity-row">
            <span className="complexity-label">{label}</span>
            <span className={`complexity-value complexity-${color}`}>{value}</span>
        </div>
    );
}

function Badge({ label, value, trueLabel, falseLabel }) {
    return (
        <div className={`algo-badge ${value ? 'badge-positive' : 'badge-negative'}`}>
            {value ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
            <span>{label}: {value ? trueLabel : falseLabel}</span>
        </div>
    );
}
