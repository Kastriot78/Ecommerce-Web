import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user: any,
    loading: boolean,
    error: boolean | any,
    errorMsg: string,
    success: boolean,
    formTouched: boolean,
    users: any[],
    isDeleted: boolean,
    approved: boolean,
    isApprovedSuccess: boolean,
    adminRegisterSuccess: boolean,
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('authUser') ?? 'null'),
    loading: false,
    error: false,
    errorMsg: '',
    success: false,
    formTouched: false,
    users: [],
    isDeleted: false,
    approved: false,
    isApprovedSuccess: false,
    adminRegisterSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.success = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action?.payload;
            state.error = false;
            localStorage.setItem('authUser', JSON.stringify(action.payload));
            state.success = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action?.payload;
        },
        logout: (state) => {
            localStorage.removeItem('authUser');
            state.user = null;
            state.success = false;
            state.error = false;
        },
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.adminRegisterSuccess = true;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        },
        getUsersStart: (state) => {
            state.loading = true;
            state.error = false;
            state.users = [];
        },
        getUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action?.payload;
        },
        getUsersFailure: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMsg = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = false;
            state.isDeleted = false
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.users = state.users.splice(state.users.findIndex((item) => item?.id === action.payload?._id), 1);
            state.isDeleted = true;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = false;
            state.isDeleted = false;
            state.errorMsg = action.payload;
        },
        userUpdated: (state, action) => {
            state.user = { ...state.user, name: action?.payload?.name, lastName: action?.payload?.lastName, email: action?.payload?.email, password: action?.payload?.password, company: action?.payload?.company, phone: action?.payload?.phone, role: action.payload?.role }
        },
        approveUserAccountStart: (state) => {
            state.loading = true;
            state.approved = false;
            state.isApprovedSuccess = false;
        },
        approveUserAccountSuccess: (state) => {
            state.loading = false;
            state.approved = true;
            state.isApprovedSuccess = true;
        },
        approveUserAccountFailure: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
            state.isApprovedSuccess = false;
        },
        clearApproveAccountUser: (state) => {
            state.isApprovedSuccess = false;
        },
        clearState: (state) => {
            Object.assign(state, {
              loading: false,
              error: false,
              errorMsg: '',
              success: false,
              formTouched: false,
              users: [],
              isDeleted: false,
              approved: false,
              isApprovedSuccess: false,
              adminRegisterSuccess: false
            });
          },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    approveUserAccountStart,
    approveUserAccountSuccess,
    approveUserAccountFailure
} = userSlice.actions;
export default userSlice.reducer;