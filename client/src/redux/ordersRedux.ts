import { createSlice } from "@reduxjs/toolkit";

interface OrderItem {
    orders: any[];
    isLoading: boolean;
    error: string;
    isDeleted: boolean;
}

const initialState: OrderItem = {
    orders: [],
    isLoading: false,
    error: '',
    isDeleted: false
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        getOrdersStart: (state) => {
            state.isLoading = true;
            state.error = ''
        },
        getOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
            state.error = ''
        },
        getOrdersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteOrderStart: (state) => {
            state.isLoading = true;
            state.error = '';
            state.isDeleted = false;
        },
        deleteOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.orders.splice(state.orders.findIndex((item) => item.id === action.payload._id), 1);
            state.isDeleted = true;
        },
        deleteOrderFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isDeleted = false;
        }
    }
});

export const { getOrdersStart, getOrdersSuccess, getOrdersFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure } = orderSlice.actions;

export default orderSlice.reducer