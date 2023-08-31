import { Link } from 'react-router-dom';
import FooterLogo from '../../images/logo_beta_tech3.svg';
import './style.css';

const Footer = () => {
    return (
        <div>
            <footer className='footer_dark'>
                <div className="footer_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="widget">
                                    <div className="footer_logo">
                                        <Link to="/">
                                            <img src={FooterLogo} alt="logo" />
                                        </Link>
                                    </div>
                                    <p>BetaTech është kompani e specializuar për shitjen dhe instaliminin e produkteve dhe shërbimeve teknologjike.</p>
                                </div>
                                <div className="widget">
                                    <ul className="social_icons social_white">
                                        <li>
                                            <a href="https://www.facebook.com/betatechshpk/">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/betatechshpk/">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="widget">
                                    <h6 className='widget_title'>Useful Links</h6>
                                    <ul className="widget_links">
                                        <li>
                                            <Link to="/shop">Products</Link>
                                        </li>
                                        <li>
                                            <Link to="/wishlist">Wishlist</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="widget">
                                    <h6 className='widget_title'>My Account</h6>
                                    <ul className="widget_links">
                                        <li>
                                            <Link to="/login">My Account</Link>
                                        </li>
                                        <li>
                                            <Link to="/cart">Cart</Link>
                                        </li>
                                        <li>
                                            <Link to="/my-orders">Orders History</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <div className="widget">
                                    <h6 className="widget_title">Contact Info</h6>
                                    <ul className='contact_info contact_info_lihght'>
                                        <li>
                                            <i className="fa-solid fa-location-pin"></i>
                                            <p>Zejnel Salihu, nr. 46, Pristina, Kosovo</p>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-envelope"></i>
                                            <p>info@betatech-ks.com</p>
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-phone"></i>
                                            <p>048 220 989</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom_footer border-top-tran">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p className='mb-md-0 text-center text-md-start'>{new Date().getFullYear()} All Rights Reserved by BetaTech.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
