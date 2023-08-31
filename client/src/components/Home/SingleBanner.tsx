import { Link } from 'react-router-dom';

import './style.css';

const SingleBanner = ({ banners }: any) => {
    return (
        <>
            {
                banners?.length > 0 && <div className='section bg_light_blue2 pb-0 pt-md-0'>
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-md-6 offset-md-1">
                                <div className="medium_divider d-none d-md-block"></div>
                                <div className="trand_banner_text text-center text-md-start">
                                    <div className="heading-s1 mb-3">
                                        <h2>{banners[0]?.title}</h2>
                                    </div>
                                    <h5 className='mb-4'>{banners[0]?.subTitle}</h5>
                                    <Link to="/shop" className='btn btn-fill-out rounded-0'>Shop Now</Link>
                                </div>
                                <div className="medium_divider clearfix"></div>
                            </div>
                            <div className="col-md-5">
                                <div className="text-center tranding_img">
                                    <img src={banners[0]?.image} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SingleBanner;
