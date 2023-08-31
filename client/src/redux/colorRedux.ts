import {
    createSlice
} from "@reduxjs/toolkit";

export interface ColorState {
    colors: any[],
    isLoading: boolean,
    error: boolean,
    errorMsg: string,
    success: boolean,
    isDeleted: boolean
}

const initialState: ColorState = {
    colors: [],
    isLoading: false,
    error: false,
    errorMsg: '',
    success: false,
    isDeleted: false
};

export const colorSlice = createSlice({
    name: 'color',
    initialState: initialState,
    reducers: {
        // Get All
        getColorsStart: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getColorsSuccess: (state, action) => {
            state.isLoading = false;
            state.colors = action?.payload;
            state.error = false;
        },
        getColorsFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        // Delete
        deleteColorStart: (state) => {
            state.isLoading = true;
            state.error = false;
            state.isDeleted = false;
        },
        deleteColorSuccess: (state, action) => {
            state.isLoading = false;
            state.colors.splice(state.colors.findIndex((item) => item?.id === action.payload?._id), 1); //ose
            // state.colors = state.colors.filter(color => color.id !== action.payload._id);
            state.isDeleted = true;
        },
        deleteColorFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.isDeleted = false;
            state.errorMsg = action.payload;
        },
        // Update
        updateColorStart: (state) => {
            state.isLoading = true;
            state.error = false
        },
        updateColorSuccess: (state, action) => {
            state.isLoading = false;
            // state.colors[state.colors.findIndex((item) => item.id === action.payload.id)] = action.payload.color; ose:
            const index = state.colors.findIndex(color => color.id === action.payload.id);
            if (index !== -1) {
                state.colors[index] = action.payload.color;
            }
            state.error = false;
        },
        updateColorFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        // Add
        addColorStart: (state) => {
            state.isLoading = true;
            state.error = false;
            state.success = false
        },
        addColorSuccess: (state, action) => {
            state.isLoading = false;
            state.colors.push(action?.payload);
            state.success = action?.payload?.success;
        },
        addColorFailure: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMsg = action.payload;
            state.success = false;
        },
        // clear state (na duhet kur psh bojm add ne databaze shembull tek addColor)
        clearState: () => {
            return initialState
        }
    }
});

export const {
    getColorsStart,
    getColorsSuccess,
    getColorsFailure,
    deleteColorStart,
    deleteColorSuccess,
    deleteColorFailure,
    updateColorStart,
    updateColorSuccess,
    updateColorFailure,
    addColorStart,
    addColorSuccess,
    addColorFailure
} = colorSlice.actions;

export default colorSlice.reducer;