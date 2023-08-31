export const ImagePreview = ({ FileUploadImg, id, formData, handleFileChange, fileSelected, inputFileChange }: any) => {
    return (
        <div className="form-group">
            <div className="file_drop_area">
                <div className='position-relative'>
                    <div className="dz_message p-4">
                        <div className="upload_image_custom">
                            <img src={FileUploadImg} alt="" />
                        </div>
                        <p className='text-center'>Click here to browse</p>
                    </div>
                    <input name="image" type="file" className='file_input' onChange={handleFileChange} />
                </div>

                <div className="preview_images">
                    {
                        id ? formData?.image &&
                            <div className="image_preview">
                                <div className="dz_image">
                                    <img src={`${formData?.image?.startsWith?.('http') ? `${formData?.image}` : `${URL?.createObjectURL(formData?.image)}`}`} alt="" />
                                </div>
                                <div className="image_details">
                                    <div className="filename">
                                        <span>{formData?.image?.name ? formData?.image?.name : formData?.image.split('-')[1]}</span>
                                    </div>
                                </div>
                            </div>
                            :
                            fileSelected && <div className="image_preview">
                                <div className="dz_image">
                                    <img src={URL.createObjectURL(fileSelected)} alt="" />
                                </div>
                                <div className="image_details">
                                    <div className="filename">
                                        <span>{fileSelected?.name}</span>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}