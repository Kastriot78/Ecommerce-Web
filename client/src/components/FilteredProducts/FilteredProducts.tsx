import { useEffect, useState } from 'react';
import Product from '../Products/Product';
import axios from 'axios';
import { apiUrl } from '../../constants/backendUrl';
import { useParams } from 'react-router-dom';

const FilteredProducts = () => {
    const [productByCategory, setProductsByCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            setLoading(true);
            axios.get(`${apiUrl}/products/by-category/${category}`).then(res => {
                setProductsByCategory(res?.data?.products);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [category]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className='row shop_container'>
                        {
                            productByCategory?.length > 0 ? (
                                productByCategory?.map((product: any) => (
                                    <div className="col-lg-3 col-md-4 col-6 d-flex mt-4 mb-4" key={product?._id}>
                                        <Product data={product} loading={loading} />
                                    </div>
                                ))
                            ) : (
                                <div className="empty_wishlist mt-4 mb-5">
                                    <h5>Nuk u gjet ndonjë produkt që përputhet me kërkimin tuaj.</h5>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteredProducts;
