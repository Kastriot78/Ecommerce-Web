import { createSlice } from "@reduxjs/toolkit";

export interface Banner1State {
    banners: any[] | undefined,
    loading: boolean,
    error: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: Banner1State = {
    banners: [],
    loading: false,
    error: '',
    success: false,
    isDeleted: false
}

export const banner3Slice = createSlice({
    name: 'banner1',
    initialState: initialState,
    reducers: {
        getBanners1Start: (state) => {
            state.loading = true;
            state.banners = undefined;
        },
        getBanners1Success: (state, action) => {
            state.loading = false;
            state.banners = action?.payload;
        },
        getBanners1Failure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.banners = undefined;
        },
        deleteBanner1Start: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteBanner1Success: (state, action) => {
            state.loading = false;
            state?.banners?.splice(state.banners.findIndex((item) => item._id === action.payload._id));
            state.isDeleted = true;
        },
        deleteBanner1Failure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;
        }
    }
});

export const {
    getBanners1Start,
    getBanners1Success,
    getBanners1Failure,
    deleteBanner1Start,
    deleteBanner1Success,
    deleteBanner1Failure
} = banner3Slice.actions
export default banner3Slice.reducer;