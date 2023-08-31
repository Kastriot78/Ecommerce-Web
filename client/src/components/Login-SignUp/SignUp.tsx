import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../../Loader";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { register } from '../../redux/apiCalls';
import { handleOnChange } from '../../helpers/handleChange';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserData } from '../../types/types';
import { validateForm } from '../../helpers/validateForm';
import { SpinnerLoader } from '../../helpers/SpinnerLoader';
import { userSlice } from '../../redux/userRedux';

import './style.css';
import NumberInput from '../../helpers/NumberInput';

const SignUp = () => {
    const [formData, setFormData] = useState<UserData>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        company: '',
        phone: '',
    });
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errors, setErrors] = useState({} as UserData);

    const { success, error, loading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setErrors(errors);
        // validation here before continue

        if (Object.keys(errors).length === 0) {
            if (confirmPassowrd !== formData?.password) {
                return setPasswordError('Passwords are not the same!');
            } else {
                setPasswordError('');
                register(formData, dispatch);
            }
        }
    }

    useEffect(() => {
        if (success) {
            setFormData({ name: '', lastName: '', email: '', password: '', company: '', phone: '' });
            setConfirmPassword('');
            navigate('/login');
        }

        return (() => {
            dispatch(userSlice.actions.clearState());
        });
    }, [success, dispatch, navigate]);

    return (
        <div>
            <BreadCrumb title="Register" />

            <div className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-md-10">
                            <div className="login_wrap">
                                <div className="padding_all bg-white">
                                    {passwordError && <div className="heading_error">
                                        <p>{passwordError}</p>
                                    </div>
                                    }
                                    {error && <div className="heading_error">
                                        <p>{error}</p>
                                    </div>
                                    }
                                    <div className="heading_s1">
                                        <h3>Create An Account</h3>
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                name='name'
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Name"
                                                value={formData?.name}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.name && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.name}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="lastName"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Last Name"
                                                value={formData?.lastName}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.lastName && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.lastName}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Your Email"
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
                                                name="company"
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                value={formData?.company}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.company && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.company}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <NumberInput
                                                name='phone'
                                                className='form-control'
                                                placeholder='Enter Phone Number'
                                                value={formData?.phone}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.phone && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.phone}</p>
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
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                value={confirmPassowrd}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' className="btn btn-fill-out w-100 d-block" disabled={loading}>{!loading ? 'Sign Up' : <SpinnerLoader />}</button>
                                        </div>
                                    </form>
                                    <div className="form_note text-center">
                                        Already have an Account?
                                        <Link to="/login" className="ms-2">Log In</Link>
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

export default SignUp;