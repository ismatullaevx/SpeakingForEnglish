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
                <Link to="/" style={{ color: '#4f46e5' }}>Go back to Home</Link>
            </div>
        );
    }

    return (
        <div>
            <nav style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Units</Link>
            </nav>

            <section style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '0.5rem' }}>{unit.title}</h1>
                <p style={{ color: '#6b7280' }}>{unit.description}</p>
            </section>

            <div style={{ maxWidth: '800px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1.5rem' }}>Questions</h2>
                {unit.questions.map(q => (
                    <QuestionItem key={q.id} question={q} unitId={unit.id} />
                ))}
            </div>
        </div>
    );
};

export default UnitPage;
