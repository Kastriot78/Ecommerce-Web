import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/AdminPanel/Sidebar/Sidebar';
import SearchBar from './components/AdminPanel/TopBar/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from './redux/store';
import { isTokenExpired } from './helpers/isTokenExpired';
import { userSlice } from './redux/userRedux';

import './components/AdminPanel/style.css';
import axios from 'axios';
import { apiUrl } from './constants/backendUrl';

const AdminLayout = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!user) {
        navigate('/login');
    }

    if (user && !user?.isAdmin) {
        navigate('/notfound');
    }

    if (user && isTokenExpired(user?.token)) {
        // Token is expired
        dispatch(userSlice?.actions?.logout());
    }

    useEffect(() => {
        axios.get(`${apiUrl}/admin/user`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        }).then(res => {
        }).catch(err => {
            console.log(err);
            navigate('/notfound');
        })


    }, [user, navigate]);

    return (
        <>
            <SearchBar />
            <div className="main-container">
                <Outlet />
            </div>

            <Sidebar />
        </>
    )
}

export default AdminLayout