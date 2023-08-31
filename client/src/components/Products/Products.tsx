import React, { useEffect } from 'react';
import Product from './Product';
import Loader from '../../Loader';
import { LoaderHook } from '../../customHooks/LoaderHook';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { getProducts } from '../../redux/apiCalls';
import SkeletonPost from '../Skeletons/SkeletonPost';

import './style.css';
import { Loader2 } from '../../Loader2';

const Products = ({ productsNumber }: any) => {
    const loadingPage = LoaderHook();
    const { products, isLoading, error, filteredProductsByCategory, categoryLoading } = useSelector((state: RootState) => state.product);
    const sortOrder = useSelector((state: RootState) => state.product.sortOrder);
    const dispatch = useDispatch();

    if (categoryLoading) {
        return (
            <div className='container'>
                <div className="row">
                    {filteredProductsByCategory?.length > 0 ? filteredProductsByCategory?.map((_: any, i: any) => {
                        return (
                            <div className="col-lg-3" key={i}>
                                <SkeletonPost />
                            </div>
                        );
                    }) : Array.from({ length: 8 }).map((_, i) => (
                        <div className='col-lg-3' key={i}>
                            <SkeletonPost />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const productsToDisplay = filteredProductsByCategory?.slice(0, productsNumber);

    return (
        <div className=''>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="tab-content">
                            <div className="row shop_container">
                                {
                                    productsToDisplay?.length > 0 ? (
                                        productsToDisplay?.map((product: any) => (
                                            <div className="col-lg-3 col-md-4 col-6 d-flex" key={product?._id}>
                                                <Product data={product} loading={categoryLoading} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty_wishlist">
                                            <h5>Asnjë produkt me kategorinë e perzgjedhur</h5>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;
