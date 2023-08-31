import { Link } from 'react-router-dom';

import { Slide } from 'react-slideshow-image';

import './style.css';

const Banner = ({ banners }: any) => {

    return (
        <div>
            {
                banners &&
                <div className="banner_section shop_banner_slider position-relative">
                    <Slide
                        slidesToShow={1}
                        autoplay={false}
                    >
                        {
                            banners?.map((banner: any) => (
                                <div className="banner__carousel-item position-relative" style={{ backgroundImage: `url(${banner?.image})` }} key={banner?._id}>
                                    <div className="banner_slide_content">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="banner_content overflow-hidden">
                                                        <h2>{banner?.title}</h2>
                                                        <Link to="/shop" className='btn btn-fill-out rounded-0 text-uppercase'>Shop Now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slide>
                </div>

            }
        </div>
    )
}

export default Banner;