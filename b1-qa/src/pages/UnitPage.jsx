import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { b1Data } from '../data/b1Data';
import QuestionItem from '../components/QuestionItem';

const UnitPage = () => {
    const { unitId } = useParams();
    const unit = b1Data.find(u => u.id === parseInt(unitId));

    if (!unit) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Unit Not Found</h2>
                <Link to="/" style={{ color: 'var(--primary)' }}>Go back to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <nav style={{ marginBottom: '2.5rem' }}>
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

            <header style={{ marginBottom: '3.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                    }}>
                        UNIT {unit.id}
                    </span>
                </div>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>{unit.title}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px' }}>{unit.description}</p>
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
