export interface UserData {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
    company?: string;
    phone?: any;
}

export interface ContactData {
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
}

export interface User {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

export interface Product {
    _id: string;
    title: string;
    category: string;
    price: number;
    pricePakice: number;
    priceShumice: number;
    discountPrice: number;
    images: Array<string>;
    description: string;
    sasia: number;
}