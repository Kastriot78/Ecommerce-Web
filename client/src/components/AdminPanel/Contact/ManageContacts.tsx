import React, { useEffect, useState } from 'react';
import DeleteIcon from '../../../images/delete-icon.svg';
import { getContacts, deleteContact } from '../../../redux/apiCalls';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import Loader from '../../../Loader';
import DeleteConfirmation from '../../Modals/DeleteConfirmation';
import DangerAlert from '../../../helpers/DangerAlert';

const ManageContacts = () => {
    const [show, setShow] = useState(false);
    const [contactId, setContactId] = useState('');
    const dispatch = useDispatch();
    const { isLoading, contacts, isDeleted, error, errorMsg } = useSelector((state: RootState) => state.contact);
    const { user } = useSelector((state: RootState) => state.user);

    const handleDelete = (id: any) => {
        setShow(true);
        setContactId(id);
    }

    useEffect(() => {
        getContacts(dispatch, user);
    }, [isDeleted, user, dispatch]);

    if(error) return <DangerAlert msg={errorMsg} />

    return (
        <div>
            {isLoading && <Loader />}
            <DeleteConfirmation show={show} setShow={setShow} deleteFunc={deleteContact} id={contactId} dispatch={dispatch} user={user} />
            <div className='general-table-wrapper'>
                <table className='general-table'>
                    <thead>
                        <tr className="table100-head">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts && contacts?.map((contact) => (
                                <tr key={contact?._id}>
                                    <td data-label="Name">{contact?.name}</td>
                                    <td data-label="Email">{contact?.email}</td>
                                    <td data-label="Phone">{contact?.phoneNumber}</td>
                                    <td data-label="Subject">{contact?.subject}</td>
                                    <td data-label="Message">{contact?.message}</td>
                                    <td data-label="Actions">
                                        <div className='d-flex flex-wrap gap-3 me-3'>
                                            <button type='button' className='remove-table-btn' onClick={() => handleDelete(contact?._id)}>
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

export default ManageContacts;
