import React from 'react';
import { b1Data } from '../data/b1Data';
import UnitCard from '../components/UnitCard';

const HomePage = () => {
    return (
        <div className="container">
            <section style={{
                textAlign: 'center',
                marginBottom: 'clamp(2rem, 10vh, 5rem)',
                marginTop: 'clamp(1rem, 5vh, 3rem)'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{
                        backgroundColor: '#e0e7ff',
                        color: 'var(--primary)',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '9999px',
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Speaking Excellence
                    </span>
                </div>
                <h1 style={{
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    color: 'var(--text-main)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1',
                    padding: '0 1rem'
                }}>
                    Speak English with Confidence
                </h1>
                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    padding: '0 1rem'
                }}>
                    Prepare for your B1 certification with interactive speaking practice. Real questions, real-time timer, and instant playback.
                </p>
            </section>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1rem, 3vw, 2rem)'
            }}>
                {b1Data.map(unit => (
                    <UnitCard key={unit.id} unit={unit} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
