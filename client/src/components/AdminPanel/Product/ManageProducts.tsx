import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../redux/apiCalls';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import DeleteIcon from '../../../images/delete-icon.svg';
import EditIcon from '../../../images/edit.svg';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import Loader from '../../../Loader';
import { apiUrl } from '../../../constants/backendUrl';
import DangerAlert from '../../../helpers/DangerAlert';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState('');
    const { products, isLoading, isDeleted, error, errorMsg } = useSelector((state: RootState) => state.product);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleDelete = (id: any) => {
        setShow(true);
        setProductId(id);
    }

    useEffect(() => {
        getProducts(dispatch);
    }, [isDeleted, user, dispatch]);

    if (error) return <DangerAlert msg={errorMsg} />

    return (
        <div>
            {isLoading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteProduct} id={productId} dispatch={dispatch} user={user} />
            <div className='product-table-wrapper custom-scrollbar-vertical'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Cmimi Me Shumice</th>
                            <th>Cmimi Me Pakice</th>
                            <th>InStock</th>
                            <th>Images</th>
                            <th>Sasia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products?.map((product) => (
                                <tr key={product?._id}>
                                    <td data-label="Category">{product?.category}</td>
                                    <td data-label="Sub Category">{product?.subCategory}</td>
                                    <td data-label="Price Shumice">{product?.priceShumice}€</td>
                                    <td data-label="Price Pakice">{product?.pricePakice}€</td>
                                    <td data-label="InStock">{product?.sasia > 0 ? 'Po' : 'Jo'}</td>
                                    <td data-label="Images">
                                        <div>
                                            <img className="img img-responsive img-thumbnail" src={`${apiUrl}/images/${product.images[0]}`} alt="" style={{ width: '160px', height: 'auto' }} />
                                        </div>
                                    </td>
                                    <td>{product?.sasia}</td>
                                    <td data-label="Actions" className='actions'>
                                        <div className='d-flex gap-3'>
                                            <Link to={`/app/admin/add-product/${product?._id}`} className='edit-table-btn'>
                                                <img src={EditIcon} alt="edit icon" height="12" className='me-1' />
                                                Edit
                                            </Link>
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(product?._id)}>
                                                <img src={DeleteIcon} alt="remove icon" className='me-1' />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageProducts;
