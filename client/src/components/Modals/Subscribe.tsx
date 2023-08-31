import { useEffect, useState } from 'react';
import Banner from '../../images/popup_img.jpg';
import axios from 'axios';
import { apiUrl } from '../../constants/backendUrl';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.css';


const Subscribe = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const location = useLocation();

    const closeModal = () => {
        setShow(false);
        if(isChecked) {
            localStorage.setItem('subscribe-modal', 'active');
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const request = await axios.post(`${apiUrl}/subscribers`, { email });
            const { error, msg, data } = request.data;
            if (error) throw new Error(msg);

            localStorage.setItem('subscribe-modal', 'active');
            setEmail('');
            toast.success("You’ve successfully subscribed to our newsletter");
            closeModal();
        } catch (err) {
            toast.error("Upps, someting went wrong");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('subscribe-modal') === "active") {
            closeModal();
        } else {
            setTimeout(() => {
                setShow(true);
            }, 3200);
        }

    }, [location]);

    return (
        <div className={`subscribe_popup ${show ? 'show' : ''}`}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type='button' className='close' onClick={closeModal}>
                            <span>
                                <svg x="0px" y="0px" width="17px" height="16px" viewBox="-0.26 -0.512 17 16" enableBackground="new -0.26 -0.512 17 16" xmlSpace="preserve">
                                    <line stroke="currentColor" strokeMiterlimit="10" x2="0.583" y2="14.593" x1="15.895" y1="0.353"></line>
                                    <line stroke="currentColor" strokeMiterlimit="10" x2="15.896" y2="14.593" x1="0.584" y1="0.353"></line>
                                </svg>
                            </span>
                        </button>
                        <div className="row g-0">
                            <div className="col-sm-5">
                                <div className='background_bg h-100' style={{ backgroundImage: `url(${Banner})` }}></div>
                            </div>
                            <div className="col-sm-7">
                                <div className="popup_content">
                                    <div className="popup-text">
                                        <div className="heading_s1">
                                            <h4>Subscribe And Get 25% Discount!</h4>
                                        </div>
                                        <p>Subscribe to the newsletter to receive updates about new products.</p>
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className='form-control rounded-0'
                                                placeholder='Enter Your Email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' className='btn btn-fill-line btn-block text-uppercase rounded-0 w-100'>Subscribe</button>
                                        </div>
                                    </form>
                                    <div className="check-form">
                                        <div className="custome-checkbox">
                                            <input id='popup_checkbox' type="checkbox" className='form-check-input me-2' checked={isChecked} onChange={handleChange} />
                                            <label htmlFor="popup_checkbox" className='form-check-label'>
                                                <span>Don't show this popup again!</span>
                                            </label>
                                        </div>
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

export default Subscribe;
