import { useEffect } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { toggleWishlist } from '../../redux/wishlistRedux';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../../constants/backendUrl';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { addToCart } from '../../redux/shoppingCartRedux';
import { toast } from 'react-toastify';
import { Product } from '../../types/types';
import { fetchWishlistQuantity } from '../../redux/apiCalls';

import './style.css';

const Wishlist = () => {
    const wishlistProducts = useSelector((state: RootState) => state.wishlist.items);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    const handleAddToCart = (product: Product, quantity: number) => {
        dispatch(addToCart({ product, quantity: quantity }));
        const existingItem = cartProducts?.find((item) => item?.product?._id === product._id);

        if (existingItem) {
            toast.error('Produkti ekzistonë në shportë!');
        } else {
            toast.success('Produkti u shtua në shportë.');
        }
    }

    useEffect(() => {
        fetchWishlistQuantity(dispatch);
    }, [dispatch]);

    return (
        <div>
            <BreadCrumb title="Wishlist" />

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                wishlistProducts?.length > 0 ? <div className="table-responsive wishlist_table">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th className='product-thumbnail'>&nbsp;</th>
                                                <th className='product-name'>Product</th>
                                                <th className='product-price'>Price</th>
                                                <th className='product-stock-status'>Stock Status</th>
                                                <th className='product-add-to-cart'></th>
                                                <th className='product-remove'>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                wishlistProducts?.map((product) => <tr key={product?._id}>
                                                    <td className="product-thumbnail">
                                                        <Link to={`/product/${product?._id}`}>
                                                            <img src={`${apiUrl}/images/${product?.images[0]}`} alt="product" />
                                                        </Link>
                                                    </td>
                                                    <td className="product-name" data-title="Product">
                                                        <Link to={`/product/${product?._id}`}>{product?.title}</Link>
                                                    </td>
                                                    <td className="product-price" data-title="Price">{user?.role === 'shumice' ? product?.priceShumice : product?.pricePakice}€</td>
                                                    <td className="product-stock-status" data-title='Stock Status'>
                                                        {
                                                            Number(product?.sasia) >= 1 ? <span className='badge badge-pill badge-success'>In Stock</span> : <span className='badge bg-red'> Out of Stock</span>
                                                        }
                                                    </td>
                                                    {
                                                        product?.sasia > 0 ? <td className='product-add-to-cart'>
                                                            <button type='button' className='btn btn-fill-out' onClick={() => handleAddToCart(product, 1)}>
                                                                <i className="fa-solid fa-cart-shopping"></i>
                                                                Add To Cart
                                                            </button>
                                                        </td>
                                                            :
                                                            <td className='product-add-to-cart'></td>
                                                    }
                                                    <td className="product-remove" data-title="Remove">
                                                        <button type="button" onClick={() => dispatch(toggleWishlist(product))} className='border-0'>
                                                            <svg x="0px" y="0px" width="17px" height="16px" viewBox="-0.26 -0.512 17 16" enableBackground="new -0.26 -0.512 17 16" xmlSpace="preserve">
                                                                <line stroke="currentColor" strokeMiterlimit="10" x2="0.583" y2="14.593" x1="15.895" y1="0.353"></line>
                                                                <line stroke="currentColor" strokeMiterlimit="10" x2="15.896" y2="14.593" x1="0.584" y1="0.353"></line>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div> : <div className='empty_wishlist'>
                                    <h3>Your wishlist is empty.</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Wishlist;
