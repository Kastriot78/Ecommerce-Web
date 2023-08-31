import { useState, useEffect } from 'react';
import pencilRounded from '../../../images/pencil-rounded-bg.svg';
import userAvatar from '../../../images/avatarUser.png';
import ResetPassword from '../../Modals/ResetPassword';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import './style.css';
import { RootState } from '../../../redux/store';
import { userSlice } from '../../../redux/userRedux';
import LoadingButton from '../../../helpers/LoadingButton';
import NumberInput from '../../../helpers/NumberInput';

type UserData = {
    name: string,
    lastName: string,
    email: string,
    avatar: File | null,
    phone: string;
    company: string;
}

const MyAccount = () => {
    const [formData, setFormData] = useState<UserData>({
        name: '',
        lastName: '',
        email: '',
        avatar: null,
        phone: '',
        company: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [errors, setErrors] = useState({} as UserData);
    const [loadingButton, setLoadingButton] = useState(false);
    const disptach = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);

    const handleOnChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, avatar: files && files[0] }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('lastName', formData.lastName);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('company', formData.company);

        const errors = {} as UserData;

        if (formData.name === '') {
            errors.name = 'Name is required'
        }

        if (formData.lastName === '') {
            errors.lastName = 'Last Name is required'
        }

        if (formData.email === '') {
            errors.email = 'Email is required'
        }

        if (formData.phone === '') {
            errors.phone = 'Phone is required'
        }

        if (formData.company === '') {
            errors.company = 'Company is required'
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoadingButton(true);

            axios.put(`${apiUrl}/users/${user?._id}`, formDataObj, {
                headers: { Authorization: 'Bearer ' + user?.token }
            }).then(res => {
                if (res?.data?.error) {
                    setErrorMsg(res?.data?.error);
                    setLoadingButton(false);
                    return;
                }

                if (res.status === 200) {
                    disptach(userSlice.actions.userUpdated(res.data.user));
                    toast.success('Profili u editua me sukses.', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoadingButton(false);
                }
            }).catch(err => {
                setLoadingButton(false);
            });
        }
    }

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, lastName: user.lastName, email: user.email, avatar: null, phone: user.phone, company: user.company });
        }
    }, [user]);

    return (
        <div className={`${!user?.isAdmin ? 'container' : ''} account-page`}>
            <ResetPassword show={showModal} setShowModal={setShowModal} />
            <div className="">
                <div className="row">
                    {
                        errorMsg && <div className="heading_error">
                            <p className='text-center mb-0'>{errorMsg}</p>
                        </div>
                    }
                    <div className="col-md-12">
                        <div className="form-wrapper">
                            <div className="flex-header">
                                <h1>My Account</h1>
                                <h6>Manage your Account</h6>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="account-image">
                                            <div className="image-user">
                                                <div>
                                                    <label htmlFor="avatar">
                                                        <img src={pencilRounded} alt="icon" className='editIcon' />
                                                    </label>
                                                    <img src={formData?.avatar ? URL.createObjectURL(formData?.avatar) : user?.avatar ? user?.avatar : userAvatar} alt="user icon" />
                                                    <input type="file" name="avatar" id="avatar" onChange={handleFileChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder='Name'
                                                        className='form-control'
                                                        value={formData?.name}
                                                        onChange={(e) => handleOnChange("name", e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        name="lastName"
                                                        type="text"
                                                        placeholder='Last Name'
                                                        className='form-control'
                                                        value={formData?.lastName}
                                                        onChange={(e) => handleOnChange("lastName", e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors.lastName}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        name="email"
                                                        type="text"
                                                        placeholder='Email'
                                                        className='form-control'
                                                        value={formData?.email}
                                                        onChange={(e) => handleOnChange("email", e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <NumberInput
                                                        name='phone'
                                                        className='form-control'
                                                        placeholder='Phone'
                                                        value={formData?.phone}
                                                        onChange={(e) => handleOnChange("phone", e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors.phone}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        name="company"
                                                        type="text"
                                                        placeholder='Company'
                                                        className='form-control'
                                                        value={formData?.company}
                                                        onChange={(e) => handleOnChange("company", e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors.company}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="password-section">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4>Password</h4>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <button type='button' className='btn change-password-btn' onClick={() => setShowModal(!showModal)}>Change Password</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="col-md-12">
                                        <button type='button' onClick={handleSubmit} className='btn save-btn' disabled={loadingButton}>
                                            {loadingButton && <LoadingButton />}
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;
