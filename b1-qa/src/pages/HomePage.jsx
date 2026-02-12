import React from 'react';
import { b1Data } from '../data/b1Data';
import UnitCard from '../components/UnitCard';

const HomePage = () => {
    return (
        <div>
            <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '1rem' }}>Master Your B1 Speaking</h1>
                <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '800px', margin: '0 auto' }}>
                    Practice your speaking skills with curated questions designed for the B1 level. Choose a unit to get started.
                </p>
            </section>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {b1Data.map(unit => (
                    <UnitCard key={unit.id} unit={unit} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
