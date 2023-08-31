import { configureStore, combineReducers } from '@reduxjs/toolkit';
import colorReducer from './colorRedux';
import userReducer from './userRedux';
import contactRedux from './contactRedux';
import navbarRedux from './navbarRedux';
import subscribeRedux from './subscribeRedux';
import productRedux from './productRedux';
import wishlistRedux from './wishlistRedux';
import shoppingCartRedux from './shoppingCartRedux';
import ordersRedux from './ordersRedux';
import categoryRedux from './categoryRedux';
import subCategoryRedux from './subCategoryRedux';
import banner2Redux from './banner2Redux';
import banner3Redux from './banner3Redux';
import banner1Redux from './banner1Redux';

const rootReducer = combineReducers({
    user: userReducer,
    color: colorReducer,
    navbar: navbarRedux,
    contact: contactRedux,
    subscribe: subscribeRedux,
    product: productRedux,
    wishlist: wishlistRedux,
    cart: shoppingCartRedux,
    order: ordersRedux,
    category: categoryRedux,
    subCategory: subCategoryRedux,
    banner1: banner1Redux,
    banner2: banner2Redux,
    banner3: banner3Redux
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default store;