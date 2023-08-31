import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { getCategories, getColors, getSubCategories } from '../../../redux/apiCalls';
import { RootState } from '../../../redux/store';
import FileUploadImg from '../../../images/file-upload.svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../../constants/backendUrl';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { productSlice } from '../../../redux/productRedux';
import LoadingButton from '../../../helpers/LoadingButton';
import NumberInput from '../../../helpers/NumberInput';

import './style.css';

interface FormData {
    title: string;
    category: string;
    subCategory: string;
    priceShumice: string;
    pricePakice: string;
    description: string;
    images: any;
    sasia: string;
    // images: File[];
}

const AddProduct = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        subCategory: '',
        priceShumice: '',
        pricePakice: '',
        description: '',
        images: [],
        sasia: ''
    });
    const [errors, setErrors] = useState({} as FormData);
    const [loadingButton, setLoadingButton] = useState(false);
    const [inputFileChange, setInputFileChange] = useState(false);
    const [filesSelected, setFilesSelected] = useState([] as any);

    const { categories } = useSelector((state: RootState) => state.category);
    const { subCategories } = useSelector((state: RootState) => state.subCategory);
    const { user } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleFilesChange = (e: any) => {
        const files = [...e.target.files];
        const urls = Array.from(files).map((file: any) => URL.createObjectURL(file));
        setFormData({ ...formData, images: urls });
        setFilesSelected(files);
        e.target.value = '';
        setInputFileChange(!inputFileChange);
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const handleDeleteFile = (index: any) => {
        let newFiles = [...formData?.images];
        let filesNew = [...filesSelected];
        newFiles.splice(index, 1);
        filesNew.splice(index, 1);
        setFilesSelected(filesNew);
        setFormData({ ...formData, images: newFiles });
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = (data: FormData) => {
        const errors = {} as FormData;

        if (!data?.title) {
            errors.title = 'Title is required';
        }

        if (!data?.category) {
            errors.category = 'Category is required';
        }

        if (!data?.subCategory) {
            errors.subCategory = 'Sub Category is required';
        }

        if (!data?.priceShumice) {
            errors.priceShumice = 'Price Shumice is required';
        }

        if (!data?.pricePakice) {
            errors.pricePakice = 'Price Pakice is required';
        }

        if (!data?.description) {
            errors.description = 'Description is required';
        }

        if (!data?.sasia) {
            errors.sasia = 'Sasia is required';
        }

        if (data?.images?.length === 0 || data?.images === null) {
            errors.images = 'Images are required';
        }

        return errors;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = validateForm(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setLoadingButton(true);

            const formDataObj = new FormData();
            formDataObj.append('title', formData.title);
            formDataObj.append('category', formData.category);
            formDataObj.append('subCategory', formData.subCategory);
            formDataObj.append('priceShumice', formData.priceShumice);
            formDataObj.append('pricePakice', formData.pricePakice);
            formData.images.forEach((image: any) => {
                formDataObj.append('images', image);
            });
            filesSelected.forEach((image: any) => {
                formDataObj.append('images', image);
            });
            formDataObj.append('description', formData.description);
            formDataObj.append('sasia', formData.sasia);

            if (id) {
                axios.put(`${apiUrl}/products/${id}`, formDataObj, {
                    headers: { Authorization: 'Bearer ' + user?.token }
                }).then((res: any) => {
                    if (res.status === 200) {
                        toast.success("Product updated successfully.");
                        setLoadingButton(false);
                        dispatch(productSlice.actions.clearState()); //e bojm clear state-n
                        navigate('/app/admin/manage-products');
                    }
                }).catch((err: any) => {
                    console.log(err);
                });
            } else {
                axios.post(`${apiUrl}/products`, formDataObj, {
                    headers: { Authorization: 'Bearer ' + user?.token }
                }).then((res: any) => {
                    console.log(res);
                    if (res.status === 200) {
                        toast.success("Product created successfully.");
                        setLoadingButton(false);
                        setFormData({ title: '', category: '', subCategory: '', priceShumice: '', pricePakice: '', images: null, description: '', sasia: '' });
                        setFilesSelected(null);
                        dispatch(productSlice.actions.clearState()); //e bojm clear state-n
                    }
                }).catch((err: any) => {
                    console.log(err);
                });

            }
        }
    };

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/products/${id}`).then((res: any) => {
                const { title, category, subCategory, priceShumice, pricePakice, description, images, sasia } = res.data.product;
                setFormData({
                    title: title,
                    category: category,
                    subCategory: subCategory,
                    priceShumice: priceShumice,
                    pricePakice: pricePakice,
                    description: description,
                    images: images,
                    sasia: sasia
                });
            })
        } else {
            setFormData({ title: '', category: '', subCategory: '', priceShumice: '', pricePakice: '', images: null, description: '', sasia: '' });
        }
        getColors(dispatch, user);
        getCategories(dispatch);
        getSubCategories(dispatch);
    }, [id, dispatch, user]);

    return (
        <div>
            <div className="add_product">
                <div className="container-fluid">
                    <div>
                        <h4 className="title">Add Product</h4>
                        <span className='mb-3 d-block text-danger'>Please select max 6 photos for product</span>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name='title'
                                        className='form-control'
                                        placeholder='Product Title *'
                                        value={formData?.title}
                                        onChange={handleOnChange}
                                    />
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.title}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <select name="category" value={formData?.category} onChange={handleOnChange} className='form-control'>
                                        <option value="" disabled>Product Category *</option>
                                        {
                                            categories?.map((category) => (
                                                <option key={category?._id}>{category?.name}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.category}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <select name="subCategory" value={formData?.subCategory} onChange={handleOnChange} className='form-control'>
                                        <option value="" disabled>Product Sub Category *</option>
                                        {
                                            subCategories?.map((subCategory, index) => (
                                                <option key={index}>{subCategory?.name}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.subCategory}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="priceShumice"
                                        className='form-control'
                                        placeholder='Product Price Shumice *'
                                        value={formData?.priceShumice}
                                        onChange={handleOnChange}
                                    />
                                    {
                                        errors?.priceShumice && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.priceShumice}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="pricePakice"
                                        className='form-control'
                                        placeholder='Product Price Pakice *'
                                        value={formData?.pricePakice}
                                        onChange={handleOnChange}
                                    />
                                    {
                                        errors?.pricePakice && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.pricePakice}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea
                                        name="description"
                                        className='form-control'
                                        placeholder='Product Description *'
                                        value={formData?.description}
                                        onChange={handleOnChange}
                                    />
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.description}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="file_drop_area">
                                        <div className='position-relative'>
                                            <div className="dz_message p-4">
                                                <div className="upload_image_custom">
                                                    <img src={FileUploadImg} alt="" />
                                                </div>
                                                <p className='text-center'>Click here to browse</p>
                                            </div>
                                            <input name="images" type="file" className='file_input' multiple onChange={handleFilesChange} />
                                        </div>

                                        <div className="preview_images">
                                            {
                                                id ? formData?.images?.length > 0 && formData?.images?.map((url: any, index: number) => (
                                                    <div className="image_preview" key={index}>
                                                        <div className="dz_image">
                                                            {/* <img src={`${inputFileChange ? `${url}` : `${apiUrl}/images/${url}`}`} alt="" /> */}
                                                            <img src={`${url?.includes('.') ? `${apiUrl}/images/${url}` : `${url}`}`} alt="" />
                                                        </div>
                                                        <div className="image_details">
                                                            <div className="filename">
                                                                <span>{url.split('-')[1]}</span>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="remove_file" title="Remove File" onClick={() => handleDeleteFile(index)}>Remove File</button>
                                                    </div>
                                                )) :
                                                    filesSelected?.map((file: any, index: any) => (
                                                        <div className="image_preview" key={index}>
                                                            <div className="dz_image">
                                                                <img src={URL.createObjectURL(file)} alt="" />
                                                            </div>
                                                            <div className="image_details">
                                                                <div className="filename">
                                                                    <span>{file?.name}</span>
                                                                </div>
                                                            </div>
                                                            <button type='button' className='remove_file' title='Remove File' onClick={() => handleDeleteFile(index)}>Remove FIle</button>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.images}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <NumberInput
                                        name='sasia'
                                        className='form-control'
                                        placeholder='Sasia e produktit'
                                        value={formData?.sasia}
                                        onChange={handleOnChange}
                                    />
                                    <div className="heading_error">
                                        <p className='text-left mb-0'>{errors?.sasia}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <button className='btn submit_btn mt-5'>
                                    {loadingButton && <LoadingButton />}
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;