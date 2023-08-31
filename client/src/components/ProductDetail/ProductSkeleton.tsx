export function ProductSkeleton() {
    return (
        <div className='product-skeleton'>
            <div className="product-source">
                <div className="lines">
                    <div className="thumb pulse"></div>
                </div>
            </div>
            <div className="product-detail">
                <div className="line-breadcrumb pulse"></div>
                <div className="line-breadcrumb pulse"></div>
                <div className="line-product-title pulse"></div>
                <div className="line-product-cost pulse"></div>
            </div>
        </div>
    )
}