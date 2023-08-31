import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SubCategories from '../Modals/SubCategories';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SkeletonCategories from '../Skeletons/SkeletonCategories';
import { getCategories, getSubCategories } from '../../redux/apiCalls';

const AfterHeader = () => {
    const { categories, loading: loadingCategories, error: errorCategory } = useSelector((state: RootState) => state.category);
    const [openSubCategory, setOpenSubCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleFilterByCategories = (category: any) => {
        if (category) {
            setSelectedCategory(category);
            navigate(`/${category}`);
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        getCategories(dispatch);
        getSubCategories(dispatch);

        return () => { }
    }, [dispatch])

    return (
        <div>
            <div className={`sub_categories_overlay ${openSubCategory ? 'active' : ''}`} onClick={() => { setOpenSubCategory(false) }}></div>
            <SubCategories open={openSubCategory} setOpen={setOpenSubCategory} categories={categories} loading={loadingCategories} error={errorCategory} />
            <div className="container mt-3 mb-3">
                <div className='d-flex align-items-start'>
                    <div className='d-flex align-items-center'>
                        <span className='mini_span_subcategory'>Menu</span>
                        <button className='sub_category_toggler' onClick={() => setOpenSubCategory(true)}>
                            <svg className="eltdf-anim-burger" x="0px" y="0px" width="25.333px" height="13.417px" viewBox="0 0 25.333 13.417" enableBackground="new 0 0 25.333 13.417" xmlSpace="preserve">
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.167" y1="0.688" x2="25.167" y2="0.688"></line>
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="6.694" x2="25.165" y2="6.694"></line>
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="12.75" x2="25.165" y2="12.75"></line>
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.167" y1="0.688" x2="25.167" y2="0.688" className="eltdf-burger-filler"></line>
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="6.694" x2="25.165" y2="6.694" className="eltdf-burger-filler"></line>
                                <line fill="none" stroke="currentColor" strokeMiterlimit="10" x1="0.168" y1="12.75" x2="25.165" y2="12.75" className="eltdf-burger-filler"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="categories_wrapper-home categories_filter_wrap d-flex overflow-x-auto hiddenScrollbar">
                        <ul className="widget_categories">
                            {
                                loadingCategories || errorCategory ? <SkeletonCategories /> : categories?.map(category => (
                                    <li key={category?._id} className={`${category?.name === selectedCategory ? 'active' : ''}`} onClick={() => handleFilterByCategories(category?.name)}>{category?.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AfterHeader
