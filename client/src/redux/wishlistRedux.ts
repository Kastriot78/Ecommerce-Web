import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface WishlistState {
    items: Product[];
    added: boolean; //to show a modal when product added on wishlist
    error: boolean;
}

const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem('wishlist') ?? '[]'),
    added: false,
    error: false
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const index = state?.items?.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state?.items?.splice(index, 1);
                state.added = false;
                localStorage.setItem("wishlist", JSON.stringify(state.items));
            } else {
                state?.items?.push(action.payload);
                state.added = true;
                localStorage.setItem("wishlist", JSON.stringify(state.items));
            }
        },
        resetValue: (state) => {
            state.added = false;
        },
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            if (!state?.items?.some((item) => item._id === product._id)) {
                state?.items?.push(product);
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item._id !== productId);
        },
        updateWishlistQuantity: (state, action) => {
            const updatedItems = action.payload;
            state.items = updatedItems;
        },
    }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, resetValue, updateWishlistQuantity } = wishlistSlice.actions

export default wishlistSlice.reducer;