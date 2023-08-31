import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    products: any[],
    filteredProductsByCategory: any[],
    isLoading: boolean,
    error: boolean,
    errorMsg: string,
    success: boolean,
    isDeleted: boolean,
    sortOrder: string;
    category: string;
    categoryLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    filteredProductsByCategory: [],
    isLoading: false,
    error: false,
    errorMsg: '',
    success: false,
    isDeleted: false,
    sortOrder: 'highToLow',
    category: '',
    categoryLoading: false
}

const user = JSON.parse(localStorage.getItem('authUser') ?? 'null');

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        getProductsStart: (state) => {
            state.isLoading = true;
        },
        getProductsSuccess: (state, action) => {
            state.error = false;
            // state.products = action?.payload;
            const products = action.payload;
            if (state.sortOrder === 'highToLow') {
                products.sort((a: any, b: any) => user?.role === 'shumice' ? b.priceShumice - a?.priceShumice : b.pricePakice - a.pricePakice);
            } else if (state.sortOrder === "lowToHigh") {
                products.sort((a: any, b: any) => user?.role === 'shumice' ? a.priceShumice - b?.priceShumice : a.pricePakice - b.pricePakice);
            }
            state.products = products;
            state.filteredProductsByCategory = products;
            state.isLoading = false;
        },
        getProductsFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        getProductsByCategoryStart: (state) => {
            state.categoryLoading = true;
        },
        getProductsByCategorySuccess: (state, action) => {
            state.categoryLoading = false;
            const products = action.payload;
            if (state.sortOrder === 'highToLow') {
                products.sort((a: any, b: any) => b.price - a.price);
            } else if (state.sortOrder === "lowToHigh") {
                products.sort((a: any, b: any) => a.price - b.price);
            }
            state.filteredProductsByCategory = products;
        },
        getProductsByCategoryFailure: (state, action) => {
            state.categoryLoading = false;
            state.errorMsg = action.payload;
        },
        deleteProductStart: (state) => {
            state.success = false;
            state.isDeleted = false;
        },
        deleteProductSuccess: (state, action) => {
            state.products.splice(state.products.findIndex((item) => item.id === action?.payload?._id), 1);
            state.isDeleted = true;
        },
        deleteProductFailure: (state, action) => {
            state.isDeleted = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        clearState: () => {
            return initialState;
        }
    }
});

export const { 
    getProductsStart, 
    getProductsSuccess, 
    getProductsFailure, 
    setSortOrder, 
    setCategory, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure, 
    getProductsByCategoryStart, 
    getProductsByCategorySuccess ,
    getProductsByCategoryFailure
} = productSlice.actions;

export default productSlice.reducer;