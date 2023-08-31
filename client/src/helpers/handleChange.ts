
export const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any>, formData: any, setFormData: any, errors: any, setErrors: Function) => {
    const { name, value } = event.target;
  
    if (name === 'subCategories') {
      const options = Array.from(event.target.options); // Convert the options to an array
      const selectedSubCategories = options
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);
      setFormData({ ...formData, [name]: selectedSubCategories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  
    setErrors({ ...errors, [name]: '' });
  };