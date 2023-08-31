import {useState, useEffect} from 'react';
import { Slide } from 'react-slideshow-image';
import { apiUrl } from '../../constants/backendUrl';

// ne index.tsx eshte css.

const ProductView = ({ product }: any) => {
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        setActiveImage(product?.images[0]);
    }, [product]);
    
    return (
        <>
            <div className="product_image">
                {
                    product?.images && <div className="product_img_box">
                        <img src={`${apiUrl}/images/${activeImage}`} alt="product" className='w-100' />
                    </div>
                }
                {
                    product?.images?.length > 1 && <div>
                        <Slide
                            slidesToShow={2}
                            indicators={true}
                            autoplay={false}

                            responsive={[
                                {
                                    breakpoint: 500,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1
                                    }
                                }, {
                                    breakpoint: 800,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }]}
                        >
                            {
                                product?.images && product?.images?.map((item: any, index: any) => <div key={index} className="product_gallery_item">
                                    <a href="javascript:void();" className=''>
                                        <img src={`${apiUrl}/images/${item}`} onClick={() => setActiveImage(item)} alt="product_small_img" />
                                    </a>
                                </div>
                                )
                            }
                        </Slide>
                    </div>
                }
            </div>
        </>
    )
}

export default ProductView;
