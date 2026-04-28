import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import QuestionItem from '../components/QuestionItem';

const UnitPage = () => {
    const { unitId } = useParams();
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnitData = async () => {
            try {
                const { data, error } = await supabase
                    .from('units')
                    .select('*, questions(*)')
                    .eq('id', unitId)
                    .single();

                if (error) throw error;
                setUnit(data);
            } catch (err) {
                console.error('Error fetching unit:', err);
                setError('Failed to load unit details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUnitData();
    }, [unitId]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div className="loader" style={{ 
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid var(--primary)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Loading unit practice...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    if (error || !unit) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Unit Not Found</h2>
                <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
                    We couldn't find the unit you're looking for. It might have been deleted or the database connection is limited by RLS policies.
                </p>
                <Link to="/" style={{ 
                    display: 'inline-block',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}>Go back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <nav style={{ marginBottom: 'clamp(1rem, 5vh, 2rem)' }}>
                <Link to="/" style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span>←</span> Back to Units
                </Link>
            </nav>

            <header style={{ marginBottom: 'clamp(1.5rem, 6vh, 3rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.7rem',
                        fontWeight: '700'
                    }}>
                        UNIT {unit.id}
                    </span>
                </div>
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'var(--text-main)',
                    marginBottom: '0.75rem',
                    lineHeight: '1.2'
                }}>{unit.title}</h1>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
                    maxWidth: '600px',
                    lineHeight: '1.6'
                }}>{unit.description}</p>
            </header>

            <section>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1.5rem', fontWeight: '600' }}>
                    Practice Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {unit.questions.map(q => (
                        <QuestionItem key={q.id} question={q} unitId={unit.id} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UnitPage;
