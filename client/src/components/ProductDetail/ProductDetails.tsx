import { useState } from 'react';
import { toggleWishlist } from '../../redux/wishlistRedux';
import { addToCart } from '../../redux/shoppingCartRedux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import ProductAdded from '../../helpers/ProductAdded';
import { increaseQuantity, decreaseQuantity } from '../../helpers/quantityHelpers';
import { toast } from 'react-toastify';
import { Product } from '../../types/types';

const ProductDetails = ({ product }: any) => {
    const [productQuantity, setProductQuantity] = useState(1);
    const dispatch = useDispatch();
    const wishlistProducts = useSelector((state: RootState) => state.wishlist.items);
    const showModal = useSelector((state: RootState) => state.wishlist.added);
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    const user = useSelector((state: RootState) => state.user.user);

    const handleWishlistClick = () => {
        dispatch(toggleWishlist(product));
    }

    const handleAddToCart = (product: Product, quantity: number) => {
        const existingItem = cartProducts.find((item) => item?.product?._id === product._id);

        if (existingItem) {
            return toast.error('Produkti ekziston në shportë!');
        }

        if (product?.sasia < quantity) {
            return toast.error('Nuk ka sasi te mjaftueshme në stock!');
        }

        dispatch(addToCart({ product, quantity: quantity }));
        toast.success('Produkti u shtua në shportë.');
    }

    return (
        <>
            <div className="pr_detail">
                <ProductAdded show={showModal} />

                <div className="product_description">
                    <h4 className='product_title'>{product?.title}</h4>
                    <div className="product_price">
                        {
                            user?.role === 'shumice' ? <span className='price'>{product?.priceShumice?.toFixed(2)}€</span> : <span className='price'>{product?.pricePakice?.toFixed(2)}€</span>
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
                    <div className="pr_desc">
                        <p>{product?.description}</p>
                    </div>
                    <div className="product_sort_info">
                        <ul>
                            <li>
                                <i className="fa-solid fa-circle-check"></i>
                                Produkt i garantuar
                            </li>
                            <li>
                                <i className="fa-solid fa-arrows-rotate"></i>
                                Mundësia e rikthimit të produktit
                            </li>
                            <li>
                                <i className="fa-solid fa-sack-dollar"></i>
                                Mundësia e pagimit në Cash
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                {
                    product?.sasia < 1 && <div className='mb-2'>
                        <span className="out_stock red"> Out of Stock</span>
                    </div>
                }
                <div className="cart_extra">
                    <div className="cart-product-quantity">
                        <div className="quantity">
                            <input type="button" defaultValue="-" className='minus' onClick={() => decreaseQuantity(setProductQuantity, productQuantity)} />
                            <input type="text" className='qty' title='Qty' value={productQuantity} onChange={() => { }} />
                            <input type="button" defaultValue="+" className='plus' onClick={() => increaseQuantity(setProductQuantity, productQuantity)} />
                        </div>
                    </div>
                    <div className="cart_btn">
                        <button className='btn btn-fill-out btn-addtocart border-0' type='button' onClick={() => handleAddToCart(product, productQuantity)}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            Add to Cart
                        </button>
                        <button type="button" className='add_wishlist border-0 bg-none' onClick={handleWishlistClick}>
                            {
                                wishlistProducts.some((wishlistProduct) => wishlistProduct._id === product._id) ? <i className="fa-solid fa-heart full-heart"></i> : <i className="fa-regular fa-heart"></i>
                            }
                        </button>
                    </div>
                </div>
                <hr />
                <ul className="product_meta">
                    <li>
                        Category:
                        <span> {product?.category}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProductDetails;
