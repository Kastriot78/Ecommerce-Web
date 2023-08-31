import { useEffect, useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import ProductDetails from './ProductDetails';
import ProductView from './ProductView';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../constants/backendUrl';
import { ProductSkeleton } from './ProductSkeleton';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import './style.css';

const ProductDetail = () => {
  const [product, setProduct] = useState({} as any);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${apiUrl}/products/${id}`).then(res => {
        setProduct(res?.data?.product);
      }).catch(err => {
        console.log(err);
      });
    } else {
      setProduct({});
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setRelatedProductsLoading(true);
      axios.get(`${apiUrl}/products/by-category/${product?.category}`).then(res => {
        setRelatedProducts(res?.data?.products);
        setRelatedProductsLoading(false);
      }).catch(err => {
        console.log(err);
      });
    }
  }, [product]);

  return (
    <div>
      <BreadCrumb title="Product Detail" />

      <div className="section">
        <div className="container">
          <div className="row">
            {
              Object.keys(product).length > 0 ? <>
                <div className="col-md-6 mb-4 mb-md-0">
                  <ProductView product={product} />
                </div>

                <div className="col-md-6">
                  <ProductDetails product={product} />
                </div>
              </> :
                <div className="col-md-12">
                  <ProductSkeleton />
                </div>
            }

            <div className='relatedProducts mt-4'>
              <RelatedProducts relatedProducts={relatedProducts} product={product} loading={relatedProductsLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;