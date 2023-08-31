import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../constants/backendUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import LoadingButton from '../../helpers/LoadingButton';
import { getUserLocalStorage } from '../../helpers/user';

type PropsState = {
    show: boolean,
    setShowModal: Function,
}

type FormData = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

const ResetPassword: React.FC<PropsState> = ({ show, setShowModal }) => {
    const [formData, setFormData] = useState<FormData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [msgAlert, setMsgAlert] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const [errors, setErrors] = useState({} as FormData);

    const user = getUserLocalStorage();

    const handleOnChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = {} as FormData;

        if (formData.currentPassword === '') {
            errors.currentPassword = 'Current passoword is required';
        }

        if (formData.newPassword === '') {
            errors.newPassword = 'New password is required';
        }

        if (formData.confirmPassword === '') {
            errors.confirmPassword = 'Confirm password is required';
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const isMatch = bcrypt.compareSync(formData.currentPassword, user && user.password);

            if (!isMatch) {
                setMsgAlert('Current password is not correct');
                return;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                setMsgAlert('Your password and confirmation password do not match.');
                return;
            }
            setLoadingButton(true);

            axios.put(`${apiUrl}/users/edit/password/${user?._id}`, { password: formData.newPassword }, {
                headers: { Authorization: 'Bearer ' + user?.token }
            }).then(res => {
                if (res.status === 200) {
                    toast.success('Password has been reset', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setShowModal(false);
                    setMsgAlert('');
                    setLoadingButton(false);
                    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }
            });

        }
    }

    return (
        <div className={`reset-password-modal ${show ? 'active' : ''}`}>
            <div className={`backdrop ${show ? 'show' : ''}`} onClick={() => setShowModal(false)}></div>
            <div className="wrapper">
                <div className="heading_error">
                    <p className='text-left mb-0'>{msgAlert}</p>
                </div>
                <h2>Change Password</h2>
                <div className="account-inputs-section">
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        name="currentPassword"
                                        type="password"
                                        placeholder='Current Password'
                                        className='form-control'
                                        value={formData.currentPassword}
                                        onChange={(e) => handleOnChange('currentPassword', e.target.value)}
                                    />
                                    <span className='text-danger'>{errors.currentPassword}</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        name="newPassword"
                                        type="password"
                                        placeholder='New Password'
                                        className='form-control'
                                        value={formData.newPassword}
                                        onChange={(e) => handleOnChange("newPassword", e.target.value)}
                                    />
                                    <span className='text-danger'>{errors.newPassword}</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder='Confirm Password'
                                        className='form-control'
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleOnChange("confirmPassword", e.target.value)}
                                    />
                                    <span className='text-danger'>{errors.confirmPassword}</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end flex-wrap">
                            <button type='button' className='btn cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                            <button type='button' onClick={handleSubmit} className='btn save-btn' disabled={loadingButton}>
                                {loadingButton && <LoadingButton />}
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
