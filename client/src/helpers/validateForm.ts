import { UserData } from "../types/types";

export const validateForm = (data: UserData) => {
    const errors = {} as UserData;
    if (data.hasOwnProperty('name') && !data.name) {
        errors.name = "Name is required";
    }
    if (data.hasOwnProperty('lastName') && !data.lastName) {
        errors.lastName = "Last name is required";
    };
    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!data.password) errors.password = "Password is required";

    if (data.hasOwnProperty('company') && !data.company) errors.company = 'Company is required';

    if (data.hasOwnProperty('phone') && !data.phone) errors.phone = 'Phone is required';

    return errors;
};
