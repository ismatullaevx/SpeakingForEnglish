import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { b1Data } from '../data/b1Data';

const QuestionPage = () => {
    const { unitId, questionId } = useParams();
    const [isRecording, setIsRecording] = useState(false);

    const unit = b1Data.find(u => u.id === parseInt(unitId));
    const question = unit?.questions.find(q => q.id === parseInt(questionId));

    if (!unit || !question) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Question Not Found</h2>
                <Link to="/" style={{ color: '#4f46e5' }}>Go back to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <nav style={{ marginBottom: '2rem' }}>
                <Link to={`/unit/${unitId}`} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to {unit.title}</Link>
            </nav>

            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                padding: '3rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                textAlign: 'center'
            }}>
                <span style={{
                    display: 'inline-block',
                    backgroundColor: '#eef2ff',
                    color: '#4f46e5',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem'
                }}>
                    Practice Mode
                </span>
                <h1 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '2.5rem', lineHeight: '1.2' }}>
                    "{question.text}"
                </h1>

                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsRecording(!isRecording)}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: isRecording ? '#ef4444' : '#4f46e5',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isRecording ? (
                            <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '2px' }} />
                        ) : (
                            <div style={{
                                width: '0',
                                height: '0',
                                borderTop: '12px solid transparent',
                                borderBottom: '12px solid transparent',
                                borderLeft: '20px solid white',
                                marginLeft: '6px'
                            }} />
                        )}
                    </button>
                    <p style={{ marginTop: '1rem', color: '#6b7280', fontWeight: '500' }}>
                        {isRecording ? 'Recording... click to stop' : 'Click to start recording your answer'}
                    </p>
                </div>

                {isRecording && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', height: '20px', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="wave" style={{
                                width: '4px',
                                height: '100%',
                                backgroundColor: '#ef4444',
                                animation: `wave-animation 1s ease-in-out infinite ${i * 0.1}s`,
                                borderRadius: '2px'
                            }} />
                        ))}
                    </div>
                )}
            </div>

            <style>
                {`
          @keyframes wave-animation {
            0%, 100% { height: 4px; }
            50% { height: 20px; }
          }
        `}
            </style>
        </div>
    );
};

export default QuestionPage;
