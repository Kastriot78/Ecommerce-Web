import { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getAllUsers, getSubscribers, getColors, getProducts, getOrders, getCategories } from '../../../redux/apiCalls';
import { RootState } from '../../../redux/store';
import DangerAlert from '../../../helpers/DangerAlert';

import './style.css';

const Dashboard = () => {
    const { users, error: fetchUsersError } = useSelector((state: RootState) => state.user);
    const { contacts, error: fetchContactsError } = useSelector((state: RootState) => state.contact);
    const { products, error: fetchProductsError } = useSelector((state: RootState) => state.product);
    const { orders, error: fetchOrdersError } = useSelector((state: RootState) => state.order);
    const { categories, error: fetchCategoriesError } = useSelector((state: RootState) => state.category);
    const { user } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        getContacts(dispatch, user);
        getAllUsers(dispatch, user);
        getColors(dispatch, user);
        getProducts(dispatch);
        getOrders(dispatch, user);
        getCategories(dispatch);
    }, [user, dispatch]);

    if (fetchUsersError || fetchContactsError || fetchProductsError || fetchOrdersError || fetchCategoriesError) return <DangerAlert msg="Error - Invalid token. Token Expired! Please Logout and Login again to continue!" />

    return (
        <div>
            <div className="dashboard-header">
                <div className="container-title">
                    <h1>Dashboard</h1>
                    <h6>Welcome back, {user?.name}</h6>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <Card title="Users" number={users?.length} />
                </div>
                <div className="col-md-3">
                    <Card title="Orders" number={orders?.length} />
                </div>
                <div className="col-md-3">
                    <Card title="Contacts" number={contacts?.length} />
                </div>
                <div className="col-md-3">
                    <Card title="Products" number={products?.length} />
                </div>
                <div className="col-md-3">
                    <Card title="Categories" number={categories?.length} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;