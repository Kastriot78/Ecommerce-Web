import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Contact from './components/Contact/Contact';
import Login from './components/Login-SignUp/Login';
import SignUp from './components/Login-SignUp/SignUp';
import Wishlist from './components/Wishlist/Wishlist';
import ProductDetail from './components/ProductDetail/ProductDetail';
import ShoppingCart from './components/ShoppinCart/ShoppingCart';
import AddProduct from './components/AdminPanel/Product/AddProduct';
import OrderCompleted from './components/OrderCompleted/OrderCompleted';
import Checkout from './components/Checkout/Checkout';
import Notfound from './components/Notfound/Notfound';
import PageLayout from './PageLayout';
import ScrollToTop from './ScrollToTop';
import AdminLayout from './AdminLayout';
import Dashboard from './components/AdminPanel/Dashboard/Dashboard';
import ManageUsers from './components/AdminPanel/Users/ManageUsers';
import ManageContacts from './components/AdminPanel/Contact/ManageContacts';
import ManageProducts from './components/AdminPanel/Product/ManageProducts';
import MyAccount from './components/AdminPanel/MyAccount/MyAccount';
import UserOrder from './components/UserOrder/UserOrder';
import PrivateRoute from './helpers/privateRoutes';
import { RootState } from './redux/store';
import ManageOrders from './components/AdminPanel/Orders/ManageOrders';
import AddUser from './components/AdminPanel/Users/AddUser';
import ScrollTop from './ScrollTop';
import { AddCategory } from './components/AdminPanel/Category/AddCategory';
import ManageCategories from './components/AdminPanel/Category/ManageCategories';
import { AddBanner3 } from './components/AdminPanel/Banner3/AddBanner';
import ManageBanner3 from './components/AdminPanel/Banner3/ManageBanner3';
import { AddBanner2 } from './components/AdminPanel/Banner2/AddBanner';
import ManageBanner2 from './components/AdminPanel/Banner2/ManageBanner2';
import { AddBanner1 } from './components/AdminPanel/Banner1/AddBanner';
import ManageBanner1 from './components/AdminPanel/Banner1/ManageBanner1';
import EditUser from './components/AdminPanel/Users/EditUser';
import FilteredProducts from './components/FilteredProducts/FilteredProducts';
import FilteredBySubCategories from './components/FilteredBySubCategories/FilterBySubCategories';
import { AddSubCategory } from './components/AdminPanel/SubCategory/AddSubCategory';
import ManageSubCategories from './components/AdminPanel/SubCategory/ManageSubCategories';

function App() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <BrowserRouter>
        <ScrollTop />
        <ScrollToTop />
        <Routes>
          <Route element={<PageLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/:category' element={<FilteredProducts />} />
            <Route path='/subCategory/:subCategory' element={<FilteredBySubCategories />} />

            <Route path='/cart' element={ <PrivateRoute user={user}> <ShoppingCart /> </PrivateRoute> } />
            <Route path='/checkout' element={<PrivateRoute user={user}> <Checkout /> </PrivateRoute>} />
            <Route path='/order-completed' element={<PrivateRoute user={user}> <OrderCompleted /> </PrivateRoute>} />
            <Route path='/account' element={<PrivateRoute user={user}> <MyAccount /> </PrivateRoute> } />
            <Route path='/my-orders' element={<PrivateRoute user={user}> <UserOrder /> </PrivateRoute>} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/app/admin" element={<Dashboard />} />
            <Route path="/app/admin/add-product" element={<AddProduct />} />
            <Route path="/app/admin/add-product/:id" element={<AddProduct />} />
            <Route path="/app/admin/manage-products" element={<ManageProducts />} />
            <Route path="/app/admin/add-user" element={<AddUser />} />
            <Route path="/app/admin/edit-user/:id" element={<EditUser />} />
            <Route path="/app/admin/add-category" element={<AddCategory />} />
            <Route path="/app/admin/add-category/:id" element={<AddCategory />} />
            <Route path="/app/admin/manage-categories" element={<ManageCategories />} />
            <Route path="/app/admin/manage-users" element={<ManageUsers />} />
            <Route path="/app/admin/manage-contacts" element={<ManageContacts />} />
            <Route path="/app/admin/account/settings" element={<MyAccount />} />
            <Route path="/app/admin/manage-orders" element={<ManageOrders />} />
            <Route path="/app/admin/add-banner1" element={<AddBanner1 />} />
            <Route path="/app/admin/add-banner1/:id" element={<AddBanner1 />} />
            <Route path="/app/admin/manage-banners1" element={<ManageBanner1 />} />
            <Route path="/app/admin/add-banner2" element={<AddBanner2 />} />
            <Route path="/app/admin/add-banner2/:id" element={<AddBanner2 />} />
            <Route path="/app/admin/manage-banners2" element={<ManageBanner2 />} />
            <Route path="/app/admin/add-banner3" element={<AddBanner3 />} />
            <Route path="/app/admin/add-banner3/:id" element={<AddBanner3 />} />
            <Route path="/app/admin/manage-banners3" element={<ManageBanner3 />} />
            <Route path="/app/admin/add-sub-category" element={<AddSubCategory />} />
            <Route path="/app/admin/add-sub-category/:id" element={<AddSubCategory />} />
            <Route path="/app/admin/manage-sub-categories" element={<ManageSubCategories />} />
          </Route>

          <Route path="/notfound" element={<Notfound />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
