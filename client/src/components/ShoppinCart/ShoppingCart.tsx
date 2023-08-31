import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import CartTable from './CartTable';
import CartTotals from './CartTotals';

import './style.css';
import { RootState } from '../../redux/store';

const ShoppingCart = () => {
    const products = useSelector((state: RootState) => state.cart.products);
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <div>
            <BreadCrumb title="Shopping Cart" />

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <CartTable user={user} />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 mb-5 mt-5">
                            <div className="divider center_icon">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </div>

                        {
                            products?.length > 0 && <div className="col-md-6 mt-4">
                                <CartTotals user={user} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;
