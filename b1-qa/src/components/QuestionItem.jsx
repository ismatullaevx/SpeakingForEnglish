import React from 'react';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question, unitId }) => {
    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
        }}>
            <span style={{ fontSize: '1rem', color: '#374151' }}>{question.text}</span>
            <Link
                to={`/unit/${unitId}/question/${question.id}`}
                style={{
                    color: '#4f46e5',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.875rem'
                }}
            >
                Practice →
            </Link>
        </div>
    );
};

export default QuestionItem;
