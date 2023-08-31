import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Loader from "../../Loader";

import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";
import { handleOnChange } from '../../helpers/handleChange';

import { RootState } from '../../redux/store';
import { UserData } from '../../types/types';
import { validateForm } from '../../helpers/validateForm';

import { SpinnerLoader } from '../../helpers/SpinnerLoader';

import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({} as UserData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user, loading } = useSelector((state: RootState) => state.user);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setErrors(errors);
        // validation here before continue
        if (Object.keys(errors).length === 0) {
            login(formData?.email, formData?.password, dispatch);
        }
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            navigate('/app/admin');
        } else if (user && !user.isAdmin) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [user, dispatch, navigate]);

    return (
        <div>
            <BreadCrumb title="Login" />

            <div className="login_register_wrap section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-md-10">
                            <div className="login_wrap">
                                <div className="padding_all bg-white">
                                    {
                                        error && <div className="heading_error">
                                            <p>{error}</p>
                                        </div>
                                    }
                                    <div className="heading_s1">
                                        <h3>Login</h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                name='email'
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Email"
                                                value={formData?.email}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.email && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.email}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={formData?.password}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.password && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.password}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-fill-out w-100 d-block login_btn loading">{!loading ? 'Log In' : <SpinnerLoader />}</button>
                                        </div>
                                    </form>
                                    <div className="form_note text-center">
                                        Don't have an Account?
                                        <Link to="/sign-up" className="ms-2 sign_up_redirect">Sign Up now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;