import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo_beta_tech3.svg';
import SearchModal from '../Modals/Search';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { userSlice } from '../../redux/userRedux';

import './style.css';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [scroll, setScroll] = useState(false);
    const { user } = useSelector((state: RootState) => state.user);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/${search}`);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });

    }, [user, dispatch]);

    return (
        <div>
            <header className={`header_wrap ${scroll ? 'fixed-top' : ''}`}>
                <div className={`overlay ${open ? 'active' : ''}`} onClick={() => { setOpen(false) }}></div>

                <div className="top-header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <div className='d-flex align-items-center justify-content-center justify-content-md-start'>
                                    <ul className='contact_detail text-center text-lg-start'>
                                        <li>
                                            <i className="fa-solid fa-phone"></i>
                                            <span>048 220 989</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="text-center text-md-end">
                                    <ul className="unstyled-list header_list">
                                        <li>
                                            <Link to="/wishlist" className={location.pathname === '/wishlist' ? 'active' : ''}>
                                                <i className="fa-regular fa-heart"></i>
                                                <span>Wishlist</span>
                                            </Link>
                                        </li>
                                        {
                                            user && <li>
                                                <Link to="/my-orders" className={location.pathname === '/my-orders' ? 'active' : ''}>
                                                    <i className="fa-solid fa-bag-shopping"></i>
                                                    <span>My Orders</span>
                                                </Link>
                                            </li>
                                        }
                                        {
                                            user && !user?.isAdmin && <li>
                                                <Link to="/account" className={location.pathname === '/account' ? 'active' : ''}>
                                                    <i className="fa-solid fa-gear"></i>
                                                    <span>Account</span>
                                                </Link>
                                            </li>
                                        }
                                        {
                                            user?.isAdmin ?
                                                <li>
                                                    <Link to="/app/admin">
                                                        <i className="fa-solid fa-gear"></i>
                                                        <span>Admin Panel</span>
                                                    </Link>
                                                </li>
                                                : ''
                                        }

                                        {
                                            user ?
                                                <li className='logout-btn'>
                                                    <Link to='/login' onClick={() => dispatch(userSlice.actions.logout())}>
                                                        <i className="fa-solid fa-right-from-bracket"></i>
                                                        <span>Logout</span>
                                                    </Link>
                                                </li>

                                                : <li>
                                                    <Link to="/login">
                                                        <i className="fa-regular fa-user"></i>
                                                        <span>Login</span>
                                                    </Link>
                                                </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom_header">
                    <div className="container">
                        <div className="wrap-menu-header wrap-menu-header-lg">
                            <Link to="/" className='logo'>
                                <img src={Logo} className="img-fluid" alt="logo" />
                            </Link>

                            <div className='search_wrapper desktop_wrapper_search'>
                                <form onSubmit={handleSearchSubmit} id="small-search-box-form" className="d-flex justify-content-between align-items-center w-100">
                                    <input
                                        type="text"
                                        className="search-box-text"
                                        autoComplete="off"
                                        placeholder="Kërko"
                                        aria-label="Kërko"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button title="Kërko" className="icon-search-find cursor-pointer w-10 h-10">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>

                            <div className='d-flex flex-row-reverse'>
                                <button className='menu__toggler' onClick={() => { setOpen(true) }}>
                                    <svg className="eltdf-anim-burger" x="0px" y="0px" width="25.333px" height="13.417px" viewBox="0 0 25.333 13.417" enableBackground="new 0 0 25.333 13.417" xmlSpace="preserve">
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.167" y1="0.688" x2="25.167" y2="0.688"></line>
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="6.694" x2="25.165" y2="6.694"></line>
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="12.75" x2="25.165" y2="12.75"></line>
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.167" y1="0.688" x2="25.167" y2="0.688" className="eltdf-burger-filler"></line>
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="6.694" x2="25.165" y2="6.694" className="eltdf-burger-filler"></line>
                                        <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="12.75" x2="25.165" y2="12.75" className="eltdf-burger-filler"></line>
                                    </svg>
                                </button>

                                <div className='d-flex align-items-center'>
                                    <ul className={`menu menu-lg ${open ? 'active' : ''}`}>
                                        <a className="header-nav__close" onClick={() => { setOpen(false) }} title="close">
                                            <span></span>
                                        </a>

                                        <li>
                                            <Link to="/" onClick={() => setOpen(false)} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/shop" onClick={() => setOpen(false)} className={location.pathname === '/shop' ? 'active' : ''}>Products</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact" onClick={() => setOpen(false)} className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
                                        </li>
                                    </ul>

                                    <ul className='attr-nav'>
                                        {/* <li>
                                            <a onClick={() => setSearchOpen(true)} className="cursor-pointer">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </a>
                                        </li> */}
                                        <li className='cart_dropdown'>
                                            <Link to="/cart">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <span className='cart_count'>{cartProducts?.length}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='search_wrapper mobile_wrapper_search'>
                            <form onSubmit={handleSearchSubmit} id="small-search-box-form" className="d-flex justify-content-between align-items-center w-100">
                                <input
                                    type="text"
                                    className="form-control search-box-text"
                                    autoComplete="off"
                                    placeholder="Kërko"
                                    aria-label="Kërko"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button title="Kërko" className="icon-search-find w-10 h-10">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;