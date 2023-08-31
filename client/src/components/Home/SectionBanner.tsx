import { Link } from 'react-router-dom';

import './style.css';
import { Loader2 } from '../../Loader2';

const SectionBanner = ({ banners, loading }: any) => {
    if (loading) {
        return <div className='container'>
            <div className='row'>
                {
                    Array.from({ length: 2 }).map((_, i) => (
                        <div className='col-12 col-lg-6' key={i}>
                            <Loader2 />
                        </div>
                    ))
                }
            </div>
        </div>
    }

    return (
        <>
            {
                banners?.length > 0 && <div className='section pb_20'>
                    <div className="container">
                        <div className="row">
                            {
                                banners[0] && <div className="col-md-6 d-flex align-items-stretch">
                                    <div className="single_banner">
                                        <img src={banners[0]?.image} alt="shop_banner" />
                                        <div className="single_banner_info">
                                            <h3 className='single_bn_title'>{banners[0]?.title}</h3>
                                            <Link to="/shop" className='btn btn-fill-out rounded-0 shop_now_banner_btn h-auto'>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                banners[1] && <div className="col-md-6 d-flex align-items-stretch">
                                    <div className="single_banner">
                                        <img src={banners[1]?.image} alt="shop_banner" />
                                        <div className="single_banner_info">
                                            <h3 className='single_bn_title'>{banners[1]?.title}</h3>
                                            <Link to="/shop" className='btn btn-fill-out rounded-0 shop_now_banner_btn h-auto'>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SectionBanner;