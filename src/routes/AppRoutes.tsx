import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeRestrita from '../components/HomeRestrita/HomeRestrita';
import Home from '../components/Home/Home';
import ProtectedRoute from './ProtectedRoute';


const AppRoutes: React.FC = () => {
    return (
            <Router >
              <Routes>
                    <Route path="/homeRestrita" element={<ProtectedRoute element={<HomeRestrita />} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
    );
};

export default AppRoutes;
