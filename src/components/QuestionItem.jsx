import React from 'react';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question, unitId }) => {
    return (
        <div className="card" style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <span style={{
                fontSize: '1rem',
                color: 'var(--text-main)',
                fontWeight: '500'
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
                    transition: 'all 0.2s'
                }}
            >
                Practice
            </Link>
        </div>
    );
};

export default QuestionItem;
