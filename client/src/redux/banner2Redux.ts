import { createSlice } from "@reduxjs/toolkit";

export interface Banner3State {
    banners: any[] | undefined,
    loading: boolean,
    error: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: Banner3State = {
    banners: [],
    loading: false,
    error: '',
    success: false,
    isDeleted: false
}

export const banner3Slice = createSlice({
    name: 'banner2',
    initialState: initialState,
    reducers: {
        getBanners2Start: (state) => {
            state.loading = true;
            state.banners = undefined;
        },
        getBanners2Success: (state, action) => {
            state.loading = false;
            state.banners = action?.payload?.slice(0, 2);
        },
        getBanners2Failure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.banners = undefined;
        },
        deleteBanner2Start: (state) => {
            state.loading = true;
            state.isDeleted = false;
        },
        deleteBanner2Success: (state, action) => {
            state.loading = false;
            state?.banners?.splice(state.banners.findIndex((item) => item._id === action.payload._id));
            state.isDeleted = true;
        },
        deleteBanner2Failure: (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;
        }
    }
});

export const {
    getBanners2Start,
    getBanners2Success,
    getBanners2Failure,
    deleteBanner2Start,
    deleteBanner2Success,
    deleteBanner2Failure
} = banner3Slice.actions
export default banner3Slice.reducer;