import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
// Import Swiper styles
import 'swiper/css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { apiUrl } from '../../constants/backendUrl';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/shoppingCartRedux';
import { toast } from 'react-toastify';
import SkeletonPost from '../Skeletons/SkeletonPost';
import { Loader2 } from '../../Loader2';
import axios from 'axios';

const HomePageCarousel = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCartClick = (data: any) => {
        const existingItem: any = cartProducts.find((item) => item?.product?._id === data._id);
        dispatch(addToCart({ product: data, quantity: 1 }));

        if (existingItem) {
            toast.error('Produkti ekziston në shportë!');
        } else if (data.sasia < 1) {
            toast.error('Nuk ka sasi te mjaftueshme ne stock.');
        } else {
            toast.success('Produkti u shtua në shportë.');
        }
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/products/by-category/clothing`).then(res => {
            setProducts(res?.data?.products);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='home_page_carousel overflow-hidden'>
            <h6 className='big_title'>Featured Products</h6>
            <div className="container">
                {
                    loading ? <div className='row'>
                        {
                            Array.from({ length: 4 }).map((_, i) => (
                                <div className='col-lg-3 mt-3' key={i}>
                                    <Loader2 />
                                </div>
                            ))
                        }
                    </div> : <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        breakpoints={{
                            // Breakpoint for screens >= 320px
                            320: {
                                slidesPerView: 1,
                            },
                            // Breakpoint for screens >= 480px
                            440: {
                                slidesPerView: 2,
                            },
                            // Breakpoint for screens >= 768px
                            768: {
                                slidesPerView: 3,
                            },
                            // Breakpoint for screens >= 992px
                            992: {
                                slidesPerView: 4,
                            },
                            // Breakpoint for screens >= 1200px
                            1200: {
                                slidesPerView: 5,
                            },
                        }}
                        className="mySwiper"
                    >
                        {
                            products?.slice(0, 10)?.map((product: any, index: any) => <div key={index}>
                                {product?.sasia > 0 && <SwiperSlide key={index}>
                                    <div className='swiper_product'>
                                        {product?.sasia > 0 ? <span className='pr_stock'> In Stock</span> : <span className='pr_stock red'> Out of Stock</span>}
                                        <Link to={`/product/${product?._id}`} className='home_page_listing'>
                                            <img src={`${apiUrl}/images/${product?.images[0]}`} alt="" />
                                        </Link>
                                        <h4 className='title'>{product?.title}</h4>
                                        <div className="price">
                                            {
                                                user?.role === 'shumice' ? <span className='price'>{product?.priceShumice?.toFixed(2)}€</span> : <span className='price'>{product?.pricePakice?.toFixed(2)}€</span>
                                            }
                                        </div>
                                        <button className='btn btn-fill-out rounded-0 h-auto mt-3' onClick={() => handleAddToCartClick(product)}>Add To Cart</button>
                                    </div>
                                </SwiperSlide>}
                            </div>
                            )}
                    </Swiper>
                }
            </div>
        </div>
    )
}

export default HomePageCarousel
