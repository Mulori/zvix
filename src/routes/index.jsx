import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/login';
import Painel from '../pages/painel';
import PrivateRoute from './privateRoute';
import {Navigate} from 'react-router-dom';

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute><Painel /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}