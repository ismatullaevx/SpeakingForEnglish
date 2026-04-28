import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
            <div style={{
                background: 'white',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #818cf8 100%)',
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: '#f3f4f6',
                        margin: '0 auto 1.5rem',
                        border: '4px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: 'var(--primary)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        {user.photo ? (
                            <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            user.name?.[0]?.toUpperCase() || 'U'
                        )}
                    </div>

                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{user.name}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{user.email}</p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2.5rem',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '1rem',
                            border: '1px solid var(--border)'
                        }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Account Status</p>
                            <p style={{ fontWeight: '700', color: 'var(--secondary)' }}>Active</p>
                        </div>
                        <div style={{
                            padding: '1.5rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '1rem',
                            border: '1px solid var(--border)'
                        }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Joined</p>
                            <p style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                                {new Date(user.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/" style={{
                            padding: '0.75rem 2rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            borderRadius: '0.75rem',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'transform 0.2s'
                        }}>
                            Start Practice
                        </Link>
                        <button
                            onClick={logout}
                            style={{
                                padding: '0.75rem 2rem',
                                backgroundColor: 'white',
                                color: 'var(--danger)',
                                border: '1px solid var(--danger)',
                                borderRadius: '0.75rem',
                                fontWeight: '600'
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
