import { useEffect, useState } from 'react'
import EditIcon from '../../../images/edit.svg';
import DeleteIcon from '../../../images/delete-icon.svg';
import { getBanners3, deleteBanner3 } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Loader from '../../../Loader';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import DangerAlert from '../../../helpers/DangerAlert';
import { Link } from 'react-router-dom';

const ManageBanner3 = () => {
    const [show, setShow] = useState(false);
    const [bannerId, setBannerId] = useState('');
    const dispatch = useDispatch();
    const { isDeleted, loading, banners, error } = useSelector((state: RootState) => state.banner3);
    const { user } = useSelector((state: RootState) => state.user);

    const handleDelete = (id: any) => {
        setShow(true);
        setBannerId(id);
    }

    useEffect(() => {
        getBanners3(dispatch);
    }, [isDeleted, user, dispatch]);

    if (error) return (<DangerAlert msg={error} />)

    return (
        <div>
            {loading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteBanner3} id={bannerId} dispatch={dispatch} user={user} />

            <div className='general-table-wrapper'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Image</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banners && banners?.map((banner: any) => (
                                <tr key={banner?._id}>
                                    <td data-label="Title">{banner?.title}</td>
                                    <td data-label="Title">{banner?.subTitle}</td>
                                    <td data-label="Image">
                                        <img className="img img-responsive img-thumbnail" src={`${banner?.image}`} alt="" style={{ width: '160px', height: 'auto' }} />
                                    </td>
                                    <td data-label="Actions">
                                        <div className='d-flex flex-wrap gap-3'>
                                            <Link to={`/app/admin/add-banner3/${banner?._id}`} className='edit-table-btn'>
                                                <img src={EditIcon} alt="edit icon" height="12" className='me-1' />
                                                Edit
                                            </Link>
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(banner?._id)}>
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

export default ManageBanner3;
