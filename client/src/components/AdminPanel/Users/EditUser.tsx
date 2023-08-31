import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { handleOnChange } from '../../../helpers/handleChange';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../../helpers/LoadingButton';
import { userSlice } from '../../../redux/userRedux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';

interface Idata {
    name: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    role: string;
}

const EditUser = () => {
    const [formData, setFormData] = useState<Idata>({
        name: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        role: '',
    });
    const [errors, setErrors] = useState({} as Idata);
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const { success, error, user } = useSelector((state: RootState) => state.user);
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        if (!data.company) {
            errors.company = 'Company is required';
        }

        if (!data.phone) {
            errors.phone = 'Phone is required';
        }

        if (!data.role) {
            errors.role = 'Role is required';
        }

        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios.put(`${apiUrl}/users/${id}`, formData, {
                headers: { Authorization: 'Bearer ' + user?.token }
            }).then(res => {
                if (res?.data?.error) {
                    return setErrorMsg(res?.data?.error);
                }

                if (res.status === 200) {
                    dispatch(userSlice.actions.userUpdated(res.data.user));
                    toast.success('User updated successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoadingButton(false);
                    navigate('/app/admin/manage-users');
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }


    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/users/${id}`, {
                headers: { Authorization: 'Bearer ' + user?.token }
            }).then(res => {
                setFormData({
                    name: res?.data?.user?.name,
                    lastName: res?.data?.user?.lastName,
                    email: res?.data?.user?.email,
                    company: res?.data?.user?.company,
                    phone: res?.data?.user?.phone,
                    role: res?.data?.user?.role
                });
            }).catch(err => {
                console.log(err);
            });
        }

        return () => {
            dispatch(userSlice.actions.clearState()); //e bojm clear state-n
        }
    }, [success, id, user?.token, dispatch]);

    return (
        <div>
            <div className="add_category">
                <div className="container-fluid">
                    <div className='text-center'>
                        <p className='text-danger'>{error}</p>
                    </div>
                    {
                        errorMsg && <div className="heading_error">
                            <p className='text-center mb-0'>{errorMsg}</p>
                        </div>
                    }

                    <div>
                        <h4 className="title">Edit User</h4>
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
                                    name="company"
                                    type="text"
                                    value={formData?.company}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    className="form-control mb-2"
                                    placeholder='Company'
                                />
                                {
                                    errors?.company && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.company}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                <input
                                    name="phone"
                                    type="text"
                                    value={formData?.phone}
                                    onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                    className="form-control mb-2"
                                    placeholder='Phone'
                                />
                                {
                                    errors?.phone && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.phone}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-md-6">
                                <select className='form-control' name="role" onChange={(e: any) => handleOnChange(e, formData, setFormData, errors, setErrors)} value={formData?.role}>
                                    <option value="" defaultValue="" disabled>Select Role</option>
                                    <option value="shumice">Me Shumice</option>
                                    <option value="pakice">Me Pakice</option>
                                </select>
                                {
                                    errors?.role && <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.role}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <button className='btn submit_btn w-auto mt-4' disabled={loadingButton}>
                            {loadingButton && <LoadingButton />}
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUser;
