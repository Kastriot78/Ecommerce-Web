import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CartTotals = ({user}: any) => {
    const cartProducts = useSelector((state: RootState) => state.cart.products);
    let totalPrice = cartProducts?.reduce((a, product) => {
        if(product?.sasia === 0) {
            return a
        } else {
            return (
                a +
                (user?.role === 'shumice'
                    ? product?.product?.priceShumice
                    : product?.product?.pricePakice) *
                product.quantity
            );
        }

    }, 0);

    return (
        <div className="border p-3 p-md-4">
            <div className="heading_s1 mb-3">
                <h6>Cart Totals</h6>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="cart_total_label">Cart Subtotal</td>
                            <td className="cart_total_amount">
                                {cartProducts.reduce((a, product) => {
                                    if (product?.sasia && product?.sasia > 0) {
                                        return (
                                            a +
                                            (user?.role === 'shumice'
                                                ? product?.product?.priceShumice
                                                : product?.product?.pricePakice) *
                                            product.quantity
                                        );
                                    }
                                    return a;
                                }, 0).toFixed(2)}€
                            </td>
                        </tr>
                        <tr>
                            <td className="cart_total_label">Shipping</td>
                            <td className="cart_total_amount">Free Shipping</td>
                        </tr>
                        <tr>
                            <td className="cart_total_label">Total</td>
                            <td className="cart_total_amount">
                                {cartProducts.reduce((a, product) =>
                                    a + (product?.sasia && product?.sasia > 0 ? (user?.role === 'shumice' ? product?.product?.priceShumice : product?.product?.pricePakice) * product.quantity : 0), 0)
                                    .toFixed(2)}€
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {cartProducts?.length > 0 && totalPrice !== 0 && <Link to="/checkout" className='btn btn-fill-out'>Proceed To Checkout</Link>}
        </div>
    )
}

export default CartTotals;
