import React from 'react';

const ScoreResult = ({ result, originalTranscription, onRetry }) => {
    if (!result) return null;

    const getScoreColor = (score) => {
        if (score >= 8) return '#10b981'; // Green
        if (score >= 6) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    return (
        <div className="card" style={{
            marginTop: '2rem',
            padding: '2rem',
            border: `2px solid ${getScoreColor(result.score)}`,
            background: 'white',
            textAlign: 'left',
            animation: 'fadeIn 0.5s ease-out',
            borderRadius: '24px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Practice Result</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>AI powered evaluation</p>
                </div>
                <div style={{
                    backgroundColor: getScoreColor(result.score),
                    color: 'white',
                    width: '70px',
                    height: '70px',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 10px 15px -3px ${getScoreColor(result.score)}40`
                }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: 1 }}>{result.score}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.9 }}>/ 10</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid var(--border)'
                }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>Your Answer (Text)</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                        "{originalTranscription}"
                    </p>
                </div>

                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '16px',
                    border: '1px solid #bcf0da'
                }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#059669', marginBottom: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>AI Corrected Version</h3>
                    <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#065f46', lineHeight: '1.6', margin: 0 }}>
                        "{result.transcriptionCorrected}"
                    </p>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🌟</span> Feedback
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>{result.feedback}</p>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>💡</span> Recommendations to Improve
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(result.suggestions || result.recommendations || []).length > 0 ? (
                        (result.suggestions || result.recommendations || []).map((tip, i) => (
                            <div key={i} style={{
                                backgroundColor: '#fffbeb',
                                padding: '1rem',
                                borderRadius: '12px',
                                borderLeft: '4px solid #f59e0b',
                                color: '#92400e',
                                fontSize: '1rem'
                            }}>
                                {tip}
                            </div>
                        ))
                    ) : (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            Good job! No specific improvements needed for this response.
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={onRetry}
                style={{
                    width: '100%',
                    padding: '1.25rem',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--shadow-md)'
                }}
            >
                <span>🔄</span> Practice Again
            </button>
        </div>
    );
};


export default ScoreResult;
