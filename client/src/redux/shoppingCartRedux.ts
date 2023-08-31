import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import { toast } from "react-toastify";

export interface CartItem {
    product: Product;
    quantity: number;
    totalPrice?: number;
    sasia?: number;
}

interface ShoppingCartState {
    products: CartItem[],
}

const initialState: ShoppingCartState = {
    products: JSON.parse(localStorage.getItem('cart') ?? '[]'),
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity } = action.payload;
            const existingItem = state?.products.find((item) => item?.product?._id === product._id);
            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.products.push({ product, quantity });
                localStorage.setItem('cart', JSON.stringify(state.products));
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex((item) => item?.product?._id === action.payload._id);
            if (index !== -1) {
                state.products.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(state.products));
            }
        },
        updateQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const index = state.products.findIndex((item) => item.product._id === product._id);
            if (index !== -1) {
                state.products[index].quantity = quantity;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const existingItem = state?.products.find((item) => item?.product?._id === product._id);
            if (quantity <= 1) {
                return;
            }

            if (existingItem) {
                existingItem.quantity = quantity - 1;
            }
        },
        increaseQuantity: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const existingItem = state?.products.find((item) => item?.product?._id === product._id);
            if (existingItem && product?.sasia > quantity) {
                existingItem.quantity = quantity + 1;
            } else {
                toast.error('Nuk ka sasi te mjaftueshme ne stock', {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
        },
        updateCartQuantity: (state, action) => {
            const updatedItems = action.payload;
            state.products = updatedItems;
        },
        resetCart: (state) => {
            state.products = [];
            localStorage.removeItem('cart');
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, decreaseQuantity, increaseQuantity, updateCartQuantity, resetCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;