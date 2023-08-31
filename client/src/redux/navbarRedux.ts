
import { createSlice } from "@reduxjs/toolkit";

export interface Idata {
    show: boolean
}

const initialState: Idata = {
    show: false
}

export const NavbarSlice = createSlice({
    name: 'navbar',
    initialState: initialState,
    reducers: {
        showNavbar: (state, action) => {
            console.log(action.payload);
            state.show = action.payload;
        },
    }
});

export const { showNavbar } = NavbarSlice.actions;
export default NavbarSlice.reducer;