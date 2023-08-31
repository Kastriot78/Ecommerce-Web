import {
    getColorsFailure,
    getColorsStart,
    getColorsSuccess,
    deleteColorStart,
    deleteColorSuccess,
    deleteColorFailure,
    updateColorStart,
    updateColorSuccess,
    updateColorFailure,
    addColorStart,
    addColorSuccess,
    addColorFailure
} from './colorRedux';

import { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure, deleteCategoryStart, deleteCategorySuccess, deleteCategoryFailure } from './categoryRedux';

import {
    loginStart,
    loginSuccess,
    loginFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    approveUserAccountStart,
    approveUserAccountSuccess,
    approveUserAccountFailure
} from './userRedux';

import {
    getContactsStart,
    getContactsSuccess,
    getContactsFailure,
    deleteContactStart,
    deleteContactSuccess,
    deleteContactFailure
} from './contactRedux';

import {
    getSubscribersStart,
    getSubscribersSuccess,
    getSubscribersFailure,
    deleteSubscriberStart,
    deleteSubscriberSuccess,
    deleteSubscriberFailure
} from './subscribeRedux';

import {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    getProductsByCategoryStart,
    getProductsByCategorySuccess,
    getProductsByCategoryFailure
} from './productRedux';

import { getOrdersStart, getOrdersSuccess, getOrdersFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure } from './ordersRedux';
import { getBanners1Start, getBanners1Success, getBanners1Failure, deleteBanner1Start, deleteBanner1Success, deleteBanner1Failure } from './banner1Redux';
import { getBanners2Start, getBanners2Success, getBanners2Failure, deleteBanner2Start, deleteBanner2Success, deleteBanner2Failure } from './banner2Redux';
import { getBanners3Start, getBanners3Success, getBanners3Failure, deleteBanner3Start, deleteBanner3Success, deleteBanner3Failure } from './banner3Redux';
import {getSubCategoriesStart, getSubCategoriesSuccess, getSubCategoriesFailure, deleteSubCategoryStart, deleteSubCategorySuccess, deleteSubCategoryFailure} from './subCategoryRedux';

import axios from 'axios';
import {
    apiUrl
} from '../constants/backendUrl';

import {updateWishlistQuantity} from './wishlistRedux';
import { updateCartQuantity } from './shoppingCartRedux';


// user
export const login = async (email, password, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${apiUrl}/users/login`, {
            email,
            password
        });
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure(err?.response?.data?.error));
    }
}

export const register = async (user, dispatch) => {
    dispatch(signUpStart());
    try {
        const res = await axios.post(`${apiUrl}/users/register`, user);
        dispatch(signUpSuccess(res.data));
    } catch (err) {
        dispatch(signUpFailure(err?.response?.data?.error));
    }
}

export const getAllUsers = async (dispatch, user) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(`${apiUrl}/users`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(getUsersSuccess(res?.data));
    } catch (err) {  
        dispatch(getUsersFailure(err?.response?.data?.msg));
    }
}

export const deleteUser = async (id, dispatch, user) => {
    dispatch(deleteUserStart());
    try {
        const res = await axios.delete(`${apiUrl}/users/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteUserSuccess(res?.data));
    } catch(err) {
        dispatch(deleteUserFailure(err?.response?.data?.msg));
    }
}

export const approveUserAcocunt  = async (dispatch, id, user) => {
    dispatch(approveUserAccountStart());
    try {
        const res = await axios.put(`${apiUrl}/users/account/approve/${id}`,{}, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(approveUserAccountSuccess(res?.data));
    } catch(err) {
        console.log(err);
        dispatch(approveUserAccountFailure(err?.response?.data?.msg));
    }
}

// user

// color
export const getColors = async (dispatch, user) => {
    dispatch(getColorsStart());
    try {
        const res = await axios.get(`${apiUrl}/colors`, {
        headers: { Authorization: 'Bearer ' + user?.token }
    });
        dispatch(getColorsSuccess(res.data));
    } catch (err) {
        dispatch(getColorsFailure(err?.response?.data?.msg));
    }
}

export const createColor = async (color, dispatch, user) => {
    dispatch(addColorStart());
    try {
        const res = await axios.post(`${apiUrl}/colors`, color,  {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(addColorSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(addColorFailure());
    }
}

export const updateColor = async (id, color, dispatch) => {
    dispatch(updateColorStart());
    try {
        dispatch(updateColorSuccess({
            id,
            color
        }));
    } catch (err) {
        dispatch(updateColorFailure());
    }
}

export const deleteColor = async (id, dispatch, user) => {
    dispatch(deleteColorStart());
    try {
        const res = await axios.delete(`${apiUrl}/colors/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteColorSuccess(res.data));
    } catch (err) {
        console.log(err?.response?.data?.error)
        dispatch(deleteColorFailure(err?.response?.data?.error));
    }
}
// color

// contact
export const getContacts = async (dispatch, user) => {
    dispatch(getContactsStart());
    try {
        const res = await axios.get(`${apiUrl}/contacts`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(getContactsSuccess(res.data));
    } catch (err) {
        dispatch(getContactsFailure(err?.response?.data?.msg));
    }
}

export const deleteContact = async (id, dispatch, user) => {
    dispatch(deleteContactStart());
    try {
        const res = await axios.delete(`${apiUrl}/contacts/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteContactSuccess(res.data));
    } catch (err) {
        dispatch(deleteContactFailure(err?.response?.data?.error));
    }
}
// contact

// subscriber
export const getSubscribers = async (dispatch, user) => {
    dispatch(getSubscribersStart());
    try {
        const res = await axios.get(`${apiUrl}/subscribers`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(getSubscribersSuccess(res.data));
    } catch (err) {
        dispatch(getSubscribersFailure(err?.response?.data?.msg));
    }
}

export const deleteSubscriber = async (id, dispatch, user) => {
    dispatch(deleteSubscriberStart());
    try {
        const res = await axios.delete(`${apiUrl}/subscribers/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteSubscriberSuccess(res.data));
    } catch (err) {
        dispatch(deleteSubscriberFailure(err?.response?.data?.msg));
    }
}
// subscriber

// product
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await axios.get(`${apiUrl}/products`);
        dispatch(getProductsSuccess(res?.data));
    } catch (err) {
        dispatch(getProductsFailure(err?.response?.data?.msg));
    }
}

export const getAllProductsByCategory = async (category, dispatch) => {
    dispatch(getProductsByCategoryStart());
    try {
        const res = await axios.get(`${apiUrl}/products/by-category/${category}`);
        dispatch(getProductsByCategorySuccess(res?.data?.products));
    } catch (err) {
        console.log(err);
        dispatch(getProductsByCategoryFailure(err?.response?.data?.msg));
    }
}

export const deleteProduct = async (id, dispatch, user) => {
    dispatch(deleteProductStart());
    try {
        const res = await axios.delete(`${apiUrl}/products/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteProductSuccess(res?.data));
    } catch (err) { 
        dispatch(deleteProductFailure(err?.response?.data?.msg));
    }
}
// product

// Order
export const getOrders = async (dispatch, user) => {
    dispatch(getOrdersStart());
    try {
        const res = await axios.get(`${apiUrl}/orders`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(getOrdersSuccess(res?.data));
    } catch (err) {
        dispatch(getOrdersFailure(err?.response?.data?.msg));
    }
}

export const deleteOrder = async (id, dispatch, user) => {
    dispatch(deleteOrderStart());
    try {
        const res = await axios.delete(`${apiUrl}/orders/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteOrderSuccess(res?.data));
    } catch (err) { 
        dispatch(deleteOrderFailure(err?.response?.data?.error));
    }
}

// Order

// Categories
export const getCategories = async (dispatch) => {
    dispatch(getCategoriesStart());
    try {
        const res = await axios.get(`${apiUrl}/categories`);
        dispatch(getCategoriesSuccess(res?.data));
    } catch (err) {
        console.log(err);
        dispatch(getCategoriesFailure(err?.response?.data?.message));
    }
}

export const deleteCategory = async (id, dispatch, user) => {
    dispatch(deleteCategoryStart());
    try {
        const res = await axios.delete(`${apiUrl}/categories/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteCategorySuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(deleteCategoryFailure(err?.response?.data?.error));
    }
}

// Categories

// SubCategories
export const getSubCategories = async (dispatch) => {
    dispatch(getSubCategoriesStart());
    try {
        const res = await axios.get(`${apiUrl}/sub-categories`);
        dispatch(getSubCategoriesSuccess(res?.data));
    } catch (err) {
        console.log(err);
        dispatch(getSubCategoriesFailure(err?.message));
    }
}

export const deleteSubCategory = async (id, dispatch, user) => {
    dispatch(deleteSubCategoryStart());
    try {
        const res = await axios.delete(`${apiUrl}/sub-categories/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteSubCategorySuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(deleteSubCategoryFailure(err?.response?.data?.error));
    }
}

// SubCategories

// Banner1
export const getBanners1 = async (dispatch) => {
    dispatch(getBanners1Start());
    try {
        const res = await axios.get(`${apiUrl}/banner1`);
        dispatch(getBanners1Success(res?.data));
    } catch (err) {
        console.log(err?.message);
        dispatch(getBanners1Failure(err?.message));
    }
}

export const deleteBanner1 = async (id, dispatch, user) => {
    dispatch(deleteBanner1Start());
    try {
        const res = await axios.delete(`${apiUrl}/banner1/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteBanner1Success(res.data));
    } catch (err) {
        console.log(err);
        dispatch(deleteBanner1Failure(err?.response?.data?.error));
    }
}
// Banner1 

// Banner2 
export const getBanners2 = async (dispatch) => {
    dispatch(getBanners2Start());
    try {
        const res = await axios.get(`${apiUrl}/banner2`);
        dispatch(getBanners2Success(res?.data));
    } catch (err) {
        console.log(err);
        dispatch(getBanners2Failure(err?.response?.data?.message));
    }
}

export const deleteBanner2 = async (id, dispatch, user) => {
    dispatch(deleteBanner2Start());
    try {
        const res = await axios.delete(`${apiUrl}/banner2/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteBanner2Success(res.data));
    } catch (err) {
        console.log(err);
        dispatch(deleteBanner2Failure(err?.response?.data?.error));
    }
}
// Banner2 

// Banner3 
export const getBanners3 = async (dispatch) => {
    dispatch(getBanners3Start());
    try {
        const res = await axios.get(`${apiUrl}/banner3`);
        dispatch(getBanners3Success(res?.data));
    } catch (err) {
        console.log(err);
        dispatch(getBanners3Failure(err?.response?.data?.message));
    }
}

export const deleteBanner3 = async (id, dispatch, user) => {
    dispatch(deleteBanner3Start());
    try {
        const res = await axios.delete(`${apiUrl}/banner3/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token }
        });
        dispatch(deleteBanner3Success(res.data));
    } catch (err) {
        console.log(err);
        dispatch(deleteBanner3Failure(err?.response?.data?.error));
    }
}
// Banner3 

export const fetchWishlistQuantity =  async (dispatch) => {  
    const wishlist = JSON.parse(localStorage.getItem('wishlist') ?? '[]');
    // Check if wishlist items exist and are iterable
    if (!wishlist || !Array.isArray(wishlist)) {
        console.error('Invalid wishlist items');
        return;
    }

    try {
        // Fetch the product details for each wishlist item
        const updatedItems = await Promise.all(
        wishlist?.map(async (item) => {
            const response = await axios.get(`${apiUrl}/products/${item._id}`);
            const { sasia } = response.data?.product;
            return { ...item, sasia };
        }));
        // Update the wishlist items with the updated quantity
        dispatch(updateWishlistQuantity(updatedItems));
    } catch (error) {
        console.error('Error fetching updated quantity:', error);
    }
};

export const fetchShoppingCartQuantity =  async (dispatch) => {  
    const shoppingCart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    // Check if shoppingCart items exist and are iterable
    if (!shoppingCart || !Array.isArray(shoppingCart)) {
        console.error('Invalid shoppingCart items');
        return;
    }

    try {
        // Fetch the product details for each shoppingCart item
        const updatedItems = await Promise.all(
        shoppingCart?.map(async (item) => {
            const response = await axios.get(`${apiUrl}/products/${item?.product?._id}`);
            const { sasia } = response.data?.product;
            return { ...item, sasia };
        }));
        // Update the cart items with the updated quantity
        dispatch(updateCartQuantity(updatedItems));
    } catch (error) {
        console.error('Error fetching updated quantity:', error);
    }
};