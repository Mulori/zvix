import React from 'react';
import {Navigate} from 'react-router-dom';
import IsAuthenticated from '../../libs/Auth';

export default function PrivateRoute({children}){
    return IsAuthenticated() ? children : <Navigate to="/login" />
}
