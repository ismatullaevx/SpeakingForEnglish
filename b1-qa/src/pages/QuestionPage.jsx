import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { b1Data } from '../data/b1Data';

const QuestionPage = () => {
    const { unitId, questionId } = useParams();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUrl, setRecordedUrl] = useState(null);
    const [timer, setTimer] = useState(60);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerIntervalRef = useRef(null);

    const unit = b1Data.find(u => u.id === parseInt(unitId));
    const question = unit?.questions.find(q => q.id === parseInt(questionId));

    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setRecordedUrl(url);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordedUrl(null);
            setTimer(60);

            timerIntervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Please allow microphone access to practice speaking.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    if (!unit || !question) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Question Not Found</h2>
                <Link to="/" style={{ color: 'var(--primary)' }}>Go back to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <nav style={{ marginBottom: '2rem' }}>
                <Link to={`/unit/${unitId}`} style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span>←</span> Back to {unit.title}
                </Link>
            </nav>

            <div className="card" style={{
                padding: '4rem 3rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Visual Accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: isRecording ? 'var(--danger)' : 'var(--primary)',
                    transition: 'background 0.3s'
                }} />

                <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: isRecording ? '#fee2e2' : '#eef2ff',
                        color: isRecording ? 'var(--danger)' : 'var(--primary)',
                        padding: '0.375rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {isRecording ? 'Live Practice' : 'Practice Mode'}
                    </span>
                </div>

                <h1 style={{
                    fontSize: '2.25rem',
                    color: 'var(--text-main)',
                    marginBottom: '3rem',
                    lineHeight: '1.3',
                    fontWeight: '800'
                }}>
                    "{question.text}"
                </h1>

                {isRecording && (
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            color: timer < 10 ? 'var(--danger)' : 'var(--text-main)',
                            fontVariantNumeric: 'tabular-nums'
                        }}>
                            0:{timer.toString().padStart(2, '0')}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Seconds remaining</p>
                    </div>
                )}

                <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                    <button
                        onClick={toggleRecording}
                        style={{
                            width: '96px',
                            height: '96px',
                            borderRadius: '50%',
                            backgroundColor: isRecording ? 'var(--danger)' : 'var(--primary)',
                            color: '#ffffff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            boxShadow: isRecording ? '0 0 0 8px rgba(239, 68, 68, 0.2)' : 'var(--shadow-lg)',
                            transform: isRecording ? 'scale(1.05)' : 'scale(1)',
                            zIndex: 2,
                            position: 'relative'
                        }}
                    >
                        {isRecording ? (
                            <div style={{ width: '28px', height: '28px', backgroundColor: '#fff', borderRadius: '4px' }} />
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                        )}
                    </button>
                </div>

                {isRecording ? (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', height: '32px', alignItems: 'center' }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="wave-bar" style={{
                                animation: `wave-animation 1s ease-in-out infinite ${i * 0.1}s`
                            }} />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
                        Click the microphone to start recording your answer
                    </p>
                )}

                {recordedUrl && !isRecording && (
                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        backgroundColor: '#f1f5f9',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Your Recording</h3>
                        <audio src={recordedUrl} controls style={{ width: '100%', outline: 'none' }} />
                        <button
                            onClick={startRecording}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                color: 'var(--primary)',
                                background: 'transparent',
                                border: '1px solid var(--primary)',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionPage;
