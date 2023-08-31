import { createSlice } from "@reduxjs/toolkit";

interface SubscribeData {
    subsribers: any[],
    isLoading: boolean,
    error: boolean,
    errorMsg: string,
    isDeleted: boolean
}

const initialState: SubscribeData = {
    subsribers: [],
    isLoading: false,
    error: false,
    errorMsg: '',
    isDeleted: false
}

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState: initialState,
    reducers: {
        getSubscribersStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getSubscribersSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.subsribers = action.payload;
        },
        getSubscribersFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        deleteSubscriberStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        deleteSubscriberSuccess: (state, action) => {
            state.isLoading = false;
            state.subsribers.splice(state.subsribers.findIndex((item) => item?.id === action?.payload?._id), 1);
            state.isDeleted = true;
        },
        deleteSubscriberFailure: (state, action) => {
            state.isLoading = false;
            state.isDeleted = false;
            state.error = true;
            state.errorMsg = action.payload;
        }
    }
});

export const {
    getSubscribersStart,
    getSubscribersSuccess,
    getSubscribersFailure,
    deleteSubscriberStart,
    deleteSubscriberSuccess,
    deleteSubscriberFailure
} = subscribeSlice.actions

export default subscribeSlice.reducer;