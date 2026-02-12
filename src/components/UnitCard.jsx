import React from 'react';
import { Link } from 'react-router-dom';

const UnitCard = ({ unit }) => {
    return (
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <div>
                <h3 style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.75rem'
                }}>
                    {unit.title}
                </h3>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                }}>
                    {unit.description}
                </p>
            </div>
            <Link
                to={`/unit/${unit.id}`}
                style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginTop: 'auto'
                }}
            >
                Start Practice
            </Link>
        </div>
    );
};

export default UnitCard;
