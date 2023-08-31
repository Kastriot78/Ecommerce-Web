import { useState } from 'react';
import SkeletonCategories from '../Skeletons/SkeletonCategories';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const SubCategories = ({ open, setOpen, categories, loading, error }: any) => {
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [openSubmenu, setOpenSubMenu] = useState(null);
    const navigate = useNavigate();

    const handleFilterBySubCategories = (subCategory: any) => {
        if (subCategory) {
            setSelectedSubCategory(subCategory);
            navigate(`/subCategory/${subCategory}`);
            setOpen(false);
        }
    }

    const handleFilterByCategory = (category: any) => {
        if (category) {
            navigate(`/${category}`);
            setOpen(false);
        }
    }

    const toggleOpenSubMenu = (index: any) => {
        if (openSubmenu === index) {
            setOpenSubMenu(null);
        } else {
            setOpenSubMenu(index);
        }
    }

    return (
        <div className={`sub_categories_menu ${open ? 'active' : ''}`}>
            <button className='menu__close' title="Close" onClick={() => setOpen(false)}>
                <span></span>
            </button>


            <ul className='menu-main-subcategories mt-3'>
                {
                    loading || error ? <SkeletonCategories /> : categories?.map((category: any, index: any) => <li className={`menu-item position-relative ${openSubmenu === index ? 'open' : ''}`} key={index}>
                        <span onClick={() => handleFilterByCategory(category?.name)}>{category?.name}</span>
                        {
                            category?.subCategories?.length > 0 && <a href="#" className='toggle-submenu' onClick={() => toggleOpenSubMenu(index)}>
                                <span className="toggle-icon"></span>
                            </a>
                        }
                        <ul className='sub-menu'>
                            {
                                category?.subCategories?.map((subCategory: any, index: any) => <li className={`menu-item ${subCategory === selectedSubCategory ? 'active' : ''}`} key={index} onClick={() => handleFilterBySubCategories(subCategory)}>
                                    {subCategory}
                                </li>)
                            }
                        </ul>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default SubCategories;
