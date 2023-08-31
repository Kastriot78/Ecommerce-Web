import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from '../../../helpers/LoadingButton';
import { handleOnChange } from '../../../helpers/handleChange';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ImagePreview } from '../../../helpers/ImagePreview';
import FileUploadImg from '../../../images/file-upload.svg';

interface IData {
    image: any;
    title: string;
}

export function AddBanner2() {
    const [formData, setFormData] = useState<IData>({
        image: '',
        title: '',
    });
    const [fileSelected, setFileSelected] = useState('');
    const [inputFileChange, setInputFileChange] = useState(false);
    const [errors, setErrors] = useState({} as IData);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.user);

    const handleFileChange = (e: any) => {
        setFormData({ ...formData, image: e.target.files[0] });
        setFileSelected(e.target.files[0]);
        setInputFileChange(!inputFileChange);
        e.target.value = '';
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const validateForm = (data: IData) => {
        const errors = {} as IData;

        if (!data?.image) {
            errors.image = 'Image is required';
        }
        if (!data?.title) {
            errors.title = 'Title is required';
        }

        return errors;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            const formDataObj = new FormData();
            formDataObj.append('title', formData?.title);
            formDataObj.append('image', formData?.image);

            if (id) {
                axios.put(`${apiUrl}/banner2/${id}`, formDataObj, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        navigate('/app/admin/manage-banners2');
                        setIsLoading(false);
                        toast.success('Banner Updated Successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                });
            } else {
                axios.post(`${apiUrl}/banner2`, formDataObj, { headers: { Authorization: 'Bearer ' + user?.token } }).then(res => {
                    if (res.data.success) {
                        setFormData({ image: null, title: '' });
                        setFileSelected('');
                        setIsLoading(false);
                        toast.success('Banner Created Successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }).catch((err: any) => {
                    console.log('error', err);
                    setIsLoading(false);
                });
            }
        }
    }

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/banner2/${id}`).then((res: any) => {
                setFormData(res.data);
            })
        }
    }, [id]);

    return (
        <div className='add_category'>
            <div className="container_fluid">
                <div>
                    <h4 className="title">Add Banner</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className="row">
                        <div>
                            <span className='mb-3 d-block text-danger'>Please select image size: 540x300</span>
                            <ImagePreview FileUploadImg={FileUploadImg} id={id} formData={formData} handleFileChange={handleFileChange} fileSelected={fileSelected} inputFileChange={inputFileChange} />
                            {
                                errors?.image && <div className="heading_error">
                                    <p className='text-left mb-0'>{errors?.image}</p>
                                </div>
                            }
                        </div>


                        <div className="col-md-6">
                            <input
                                name="title"
                                type="text"
                                value={formData?.title}
                                onChange={(e) => handleOnChange(e, formData, setFormData, errors, setErrors)}
                                className="form-control mb-3"
                                placeholder='Title'
                            />
                            {
                                errors?.title && <div className="heading_error">
                                    <p className='text-left mb-0'>{errors?.title}</p>
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