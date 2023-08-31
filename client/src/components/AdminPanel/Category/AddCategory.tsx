import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from '../../../helpers/LoadingButton';
import { getSubCategories } from '../../../redux/apiCalls';
import { handleOnChange } from '../../../helpers/handleChange';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import Select from 'react-select';


interface IData {
    name: string;
    subCategories: any;
}

export function AddCategory() {
    const [formData, setFormData] = useState<IData>({
        name: '',
        subCategories: []
    });
    const [errors, setErrors] = useState({} as IData);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.user);
    const { subCategories } = useSelector((state: RootState) => state.subCategory);

    const validateForm = (data: IData) => {
        const errors = {} as IData;

        if (!data?.name) {
            errors.name = 'Category name is required';
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
                axios.put(`${apiUrl}/categories/${id}`, formData, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        navigate('/app/admin/manage-categories');
                        setIsLoading(false);
                        toast.success('Category Updated Successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }).catch((err: any) => {
                    console.log('error', err);
                    setIsLoading(false);
                });;
            } else {
                axios.post(`${apiUrl}/categories`, formData, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        setFormData({ name: '', subCategories: [] });
                        setIsLoading(false);
                        toast.success('Category Created Successfully!', {
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
            axios.get(`${apiUrl}/categories/${id}`).then((res: any) => {
                setFormData(res.data);
            })
        }
        getSubCategories(dispatch);
    }, [id, dispatch]);

    return (
        <div className='add_category'>
            <div className="container_fluid">
                <div>
                    <h4 className="title">Add Category</h4>
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
                                placeholder='Category Name'
                            />
                            {
                                errors?.name && <div className="heading_error">
                                    <p className='text-left mb-0'>{errors?.name}</p>
                                </div>
                            }
                        </div>

                        <div className="col-md-6">
                            <Select
                                name="subCategories"
                                value={formData?.subCategories.map((category: any) => ({ value: category, label: category }))}
                                onChange={selectedOptions => {
                                    const selectedSubCategories = selectedOptions.map(option => option.value);
                                    setFormData({ ...formData, subCategories: selectedSubCategories });
                                }}
                                options={subCategories?.map(subCategory => ({ value: subCategory?.name, label: subCategory?.name }))}
                                isMulti
                            />

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