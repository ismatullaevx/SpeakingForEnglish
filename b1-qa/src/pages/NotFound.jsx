import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '8rem 2rem',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1 style={{ fontSize: '6rem', color: 'var(--primary)', marginBottom: '1rem', opacity: 0.2 }}>404</h1>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    boxShadow: 'var(--shadow-md)'
                }}
            >
                Back to Safety
            </Link>
        </div>
    );
};

export default NotFound;
