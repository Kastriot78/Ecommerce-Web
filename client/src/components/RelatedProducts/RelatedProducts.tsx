import Product from '../Products/Product';
import SkeletonPost from '../Skeletons/SkeletonPost';

const RelatedProducts = ({ relatedProducts, loading }: any) => {
    if (loading) {
        return (
            <div className='container'>
                <div className="row">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className='col-lg-3' key={i}>
                            <SkeletonPost />
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <>
            {
                relatedProducts?.length > 0 && <div className="container p-0">
                    <div>
                        <h3 className='related_products_title pb-4'>Produkte të ngjashme:</h3>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="tab-content">
                                <div className="row shop_container">
                                    {
                                        relatedProducts?.map((product: any) => (
                                            <div className="col-lg-3 col-md-4 col-6 d-flex" key={product?._id}>
                                                <Product data={product} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RelatedProducts;