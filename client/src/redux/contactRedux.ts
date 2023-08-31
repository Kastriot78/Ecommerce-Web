import { createSlice } from "@reduxjs/toolkit";

interface ContactState {
    contacts: any[],
    isLoading: boolean,
    error: boolean,
    errorMsg: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: ContactState = {
    contacts: [],
    isLoading: false,
    error: false,
    errorMsg: '',
    success: false,
    isDeleted: false
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState: initialState,
    reducers: {
        getContactsStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getContactsSuccess: (state, action) => {
            state.isLoading = false;
            state.error =  false;
            state.success = true;
            state.contacts = action?.payload;
        },
        getContactsFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        deleteContactStart: (state) => {
            state.isLoading = true;
            state.error = false;
            state.isDeleted = false;
        },
        deleteContactSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.contacts.splice(state.contacts.findIndex((item) => item?.id === action.payload?._id), 1);
            state.isDeleted = true;
        },
        deleteContactFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.isDeleted = false;
            state.errorMsg = action.payload;
        }
    }
});

export const {
    getContactsStart,
    getContactsSuccess,
    getContactsFailure,
    deleteContactStart,
    deleteContactSuccess,
    deleteContactFailure
} = contactSlice.actions;

export default contactSlice.reducer;