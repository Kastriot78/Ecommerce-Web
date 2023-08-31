import React, { useEffect, useState } from 'react';
import { register } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { handleOnChange } from '../../../helpers/handleChange';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../helpers/LoadingButton';
import { userSlice } from '../../../redux/userRedux';

interface Idata {
    name: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: any;
    approved: any;
}

const AddUser = () => {
    const [formData, setFormData] = useState<Idata>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: '',
        approved: true,
    })
    const [errors, setErrors] = useState({} as Idata);

    const { error, loading, adminRegisterSuccess } = useSelector((state: RootState) => state.user);
    
    const dispatch = useDispatch();

    const validateForm = (data: Idata) => {
        const errors = {} as Idata;

        if (!data?.name) {
            errors.name = 'First name is required';
        }

        if (!data.lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        if (!data.password) {
            errors.password = 'Password is required';
        }

        if (!data.isAdmin) {
            errors.isAdmin = 'Role is required';
        }

        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            register(formData, dispatch);
        
        }
    }


    useEffect(() => {
        if (adminRegisterSuccess) {
            setFormData({ name: '', lastName: '', email: '', password: '', isAdmin: '', approved: '' });
            toast.success('User Created Successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(userSlice.actions.clearState()); //clear state
        }

        return () => {
            dispatch(userSlice.actions.clearState());
        }
    }, [adminRegisterSuccess, dispatch]);

    return (
        <div>
            <div className="add_category">
                <div className="container-fluid">
                    <div className='text-center'>
                        <p className='text-danger'>{error}</p>
                    </div>
                    <div>
                        <h4 className="title">Add Admin User For Admin Panel</h4>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <ToastContainer />
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    name="name"
                                    type="text"
                                    value={formData?.name}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    className="form-control mb-2"
                                    placeholder='First Name'
                                />
                                {
                                    errors?.name && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.name}</p>
                                    </div>
                                }
                            </div>
                            <div className="col-md-6">
                                <input
                                    name="lastName"
                                    type="text"
                                    value={formData?.lastName}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    // onChange={(e) => handleOnChange(e, formData, setFormData)}
                                    className="form-control mb-2"
                                    placeholder='Last Name'
                                />
                                {
                                    errors?.lastName && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.lastName}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                <input
                                    name="email"
                                    type="text"
                                    value={formData?.email}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    className="form-control mb-2"
                                    placeholder='Email'
                                />
                                {
                                    errors?.email && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.email}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                <input
                                    name="password"
                                    type="password"
                                    value={formData?.password}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    className="form-control mb-2"
                                    placeholder='Password'
                                />
                                {
                                    errors?.password && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.password}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                <select className='form-control' name="isAdmin" onChange={(e: any) => handleOnChange(e, formData, setFormData, errors, setErrors)} value={formData?.isAdmin}>
                                    <option value="" defaultValue="" disabled>Select Role</option>
                                    <option value="true">Admin</option>
                                </select>
                                {
                                    errors?.isAdmin && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.isAdmin}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <button className='btn submit_btn w-auto mt-4' disabled={loading}>
                            {loading && <LoadingButton />}
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser;
