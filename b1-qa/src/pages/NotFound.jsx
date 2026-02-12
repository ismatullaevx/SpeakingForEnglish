import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <h1 style={{ fontSize: '6rem', color: '#4f46e5', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '2rem', color: '#111827', marginTop: '1rem' }}>Page Not Found</h2>
            <p style={{ color: '#6b7280', marginBottom: '2.5rem' }}>Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                style={{
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600'
                }}
            >
                Go back Home
            </Link>
        </div>
    );
};

export default NotFound;
