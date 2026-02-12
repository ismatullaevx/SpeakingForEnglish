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
                    border: '1px solid #bcf0da',
                    position: 'relative',
                    group: 'true'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#059669', fontWeight: '700', letterSpacing: '0.05em', margin: 0 }}>AI Corrected Version</h3>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(result.transcriptionCorrected);
                                const btn = document.getElementById('copy-btn');
                                btn.innerText = '✅ Copied';
                                setTimeout(() => btn.innerText = '📋 Copy', 2000);
                            }}
                            id="copy-btn"
                            style={{
                                background: '#dcfce7',
                                border: '1px solid #86efac',
                                color: '#166534',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            📋 Copy
                        </button>
                    </div>
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
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>💡</span> Recommendations to Improve
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(result.suggestions || result.recommendations || []).length > 0 ? (
                        (result.suggestions || result.recommendations || []).map((tip, i) => (
                            <div key={i} style={{
                                backgroundColor: '#fff7ed',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                borderLeft: '5px solid #f97316',
                                color: '#9a3412',
                                fontSize: '1.05rem',
                                lineHeight: '1.5',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                animation: `fadeIn 0.5s ease-out ${i * 0.15}s forwards`
                            }}>
                                <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', textTransform: 'uppercase', opacity: 0.8 }}>Tip {i + 1}</strong>
                                {tip}
                            </div>
                        ))
                    ) : (
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '16px',
                            border: '1px dashed var(--border)',
                            color: 'var(--text-muted)',
                            fontStyle: 'italic',
                            textAlign: 'center'
                        }}>
                            Excellent work! Your response is strong and fits the B1 criteria perfectly.
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
