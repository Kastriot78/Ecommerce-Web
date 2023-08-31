import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
    subCategories: any[],
    loading: boolean,
    error: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: CategoryState = {
    subCategories: [],
    loading: false,
    error: '',
    success:  false,
    isDeleted: false
}

export const subCategorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        getSubCategoriesStart: (state) => {
            state.loading = true;
        },
        getSubCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.subCategories = action.payload;
        },
        getSubCategoriesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteSubCategoryStart: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteSubCategorySuccess: (state, action) => {
            state.loading = false;
            state.subCategories.splice(state.subCategories.findIndex((item) => item._id === action.payload._id));
            state.isDeleted = true;
        },
        deleteSubCategoryFailure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;
        }
    }
});

export const { 
    getSubCategoriesStart, 
    getSubCategoriesSuccess, 
    getSubCategoriesFailure ,
    deleteSubCategoryStart,
    deleteSubCategorySuccess,
    deleteSubCategoryFailure
} = subCategorySlice.actions
export default subCategorySlice.reducer;
