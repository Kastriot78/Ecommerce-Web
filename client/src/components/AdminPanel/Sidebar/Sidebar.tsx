import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { elements } from './sidebarElements';
import SubItem from './subnav_item';
import { NavbarSlice } from '../../../redux/navbarRedux';
import { useDispatch } from 'react-redux';

import Logo from '../../../images/logo_beta_tech3.svg';
import ToogleMenu from '../../../images/toggle-menu.png';
import ToggleSettings from '../../../images/settings_toggle.svg';

import './style.css';

const Sidebar = () => {
    const location = useLocation();
    let activeEl = localStorage.getItem("active");

    const [active, setActive] = useState((activeEl === "admin" || !activeEl) ? "dashboard" : activeEl);
    const [showChilds, setShowChilds] = useState((activeEl === "admin" || !activeEl) ? "dashboard" : activeEl);
    const [showNavbar, setShowNavbar] = useState(false);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    const dispatch = useDispatch();

    const toggleSidebarEl = (key: any, children: any) => {
        setActive(key)
        setShowChilds(showChilds === key ? "" : key)
        localStorage.setItem("child", "")
        localStorage.setItem("active", key);
        // if(!children){
        //     dispatch(showSidebar(false))
        // }
    }

    const toggleNavbarShow = () => {
        setShowNavbar(!showNavbar);
        dispatch(NavbarSlice.actions.showNavbar(!showNavbar));
    };

    const toggleSidebarShow = () => {
        setShowSidebarMobile(!showSidebarMobile);
    }

    useEffect(() => {
        if (location.pathname === "/app/admin") {
            setActive("dashboard")
            setShowChilds("dashboard")
            localStorage.setItem("child", "")
            localStorage.setItem("active", "admin")
        }
    }, [location])

    return (
        <div className='system-sidebar'>
            <div className="sidebar-top">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
                <div className="d-flex align-items-center">
                    <img src={ToggleSettings} alt="" className='toggle-nav' onClick={toggleNavbarShow} />
                    <img src={ToogleMenu} alt="" className='toggle-sidebar-icon' onClick={toggleSidebarShow} />
                </div>
            </div>
            <div className={`sidebar-main-elements ${showSidebarMobile ? 'active' : ''}`}>
                <div className="sidebar-item-list">
                    <ul className='parent-ul-container'>
                        {elements.map(el => {
                            return (
                                <li className={`nav-item parent-li-item ${active === el.key ? "active" : ""} ${showChilds === el.key ? "show" : ""}`} key={el.key} >
                                    {el.children ?
                                        <div >
                                            <span className="nav-link navlink-withchildrens" onClick={() => toggleSidebarEl(el.key, el.children)}>
                                                {el.name}
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            {el.children &&
                                                <SubItem children={el.children} setShowSidebarMobile={setShowSidebarMobile} />
                                            }
                                        </div>
                                        :

                                        <Link className="nav-link" to={el.path} onClick={() => setShowSidebarMobile(false)}>
                                            {el.name}
                                        </Link>

                                    }
                                </li>
                            )
                        })}
                        {/* <li className='nav-item parent-li-item'>
                            <Link to="/app/admin">Dashboard</Link>
                        </li>
                        <li className='nav-item parent-li-item active'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Products
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/products">Manage Products</Link>
                                    </li>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/add-product">Create Product</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item parent-li-item'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Colors
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/colors">Manage Colors</Link>
                                    </li>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/add-color">Create Color</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item parent-li-item'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Orders
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/colors">Manage Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item parent-li-item'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Contacts
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/colors">Manage Contacts</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item parent-li-item'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Subscribers
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/colors">Manage Subscribers</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item parent-li-item'>
                            <div>
                                <span className="nav-link navlink-withchildrens">
                                    Users
                                    <i className="fa-solid fa-angle-right"></i>
                                </span>
                                <ul className='nav flex-column child-ul-container'>
                                    <li className='nav-item child-li-item'>
                                        <Link to="/app/admin/colors">Manage Users</Link>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;