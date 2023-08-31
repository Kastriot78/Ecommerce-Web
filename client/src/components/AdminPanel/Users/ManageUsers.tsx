import { useState, useEffect } from 'react';
import Loader from '../../../Loader';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import { getAllUsers, deleteUser, approveUserAcocunt } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '../../../images/edit.svg';

import DeleteIcon from '../../../images/delete-icon.svg';
import { RootState } from '../../../redux/store';
import DangerAlert from '../../../helpers/DangerAlert';
import { toast } from 'react-toastify';
import { userSlice } from '../../../redux/userRedux';

import '../style.css';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState('');

    const { loading, isDeleted, users, error, errorMsg, isApprovedSuccess, user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleDelete = (id: any) => {
        setShow(true);
        setUserId(id);
    }

    const handleApproveUserAccount = (id: any) => {
        approveUserAcocunt(dispatch, id, user);
    }

    useEffect(() => {
        getAllUsers(dispatch, user);
        if (isApprovedSuccess) {
            toast.success("Llogaria u aprovua.");
        }
        
        return () => {
            dispatch(userSlice?.actions?.clearApproveAccountUser());
        }
    }, [isDeleted, user, isApprovedSuccess, dispatch]);

    if (error) return <DangerAlert msg={errorMsg} />

    return (
        <div>
            {loading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteUser} id={userId} dispatch={dispatch} user={user} />

            <div className='general-table-wrapper'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Admin</th>
                            <th>Aprovuar</th>
                            <th>Aprovo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users?.map((user) => (
                                <tr key={user?._id}>
                                    <td data-label="Name">{user?.name}</td>
                                    <td data-label="Last Name">{user?.lastName}</td>
                                    <td data-label="Email">{user?.email}</td>
                                    <td data-label="Company">{user?.company}</td>
                                    <td data-label="Phone">{user?.phone}</td>
                                    <td data-label="Role">{user?.role}</td>
                                    <td data-label="Admin">{user?.isAdmin ? 'Po' : 'Jo'}</td>
                                    <td data-label="Approved">{user?.approved ? 'Po' : 'Jo'}</td>
                                    <td data-label="Aprovo">
                                        {user?.approved ? <span>Aprovuar</span> : <button className='approve-btn' onClick={() => handleApproveUserAccount(user?._id)}>Aprovo llogarinë</button>}
                                    </td>
                                    <td data-label="Actions">
                                        <div className='d-flex flex-wrap gap-2 me-3'>
                                            <Link to={`/app/admin/edit-user/${user?._id}`} className='edit-table-btn'>
                                                <img src={EditIcon} alt="edit icon" height="12" className='me-1' />
                                                Edit
                                            </Link> 
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(user?._id)}>
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

export default ManageUsers;
