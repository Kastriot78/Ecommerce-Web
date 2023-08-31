import { useEffect } from 'react';
import Products from '../Products/Products';
import Banner from './Banner';
import SectionBanner from './SectionBanner';
import ShopInfoBanner from './ShopInfoBanner';
import SingleBanner from './SingleBanner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { getBanners3, getProducts, getBanners2, getBanners1 } from '../../redux/apiCalls';
import { Loader2 } from '../../Loader2';
import { Link } from 'react-router-dom';
import HomePageCarousel from './HomePageCarousel';

const Home = () => {
    const { loading: loading1, banners: banners1 } = useSelector((state: RootState) => state.banner1);
    const { loading: loading2, banners: banners2 } = useSelector((state: RootState) => state.banner2);
    const { loading, banners } = useSelector((state: RootState) => state.banner3);


    const dispatch = useDispatch();

    useEffect(() => {
        getProducts(dispatch);
        getBanners1(dispatch);
        getBanners3(dispatch);
        getBanners2(dispatch);

        return () => { }
    }, [dispatch])


    return (
        <div>

            <div>
                {loading1 && <Loader2 height={'550px'} />}
                {banners1 && banners1.length > 0 && (
                    <Banner banners={banners1} />
                )}
            </div>
            <div className="main_content">
                <SectionBanner banners={banners2} loading={loading2} />

                <HomePageCarousel />  

                <div className='section small_pt pb_70'>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="heading_s1 text-center">
                                    <h2 className='exclusive_products_title'>Exclusive Products</h2>
                                </div>
                            </div>
                        </div>
                        <Products productsNumber={8} />
                        <div className='text-center mt-2'>
                            <Link to="/shop" className='btn btn-fill-out rounded-0'>View All</Link>
                        </div>
                    </div>
                </div>
                <>
                    {loading && <Loader2 height={'550px'} />}

                    {banners && banners.length > 0 && (
                        <SingleBanner banners={banners} />
                    )}
                </>
                <ShopInfoBanner />
            </div>
        </div>
    )
}

export default Home;