import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import UnitCard from '../components/UnitCard';

const HomePage = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const { data, error } = await supabase
                    .from('units')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;
                setUnits(data || []);
            } catch (err) {
                console.error('Error fetching units:', err);
                setError('Failed to load units. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUnits();
    }, []);
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
                    Prepare for your  certification with interactive speaking practice. Real questions, real-time timer, and instant playback.
                </p>
            </section>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
                    <div className="loader" style={{ 
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid var(--primary)',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>Loading units...</p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
                    <p style={{ color: '#ef4444' }}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                    gap: 'clamp(1rem, 3vw, 2rem)'
                }}>
                    {units.length > 0 ? (
                        units.map(unit => (
                            <UnitCard key={unit.id} unit={unit} />
                        ))
                    ) : (
                        <div style={{ 
                            gridColumn: '1 / -1', 
                            textAlign: 'center', 
                            padding: '4rem 2rem',
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            border: '2px dashed var(--border)'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>No Units Found</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                The database is empty or Row Level Security (RLS) is blocking the request.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button 
                                    onClick={() => window.location.reload()}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    Try Refreshing
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
