import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { b1Data } from '../data/b1Data';
import { evaluateSpeaking } from '../services/aiService';
import ScoreResult from '../components/ScoreResult';

const QuestionPage = () => {
    const { unitId, questionId } = useParams();
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUrl, setRecordedUrl] = useState(null);
    const [timer, setTimer] = useState(60);
    const [transcription, setTranscription] = useState('');
    const [isScoring, setIsScoring] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerIntervalRef = useRef(null);
    const recognitionRef = useRef(null);

    const unit = b1Data.find(u => u.id === parseInt(unitId));
    const question = unit?.questions.find(q => q.id === parseInt(questionId));

    useEffect(() => {
        // Initialize Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                let currentTranscription = '';
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscription += event.results[i][0].transcript;
                }
                setTranscription(currentTranscription);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                if (event.error === 'not-allowed') {
                    setError("Microphone access denied. Please enable it to use AI scoring.");
                }
            };
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const startRecording = async () => {
        try {
            setError(null);
            setAiResult(null);
            setTranscription('');

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setRecordedUrl(url);

                // Automatic evaluation removed - now manual via button
            };

            mediaRecorderRef.current.start();
            if (recognitionRef.current) recognitionRef.current.start();

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
            setError("Please allow microphone access to practice speaking.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        if (recognitionRef.current) recognitionRef.current.stop();

        setIsRecording(false);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const handleEvaluation = async () => {
        setIsScoring(true);
        try {
            const result = await evaluateSpeaking(question.text, transcription);
            setAiResult(result);
        } catch (err) {
            setError("AI Evaluation failed. Please check your API key and internet connection.");
        } finally {
            setIsScoring(false);
        }
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
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <nav style={{ marginBottom: 'clamp(1.5rem, 5vh, 2rem)' }}>
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
                padding: 'clamp(2rem, 10vw, 4rem) clamp(1rem, 5vw, 3rem)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '2rem'
            }}>
                {/* Visual Accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: isRecording ? 'var(--danger)' : isScoring ? 'var(--warning)' : 'var(--primary)',
                    transition: 'background 0.3s'
                }} />

                <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: isRecording ? '#fee2e2' : isScoring ? '#fef3c7' : '#eef2ff',
                        color: isRecording ? 'var(--danger)' : isScoring ? '#d97706' : 'var(--primary)',
                        padding: '0.375rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {isRecording ? 'Live Practice' : isScoring ? 'AI Analyzing...' : 'Practice Mode'}
                    </span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(1.5rem, 6vw, 2.25rem)',
                    color: 'var(--text-main)',
                    marginBottom: 'clamp(1.5rem, 6vh, 3rem)',
                    lineHeight: '1.3',
                    fontWeight: '800'
                }}>
                    "{question.text}"
                </h1>

                {(isRecording || transcription) && !aiResult && (
                    <div style={{ marginBottom: '2rem' }}>
                        {isRecording && (
                            <div style={{
                                fontSize: 'clamp(2rem, 10vw, 3rem)',
                                fontWeight: '700',
                                color: timer < 10 ? 'var(--danger)' : 'var(--text-main)',
                                fontVariantNumeric: 'tabular-nums',
                                marginBottom: '1.5rem'
                            }}>
                                0:{timer.toString().padStart(2, '0')}
                            </div>
                        )}

                        {/* Transcription Display */}
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '1rem',
                            border: '1px dashed var(--border)',
                            minHeight: '80px',
                            color: transcription ? 'var(--text-main)' : 'var(--text-muted)',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            textAlign: 'left',
                            position: 'relative',
                            animation: 'fadeIn 0.3s ease-out'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '20px',
                                background: 'white',
                                padding: '0 8px',
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                fontWeight: '700',
                                textTransform: 'uppercase'
                            }}>
                                {isRecording ? "Live Transcription" : "Final Transcription"}
                            </span>
                            {transcription || "Listening for your voice..."}
                        </div>
                    </div>
                )}

                {error && (
                    <div style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        backgroundColor: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        borderRadius: '0.75rem',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* Action Buttons */}
                {!aiResult && !isScoring && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginTop: '1rem'
                    }}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={toggleRecording}
                                disabled={isScoring}
                                style={{
                                    width: 'clamp(80px, 20vw, 96px)',
                                    height: 'clamp(80px, 20vw, 96px)',
                                    borderRadius: '50%',
                                    backgroundColor: isRecording ? 'var(--danger)' : 'var(--primary)',
                                    color: '#ffffff',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    boxShadow: isRecording ? '0 0 0 8px rgba(239, 68, 68, 0.2)' : 'var(--shadow-lg)',
                                    opacity: isScoring ? 0.5 : 1,
                                    cursor: isScoring ? 'not-allowed' : 'pointer',
                                    transform: isRecording ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.2s',
                                    zIndex: 2,
                                    position: 'relative'
                                }}
                            >
                                {isRecording ? (
                                    <div style={{ width: 'clamp(20px, 5vw, 28px)', height: 'clamp(20px, 5vw, 28px)', backgroundColor: '#fff', borderRadius: '4px' }} />
                                ) : (
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 'clamp(24px, 6vw, 32px)', height: 'clamp(24px, 6vw, 32px)' }}>
                                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                        <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
                                        <line x1="12" y1="19" x2="12" y2="23"></line>
                                        <line x1="8" y1="23" x2="16" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {!isRecording && transcription && (
                            <button
                                onClick={handleEvaluation}
                                style={{
                                    backgroundColor: 'var(--success, #10b981)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'all 0.2s',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <span>✨</span> Analyze with AI
                            </button>
                        )}
                    </div>
                )}

                {isScoring && (
                    <div style={{ padding: '2rem 0', animation: 'fadeIn 0.5s' }}>
                        <div className="loader" style={{ margin: '0 auto 1.5rem', display: 'block' }}></div>
                        <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.5rem' }}>Evaluating your performance...</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>AI is analyzing your response based on B1 standards</p>
                    </div>
                )}

                {isRecording ? (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', height: '32px', alignItems: 'center' }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="wave-bar" style={{
                                animation: `wave-animation 1s ease-in-out infinite ${i * 0.1}s`,
                                height: 'clamp(16px, 5vw, 24px)',
                                width: 'clamp(3px, 1vw, 4px)'
                            }} />
                        ))}
                    </div>
                ) : !isScoring && !aiResult && (
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: 'clamp(0.875rem,2.5vw,1rem)' }}>
                        {transcription ? "Click the microphone to try again" : "Click the microphone to start speaking"}
                    </p>
                )}
            </div>

            {aiResult && (
                <ScoreResult
                    result={aiResult}
                    originalTranscription={transcription}
                    onRetry={() => {
                        setAiResult(null);
                        setTranscription('');
                    }}
                />
            )}

            {recordedUrl && !isRecording && !isScoring && !aiResult && (
                <div className="card" style={{
                    padding: 'clamp(1rem, 5vw, 2rem)',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '1rem',
                    border: '1px solid var(--border)'
                }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Your Recording</h3>
                    <audio src={recordedUrl} controls style={{ width: '100%', outline: 'none' }} />
                </div>
            )}
        </div>
    );
};

export default QuestionPage;

