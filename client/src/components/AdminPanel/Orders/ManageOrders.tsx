import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../../../redux/apiCalls';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import DeleteIcon from '../../../images/delete-icon.svg';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import Loader from '../../../Loader';
import { apiUrl } from '../../../constants/backendUrl';
import DangerAlert from '../../../helpers/DangerAlert';
import { formatDate } from '../../../helpers/formatDate';

const ManageOrders = () => {
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState('');
    const { orders, isLoading, isDeleted, error } = useSelector((state: RootState) => state.order);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleDelete = (id: any) => {
        setShow(true);
        setProductId(id);
    }

    useEffect(() => {
        getOrders(dispatch, user);
    }, [isDeleted, user, dispatch]);

    if (error) return <DangerAlert msg={error} />

    return (
        <div>
            {isLoading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteOrder} id={productId} dispatch={dispatch} user={user} />
            <div className='product-table-wrapper custom-scrollbar-vertical'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>User</th>
                            <th>Address</th>
                            <th>email</th>
                            <th>Phone</th>
                            <th>Product</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders && orders?.map((order) => (
                                <tr key={order?._id}>
                                    <td data-label="User">{order?.firstName} {order?.lastName}</td>
                                    <td data-label="Address">{order?.address}</td>
                                    <td data-label="Email">{order?.email}</td>
                                    <td data-label="Phone">{order?.phone}</td>
                                    <td data-label="Images">
                                        <div className='d-flex align-items-center'>
                                            {
                                                order?.orderItems?.map((item: any) => <div key={item?.product?._id}>
                                                    <img className="img img-responsive img-thumbnail mx-1 my-1" src={`${apiUrl}/images/${item?.product.images[0]}`} alt="" style={{ maxWidth: '100px' }} />
                                                </div>)
                                            }
                                        </div>
                                    </td>
                                    <td data-label="Date">
                                        <span style={{width: '191px', display: 'block'}}>{formatDate(order?.createdAt)}</span>
                                    </td>
                                    <td data-label="Actions" className='actions'>
                                        <div className=''>
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(order?._id)}>
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

export default ManageOrders;
