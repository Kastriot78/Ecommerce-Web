import { useEffect, useState } from 'react';
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Products from "../Products/Products";
import { setSortOrder, setCategory } from "../../redux/productRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getCategories, getProducts, getAllProductsByCategory } from '../../redux/apiCalls';
import SkeletonCategories from '../Skeletons/SkeletonCategories';

import './style.css';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const disptach = useDispatch();
    const { categories, loading, error } = useSelector((state: RootState) => state.category);
    const { sortOrder } = useSelector((state: RootState) => state.product);

    const handleSortOrderChange = (e: any) => {
        disptach(setSortOrder(e.target.value))
    }

    const handleFilterByCategories = (category: any) => {
        if (category) {
            setCategory(category);
            setSelectedCategory(category);
            getAllProductsByCategory(category, disptach);
        }
    }

    useEffect(() => {
        getCategories(disptach);
        getProducts(disptach);
    }, [sortOrder, disptach]);

    return (
        <div>
            <BreadCrumb title="Products" />
            <div className="section">
                <div className="container">
                    <div className="d-flex justify-content-end">
                        <div className="product_header">
                            <div className="product_header_left">
                                <div className="custom_select position-relative mb-5">
                                    <select name="" id="" className="form-control form-control-sm" onChange={handleSortOrderChange}>
                                        <option value="">Default Sorting</option>
                                        <option value="lowToHigh">Sort by price: low to high</option>
                                        <option value="highToLow">Sort by price: high to low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mb-3 mt-3">
                        <div className="categories_filter_wrap">
                            <h4 className="title">Categories</h4>
                            {
                                loading || error ? <SkeletonCategories /> : <ul className="widget_categories overflow-x-auto hiddenScrollbar">
                                    {
                                        categories && categories?.map(category => (
                                            <li key={category?._id} className={`${category?.name === selectedCategory ? 'active' : ''}`} onClick={() => handleFilterByCategories(category?.name)}>{category?.name}</li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    </div> */}
                </div>
                <Products />
            </div>
        </div>
    )
}

export default Shop;
