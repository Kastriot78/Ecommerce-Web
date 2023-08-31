import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
    categories: any[],
    loading: boolean,
    error: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: '',
    success:  false,
    isDeleted: false
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        getCategoriesStart: (state) => {
            state.loading = true;
        },
        getCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        getCategoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCategoryStart: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories.splice(state.categories.findIndex((item) => item._id === action.payload._id));
            state.isDeleted = true;
        },
        deleteCategoryFailure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;
        }
    }
});

export const { 
    getCategoriesStart, 
    getCategoriesSuccess, 
    getCategoriesFailure ,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure
} = categorySlice.actions
export default categorySlice.reducer;