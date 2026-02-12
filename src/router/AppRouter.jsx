import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import UnitPage from '../pages/UnitPage';
import QuestionPage from '../pages/QuestionPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />

                <Route
                    path="unit/:unitId"
                    element={
                        <ProtectedRoute>
                            <UnitPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="unit/:unitId/question/:questionId"
                    element={
                        <ProtectedRoute>
                            <QuestionPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
