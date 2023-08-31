import { useEffect, useState } from 'react';
import Product from '../Products/Product';
import axios from 'axios';
import { apiUrl } from '../../constants/backendUrl';
import { useParams } from 'react-router-dom';

const FilteredBySubCategories = () => {
    const [productBySubCategory, setProductsBySubCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { subCategory } = useParams();

    useEffect(() => {
        if (subCategory) {
            setLoading(true);
            axios.get(`${apiUrl}/products/by-sub-category/${subCategory}`).then(res => {
                setProductsBySubCategory(res?.data?.products);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [subCategory]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className='row shop_container'>
                        {
                            productBySubCategory?.length > 0 ? (
                                productBySubCategory?.map((product: any) => (
                                    <div className="col-lg-3 col-md-4 col-6 d-flex mt-4 mb-4" key={product?._id}>
                                        <Product data={product} loading={loading} />
                                    </div>
                                ))
                            ) : (
                                <div className="empty_wishlist mt-4 mb-5">
                                    <h5>Nuk u gjet ndonjë produkt që përputhet me nën kategorinë e caktuar.</h5>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilteredBySubCategories;
