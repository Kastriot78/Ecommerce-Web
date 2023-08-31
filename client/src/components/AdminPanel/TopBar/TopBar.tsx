import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AvatarUser from '../../../images/avatarUser.png';
import UserIcon from '../../../images/d-user-icon.svg';
import Logout from '../../../images/logout.svg';
import OutsideClick from '../../../helpers/OutsideClick';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { userSlice } from '../../../redux/userRedux';

import './style.css';

const TopBar = () => {
    const [show, setShow] = useState(false);
    const wrapperRef = useRef(null);
    OutsideClick(wrapperRef, setShow);

    const dispatch = useDispatch();

    const { show: showNavbar } = useSelector((state: RootState) => state.navbar);
    const { user } = useSelector((state: RootState) => state.user);
    
    return (
        <div className={`search-user-holder ${showNavbar ? 'active' : ''}`}>
            <div className="search-user-container justify-content-end">
                <div className="navbar-right-side">
                    <div ref={wrapperRef} className="user-acc-container" onClick={() => setShow(!show)}>
                        <div className="user-acc-info">
                            <div className="user-image-holder">
                                <img src={AvatarUser} alt="" />
                            </div>
                            <span className="user-name-holder">{user?.name}</span>
                            <span className="user-arrow">
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                        </div>

                        <div>
                            <div className={`user-acc-details ${show ? 'show' : ''}`}>
                                <div className="user-acc-profile">
                                    <div className="user-acc-img">
                                        <img src={AvatarUser} alt="" />
                                    </div>
                                    <div>
                                        <h6>{user?.name}</h6>
                                        <span>{user?.email}</span>
                                    </div>
                                </div>

                                <div className="user-acc-options">
                                    <h3>Options</h3>
                                    <Link to="/app/admin/account/settings">
                                        <img src={UserIcon} alt="" />
                                        <h6>Account</h6>
                                    </Link>
                                </div>

                                <div className="user-acc-logout">
                                    <Link to="/login" onClick={() => dispatch(userSlice.actions.logout())}>
                                        <img src={Logout} alt="" />
                                        <h6>Logout</h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar