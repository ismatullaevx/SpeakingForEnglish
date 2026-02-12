import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import UnitPage from '../pages/UnitPage';
import QuestionPage from '../pages/QuestionPage';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="unit/:unitId" element={<UnitPage />} />
                <Route path="unit/:unitId/question/:questionId" element={<QuestionPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
