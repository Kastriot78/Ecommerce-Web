import { useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import Loader from '../../Loader';
import { ContactData } from '../../types/types';
import { handleOnChange } from '../../helpers/handleChange';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from '../../constants/backendUrl';

import './style.css';
import NumberInput from '../../helpers/NumberInput';

const Contact = () => {
    const [formData, setFormData] = useState<ContactData>({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({} as ContactData);

    const validateForm = (data: ContactData) => {
        const errors = {} as ContactData;

        if (!data?.name) {
            errors.name = 'Name is required';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        if (!data?.phoneNumber) {
            errors.phoneNumber = 'Price is required';
        } else if (isNaN(Number(data?.phoneNumber))) {
            errors.phoneNumber = 'Price must be a number';
        }

        if (!data?.subject) {
            errors.subject = 'Subject is required';
        }

        if (!data?.message) {
            errors.message = 'Description is required';
        }

        return errors;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const res = await axios.post(`${apiUrl}/contacts`, formData);

            if (res.status === 200) {
                // reset form data.
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    subject: '',
                    message: ''
                });
                toast.success("Faleminderit për mesazhin.");
            }
        }
    }

    return (
        <div>
            <BreadCrumb title="Contact" />

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="contact_wrap">
                                <div className="contact_icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="contact_text">
                                    <span>Address</span>
                                    <p>Zejnel Salihu, nr. 46, Pristina, Kosovo</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="contact_wrap">
                                <div className="contact_icon">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="contact_text">
                                    <span>Email Address</span>
                                    <p>info@betatech-ks.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="contact_wrap">
                                <div className="contact_icon">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div className="contact_text">
                                    <span>Phone</span>
                                    <p>048 220 989</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section pt-0'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading_s1 mb-2">
                                <h2 className='contact_title'>Si mund t’ju ndihmojmë?</h2>
                            </div>
                            <p className='contact_desc'>Nëse keni ndonjë pyetje specifike, ju lutem mos hezitoni të na kontaktoni duke plotësuar këtë formë.</p>
                            <div className="contact_form">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <input
                                                name="name"
                                                type="text"
                                                className={`form-control ${errors?.name ? 'border-red' : ''}`}
                                                placeholder='Enter Name *'
                                                value={formData?.name}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.name && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.name}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input
                                                name="email"
                                                type="email"
                                                className={`form-control ${errors?.name ? 'border-red' : ''}`}
                                                placeholder='Enter Email *'
                                                value={formData?.email}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.email && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.email}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <NumberInput
                                                name='phoneNumber'
                                                className={`form-control ${errors?.name ? 'border-red' : ''}`}
                                                placeholder='Enter Phone Number *'
                                                value={formData?.phoneNumber}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.phoneNumber && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.phoneNumber}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group col-md-6">
                                            <input
                                                name="subject"
                                                type="text"
                                                className={`form-control ${errors?.name ? 'border-red' : ''}`}
                                                placeholder='Enter Subject *'
                                                value={formData?.subject}
                                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                            />
                                            {
                                                errors?.subject && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.subject}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group col-md-12">
                                            <textarea className={`form-control ${errors?.name ? 'border-red' : ''}`} name="message" id="" placeholder='Messagge *' value={formData?.message} onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}></textarea>
                                            {
                                                errors?.message && <div className="heading_error">
                                                    <p className='text-left mb-0'>{errors?.message}</p>
                                                </div>
                                            }
                                        </div>
                                        <div className="col-md-12">
                                            <button type='submit' title='Submit Your Message!' className='btn btn-fill-out' id='submitButton'>Dërgo Mesazhin</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
