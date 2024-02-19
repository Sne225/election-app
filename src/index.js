import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import './index.css';
import Home from './pages/Home';
import PrivateRoute from './Utils/PrivateRoute';
import Candidates from './pages/Candidate';
import Results from './pages/Results';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'signin', element: <SignIn /> },
  { path: 'results', element: <Results /> },
  { path: 'home', element: <PrivateRoute element={<Home />} /> },
  { path: 'candidates', element: <PrivateRoute element={<Candidates />} /> },

];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
