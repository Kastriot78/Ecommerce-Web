import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<any> = ({ user, children }) => {
    // only for login without roles
    if(!user) {
        return <Navigate to="/login" />
    }
    
    return children;
}

export default PrivateRoute;