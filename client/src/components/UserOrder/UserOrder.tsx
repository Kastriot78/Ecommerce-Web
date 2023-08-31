import React, { useState, useEffect } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import Loader from '../../Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { apiUrl } from '../../constants/backendUrl';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/formatDate';
import axios from 'axios';

import './style.css';
import { TableLoader } from '../../helpers/TableLoader';

const UserOrder = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get((`${apiUrl}/orders/my-orders/${user._id}`), {
            headers: { Authorization: 'Bearer ' + user?.token }
        }).then(res => {
            if (res.status === 201) {
                setOrders(res.data.orders);
            }
            setLoading(false);
        })
    }, [user]);

    if (loading) return <TableLoader items={orders} />

    return (
        <div>
            <BreadCrumb title="Your Orders" />

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                orders?.length > 0 ? <div className="table-responsive wishlist_table">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th className='user-name'>User</th>
                                                <th className='user-address'>Address</th>
                                                <th className='product-thumbnail'>Product</th>
                                                <th className='product-total'>Total</th>
                                                <th className='order-date'>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders && orders?.map((order: any) => <tr key={order?._id}>
                                                    <td data-title="user-name">
                                                        {order.firstName} {order.lastName}
                                                    </td>
                                                    <td data-title="user-address">
                                                        {order.address}
                                                    </td>
                                                    <td className='product-thumbnail'>
                                                        {order?.orderItems?.map((item: any, index: any) => <Link to={`/product/${item?.product?._id}`} className="mx-1" key={index}>
                                                            <img src={`${apiUrl}/images/${item?.product?.images[0]}`} className="my-1" alt="product" />
                                                        </Link>)}
                                                    </td>

                                                    <td data-title="Total">{order?.orderItems.reduce((a: any, product: any) => a + (user?.role === 'shumice' ? product?.product?.priceShumice : product?.product?.pricePakice) * product.quantity, 0).toFixed(2)}€</td>
                                                    <td className="product-date" data-title='Date of order'>{formatDate(order?.createdAt)}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div> : <div className='empty_orders'>
                                    <h3>You don't have any order yet.</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOrder;
