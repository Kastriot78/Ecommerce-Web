import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constants/backendUrl';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/wishlistRedux';
import { addToCart } from '../../redux/shoppingCartRedux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import ProductAdded from '../../helpers/ProductAdded';
import NoImage from '../../images/no_image.svg';

import './style.css';

const Product = ({ data, loading }: any) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const wishlistProducts = useSelector((state: RootState) => state.wishlist.items);
    const addedWishlistitem = useSelector((state: RootState) => state.wishlist.added);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const user = useSelector((state: RootState) => state.user.user);

    const handleClick = () => {
        dispatch(toggleWishlist(data));
    }

    const handleAddToCartClick = () => {
        const existingItem: any = cartProducts.find((item) => item?.product?._id === data._id);
        dispatch(addToCart({ product: data, quantity: 1 }));

        if (existingItem) {
            toast.error('Produkti ekziston në shportë!');
        } else if (existingItem?.product?.sasia < 1) {
            toast.error('Nuk ka sasi te mjaftueshme ne stock.');
        } else {
            toast.success('Produkti u shtua në shportë.');
        }
    }

    return (
        <div className="product">
            <ProductAdded show={addedWishlistitem} />
            {data?.sasia > 0 ? <span className='pr_stock'> In Stock</span> : <span className='pr_stock red'> Out of Stock</span>}
            <div className="product_img">
                <Link to={`/product/${data?._id}`}>
                    <img src={`${apiUrl}/images/${data?.images[0]}`} alt="product" onError={(e:any) => e.target.src={NoImage}} />
                </Link>
                <div className="product_action_box">
                    <ul className='list-none pr_action_btn'>
                        {
                            data?.sasia > 0 ? <li className='add-to-cart'>
                                <button onClick={handleAddToCartClick}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </li> : ''
                        }
                        <li>
                            <Link to={`/product/${data?._id}`} className='popup-ajax'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Link>
                        </li>
                        <li>
                            <button className='popup-ajax' onClick={handleClick}>
                                {
                                    wishlistProducts.some((wishlistProduct) => wishlistProduct._id === data._id) ? <i className="fa-solid fa-heart full-heart"></i> : <i className="fa-regular fa-heart"></i>
                                }
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="product_info">
                <h6 className="product_title">
                    <Link to={`/product/${data?._id}`}>{data?.title}</Link>
                </h6>
                <div className="product_price">
                    {/* <span className='price'>${data?.discountPrice ? data?.discountPrice : data?.price?.toFixed(2)}</span>
                    {
                        data?.discountPrice ? <del>${data?.price?.toFixed(2)}</del> : ''
                    }
                    {
                        data?.discountPrice && <div className="on_sale">
                            <span>{findDiscountPercentage(data?.price, data?.discountPrice).toFixed(2)}% Off</span>
                        </div>
                    } */}
                    {
                        user?.role === 'shumice' ? <span className='price'>{data?.priceShumice?.toFixed(2)}€</span> : <span className='price'>{data?.pricePakice?.toFixed(2)}€</span>
                    }
                </div>
                <div className="rating_wrap">
                    <div className="rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
