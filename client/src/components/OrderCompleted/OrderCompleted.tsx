import { Link } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

import './style.css';

const OrderCompleted = () => {
    return (
        <div>
            <BreadCrumb title="Order Completed" />

            <div className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="text-center order_completed">
                                <i className="fa-regular fa-circle-check"></i>
                                <div className="heading_s1">
                                    <h3>Your order is completed!</h3>
                                </div>
                                <p>Thank you for your order!
                                </p>
                                <Link to="/shop" className='btn btn-fill-out'>Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCompleted;