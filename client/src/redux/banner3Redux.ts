import { createSlice } from "@reduxjs/toolkit";

export interface Banner3State {
    banners: any[] | any,
    loading: boolean,
    error: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: Banner3State = {
    banners: [],
    loading: false,
    error: '',
    success:  false,
    isDeleted: false
}

export const banner3Slice = createSlice({
    name: 'banner3',
    initialState: initialState,
    reducers: {
        getBanners3Start: (state) => {
            state.loading = true;
            state.banners = undefined;
        },
        getBanners3Success: (state, action) => {
            state.loading = false;
            state.banners = action.payload;
        },
        getBanners3Failure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteBanner3Start: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteBanner3Success: (state, action) => {
            state.loading = false;
            state?.banners?.splice(state.banners.findIndex((item: any) => item._id === action.payload._id));
            state.isDeleted = true;
        },
        deleteBanner3Failure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;
        }
    }
});

export const { 
    getBanners3Start, 
    getBanners3Success, 
    getBanners3Failure ,
    deleteBanner3Start,
    deleteBanner3Success,
    deleteBanner3Failure
} = banner3Slice.actions
export default banner3Slice.reducer;