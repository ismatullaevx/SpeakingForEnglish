import React from 'react';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question, unitId }) => {
    return (
        <div className="card" style={{
            padding: '1rem clamp(1rem, 3vw, 1.5rem)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap'
        }}>
            <span style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                color: 'var(--text-main)',
                fontWeight: '500',
                flex: '1',
                minWidth: '200px'
            }}>
                {question.text}
            </span>
            <Link
                to={`/unit/${unitId}/question/${question.id}`}
                style={{
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#eef2ff',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                }}
            >
                Practice
            </Link>
        </div>
    );
};

export default QuestionItem;
