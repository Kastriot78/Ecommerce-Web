import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiUrl } from '../../constants/backendUrl';
import { removeFromCart, decreaseQuantity, increaseQuantity } from '../../redux/shoppingCartRedux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchShoppingCartQuantity } from '../../redux/apiCalls';

const CartTable = ({ user }: any) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.cart.products);
    
    useEffect(() => {
        fetchShoppingCartQuantity(dispatch);
    }, [dispatch]);

    return (
        <>
            {
                products?.length > 0 ? <div className="table-responsive shop_cart_table">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='product-thumbnail'></th>
                                <th className='product-name'>Product</th>
                                <th className='product-price'>Price</th>
                                <th className='product-quantity'>Quantity</th>
                                <th className='product-subtotal'>Total</th>
                                <th className='product-remove'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product) => <tr key={product?.product?._id}>

                                    <td className="product-thumbnail">
                                        <Link to={`/product/${product.product._id}`}>
                                            <img src={`${apiUrl}/images/${product?.product?.images[0]}`} alt="product1" />
                                        </Link>
                                    </td>
                                    <td className="product-name" data-title="Product">
                                        <Link to={`/product/${product.product._id}`}>{product?.product?.title}</Link>
                                    </td>
                                    <td className="product-price" data-title="Price">{user?.role === 'shumice' ? product?.product?.priceShumice?.toFixed(2) : product?.product?.pricePakice?.toFixed(2)}€</td>
                                    <td className='product-quantity' data-title="Quantity">
                                        {
                                            product?.sasia && product?.sasia ? <div className="quantity">
                                                <input type="button" value="-" className="minus" onClick={() => dispatch(decreaseQuantity({ product: product.product, quantity: product.quantity }))} />
                                                <input type="text" name="quantity" value={product.quantity} onChange={() => { }} title="Qty" className="qty" />
                                                <input type="button" value="+" className="plus" onClick={() => dispatch(increaseQuantity({ product: product.product, quantity: product.quantity }))} />
                                            </div> : <span className="badge bg-red"> Out of Stock</span>
                                        }
                                    </td>
                                    <td className="product-subtotal" data-title="Total">{((user?.role === 'shumice' ? product?.product?.priceShumice : product?.product?.pricePakice) * (product.quantity))?.toFixed(2)}€</td>
                                    <td className="product-remove" title="Product Remove" data-title="Remove">
                                        <button type='button' className='cursor-pointer border-0' onClick={() => dispatch(removeFromCart(product.product))}>
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
                </div> : <div className='empty_cart'>
                    <h3>Your cart is empty.</h3>
                </div>
            }
        </>
    )
}

export default CartTable;
