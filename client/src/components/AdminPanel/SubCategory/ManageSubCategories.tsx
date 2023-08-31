import { useEffect, useState } from 'react'
import EditIcon from '../../../images/edit.svg';
import DeleteIcon from '../../../images/delete-icon.svg';
import { getSubCategories, deleteSubCategory } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Loader from '../../../Loader';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import DangerAlert from '../../../helpers/DangerAlert';
import { Link } from 'react-router-dom';

const ManageSubCategories = () => {
    const [show, setShow] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const dispatch = useDispatch();
    const { isDeleted, loading, subCategories, error } = useSelector((state: RootState) => state.subCategory);
    const { user } = useSelector((state: RootState) => state.user);

    const handleDelete = (id: any) => {
        setShow(true);
        setCategoryId(id);
    }

    useEffect(() => {
        getSubCategories(dispatch);
    }, [isDeleted, user, dispatch]);

    if (error) return ( <DangerAlert msg={error} /> )

    return (
        <div>
            {loading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteSubCategory} id={categoryId} dispatch={dispatch} user={user} />

            <div className='general-table-wrapper'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>Sub Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subCategories && subCategories?.map((category) => (
                                <tr key={category?._id}>
                                    <td data-label="Sub Category">{category?.name}</td>
                                    <td data-label="Actions">
                                        <div className='d-flex flex-wrap gap-2'>
                                            <Link to={`/app/admin/add-sub-category/${category?._id}`} className='edit-table-btn'>
                                                <img src={EditIcon} alt="edit icon" height="12" className='me-1' />
                                                Edit
                                            </Link>
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(category?._id)}>
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

export default ManageSubCategories;