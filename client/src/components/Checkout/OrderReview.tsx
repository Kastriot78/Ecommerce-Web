const OrderReview: React.FC<any> = ({ handleSubmit, user, cartProducts }) => {
    let totalPrice = cartProducts?.reduce((a: any, product: any) => {
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
        <div className="order_review">
            <div className="heading_s1">
                <h4>Your Orders</h4>
            </div>
            <div className="table-responsive order_table">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartProducts?.map((product: any) => {
                                return (
                                    <tr key={product?.product._id}>
                                        <td>
                                            {product?.product?.title}
                                            <span className="product-qty"> x {product?.quantity} <span>{product?.sasia === 0 && <span className="badge bg-red"> Out of Stock</span>}</span></span>
                                        </td>
                                        <td>
                                            {(user?.role === 'shumice' ? product?.product?.priceShumice : product?.product?.pricePakice * product?.quantity)?.toFixed(2)}€
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td>
                                {cartProducts.reduce((a: any, product: any) => {
                                    if (product?.sasia === 0) {
                                        return a;
                                    }
                                    const price = user?.role === 'shumice' ? product?.product?.priceShumice : product?.product?.pricePakice;
                                    return a + price * product.quantity;
                                }, 0).toFixed(2)}€
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {
                cartProducts?.length > 0 && totalPrice !== 0 && <button type='button' className='w-100 btn btn-fill-line' onClick={handleSubmit}>Place Order</button>
            }
        </div>
    )
}

export default OrderReview;