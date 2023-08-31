import { useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import OrderReview from './OrderReview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { apiUrl } from '../../constants/backendUrl';
import { User } from '../../types/types';
import { handleOnChange } from '../../helpers/handleChange';
import NumberInput from '../../helpers/NumberInput';
import { resetCart } from '../../redux/shoppingCartRedux';

import './style.css';
import { toast } from 'react-toastify';

interface IData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    user?: User;
    orderItems?: Array<any>;
}

const Checkout = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const [formData, setFormData] = useState<IData>({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        email: '',
        user: user,
        orderItems: cartProducts
    });
    const [errors, setErrors] = useState({} as IData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const errors = {} as IData;

        if (formData?.firstName === '') {
            errors.firstName = 'First Name is required';
        }

        if (formData?.lastName === '') {
            errors.lastName = 'Last Name is required';
        }

        if (formData?.address === '') {
            errors.address = 'Address is required';
        }

        if (formData?.city === '') {
            errors.city = 'City is required';
        }

        if (formData?.zip === '') {
            errors.zip = 'Zip is required';
        }

        if (formData?.phone === '') {
            errors.phone = 'Phone is required';
        }

        if (!formData?.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
            errors.email = "Email is invalid";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0 && cartProducts?.length > 0) {
            axios.post(`${apiUrl}/orders`, formData, {
                headers: { Authorization: 'Bearer ' + user?.token }
            }).then(res => {
                if (res.status === 200) {
                    dispatch(resetCart());
                    setFormData({ firstName: '', lastName: '', address: '', city: '', zip: '', phone: '', email: '' });
                    navigate('/order-completed');
                }
            }).catch(err => {
                if (err) {
                    toast.error('Nuk mund të bleni produkt që është out of stock!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            });
        }
    }

    return (
        <div>
            <BreadCrumb title="Checkout" />

            <div className="section checkout">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="heading_s1">
                                <h4>Billing Details</h4>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input
                                        name="firstName"
                                        type="text"
                                        className='form-control'
                                        placeholder='First Name *'
                                        value={formData?.firstName}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.firstName}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="lastName"
                                        type="text"
                                        className='form-control'
                                        placeholder='Last Name *'
                                        value={formData?.lastName}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.lastName}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="address"
                                        type="text"
                                        className='form-control'
                                        placeholder='Address *'
                                        value={formData?.address}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.address}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="city"
                                        type="text"
                                        className='form-control'
                                        placeholder='City *'
                                        value={formData?.city}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.city}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="zip"
                                        type="text"
                                        className='form-control'
                                        placeholder='Postcode / Zip *'
                                        value={formData?.zip}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.zip}</span>
                                </div>
                                <div className="form-group">
                                    <NumberInput
                                        name='phone'
                                        className='form-control'
                                        placeholder='Phone *'
                                        value={formData?.phone}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.phone}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="email"
                                        type="text"
                                        className='form-control'
                                        placeholder='Email *'
                                        value={formData?.email}
                                        onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    />
                                    <span className='span-error'>{errors?.email}</span>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6">
                            <OrderReview handleSubmit={handleSubmit} user={user} cartProducts={cartProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;