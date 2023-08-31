import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from '../../../helpers/LoadingButton';
import { handleOnChange } from '../../../helpers/handleChange';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface IData {
    name: string;
}

export function AddSubCategory() {
    const [formData, setFormData] = useState<IData>({
        name: ''
    });
    const [errors, setErrors] = useState({} as IData);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.user);

    const validateForm = (data: IData) => {
        const errors = {} as IData;

        if (!data?.name) {
            errors.name = 'Sub Category name is required';
        }

        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            if (id) {
                axios.put(`${apiUrl}/sub-categories/${id}`, formData, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        navigate('/app/admin/manage-sub-categories');
                        setIsLoading(false);
                        toast.success('Sub Category Updated Successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }).catch(err => {
                    console.log('error', err);
                    setIsLoading(false);
                });;
            } else {
                axios.post(`${apiUrl}/sub-categories`, formData, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        setFormData({ name: '' });
                        setIsLoading(false);
                        toast.success('Sub Category Created Successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }).catch(err => {
                    console.log('error', err);
                    setIsLoading(false);
                });;
            }
        }
    }

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/sub-categories/${id}`).then(res => {
                setFormData(res.data);
            })
        }
    }, [id]);

    return (
        <div className='add_category'>
            <div className="container_fluid">
                <div>
                    <h4 className="title">Add Sub Category</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                name="name"
                                type="text"
                                value={formData?.name}
                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                className="form-control mb-3"
                                placeholder='Sub Category Name'
                            />
                            {
                                errors?.name && <div className="heading_error">
                                    <p className='text-left mb-0'>{errors?.name}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <button className='btn submit_btn w-auto mt-5' disabled={isLoading}>
                        {isLoading && <LoadingButton />}
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}