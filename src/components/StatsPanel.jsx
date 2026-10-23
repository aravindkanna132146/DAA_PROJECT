import React from 'react';
import { GitCompareArrows, Repeat2, AlignVerticalJustifyCenter, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function StatsPanel({ stats, status }) {
    const statusLabel = {
        idle: 'Idle',
        running: 'Sorting...',
        paused: 'Paused',
        done: 'Completed',
    }[status] || 'Idle';

    const statusColor = {
        idle: 'status-idle',
        running: 'status-running',
        paused: 'status-paused',
        done: 'status-done',
    }[status] || 'status-idle';

    return (
        <div className="stats-panel">
            <h3 className="panel-title">Live Statistics</h3>
            <div className="stats-grid">
                <StatCard
                    icon={<GitCompareArrows size={18} />}
                    label="Comparisons"
                    value={stats.comparisons.toLocaleString()}
                    color="accent-blue"
                />
                <StatCard
                    icon={<Repeat2 size={18} />}
                    label="Swaps"
                    value={stats.swaps.toLocaleString()}
                    color="accent-purple"
                />
                <StatCard
                    icon={<AlignVerticalJustifyCenter size={18} />}
                    label="Array Size"
                    value={stats.size.toLocaleString()}
                    color="accent-teal"
                />
                <StatCard
                    icon={<Clock size={18} />}
                    label="Elapsed Time"
                    value={`${stats.elapsed}ms`}
                    color="accent-orange"
                />
                <div className={`stat-card status-card ${statusColor}`}>
                    <div className="stat-icon">
                        {status === 'done' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Status</span>
                        <span className="stat-value">{statusLabel}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
            </div>
        </div>
    );
}
