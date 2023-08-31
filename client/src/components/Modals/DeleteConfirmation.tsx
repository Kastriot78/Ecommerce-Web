import { User } from "../../types/types";

type Props = {
    show: boolean,
    setShow: Function,
    deleteFunc: Function,
    id: string,
    dispatch: Function,
    user?: User
}

const DeleteConfirmation = ({ show, setShow, deleteFunc, id, dispatch, user }: Props) => {
    const handleDelete = () => {
        deleteFunc(id, dispatch, user);
        setShow(false);
    }
    
    return (
        <div className={`modal fade delete-confirmation-modal ${show ? 'show' : ''}`}>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header flex-column">
                        <div className="icon-box">
                            <i>
                                <svg x="0px" y="0px" width="17px" height="16px" viewBox="-0.26 -0.512 17 16" enableBackground="new -0.26 -0.512 17 16" xmlSpace="preserve">
                                    <line stroke="currentColor" strokeMiterlimit="10" x2="0.583" y2="14.593" x1="15.895" y1="0.353"></line>
                                    <line stroke="currentColor" strokeMiterlimit="10" x2="15.896" y2="14.593" x1="0.584" y1="0.353"></line>
                                </svg>
                            </i>
                        </div>
                        <h4 className="modal-title w-100">Are you sure?</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => setShow(false)}>
                            <svg x="0px" y="0px" width="17px" height="16px" viewBox="-0.26 -0.512 17 16" enableBackground="new -0.26 -0.512 17 16" xmlSpace="preserve">
                                <line stroke="currentColor" strokeMiterlimit="10" x2="0.583" y2="14.593" x1="15.895" y1="0.353"></line>
                                <line stroke="currentColor" strokeMiterlimit="10" x2="15.896" y2="14.593" x1="0.584" y1="0.353"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Do you really want to delete this record? This process cannot be undone.</p>
                    </div>
                    <div className="modal-footer justify-content-center gap-3">
                        <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation;
