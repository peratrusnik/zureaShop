import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import HomePageComponent from './pages/HomePage.Component';
import LoginPageComponent from './pages/LoginPage.Component';
import {configureStore} from '@reduxjs/toolkit';
import userSlicer from './redux/user.slicer';
import {Provider} from 'react-redux';
import ShopPageComponent from './pages/ShopPage.Component';
import CartShopPageComponent from './pages/CartShopPage/CartShopPage.Component';
import CartComponent from './components/cart/Cart.Component';
import CheckoutComponent from './components/checkout/Checkout.Component';
import productSlicer from './redux/product.slicer';

import ContactPageComponent from "./pages/ContactPage.Component";
import UserProductPageComponent from "./pages/UserProductPage.Component";
import loaderSlicer from "./redux/loader.slicer";
import modalSlicer from "./redux/modal.slicer";
import ProductCreateEditPageComponent from "./pages/ProductCreatePage.Component";
import AuthGuardComponent from "./utils/AuthGuard.Component";
import RegisterPageComponent from "./pages/RegisterPage.Component";
import ActivationAccountPageComponent from "./pages/ActivationAccountPage.Component";
import CategoryPageComponent from "./pages/Category.Page.Component";
import cartSlicer from "./redux/cart.slicer";
import ProductDetailComponent
    from "./components/productDetail/ProductDetail.Component";
import AdminPageComponent from "./pages/admin/AdminPage.Component";
import UsersPageComponent from "./pages/admin/UsersPage.Component";
import AdminGuardComponent from "./utils/AdminGuard.Component";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SingleUserPageComponent from "./pages/admin/SingleUserPage.Component";
import AdminCategoryPageComponent from "./pages/admin/CategoryPage.Component";
import AdminProductsPageComponent from "./pages/admin/ProductsPage.Component";
import AddCategoryPageComponent from "./pages/admin/AddCategoryPage.Component";
import SubscribersPage from "./pages/admin/SubscribersPage";
import EditCategoryPageComponent from "./pages/admin/EditCategoryPage.Component";
import PaymentPageComponent from "./pages/PaymentPage.Component";
import OrderPageComponent from "./pages/OrderPage.Component";
import {RootStoreContext} from "./context/RootStore.Context";
import UnSubscribeNeswletter from './pages/UnSubscribeNeswletter';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <HomePageComponent/>,
            },
            {
                path: '/contact',
                element: <ContactPageComponent/>,
            },
            {
                path: '/login',
                element: <LoginPageComponent/>,
            },
            {
                path: '/register',
                element: <RegisterPageComponent/>
            },
            {
                path: '/activate-account/:userId',
                element: <ActivationAccountPageComponent/>
            },
            {
                path: '/shop',
                element: <ShopPageComponent/>
            },
            {
                path: '/shop/:searchParam',
                element: <ShopPageComponent/>
            },
            {
                path: "/category/:id",
                element: <CategoryPageComponent/>,
            },
            {
                path: "/product/create",
                element: <AuthGuardComponent>
                    <ProductCreateEditPageComponent/>
                </AuthGuardComponent>
            },
            {
                path: "product/:productId/edit",
                element: <AuthGuardComponent>
                    <ProductCreateEditPageComponent/>
                </AuthGuardComponent>
            },
            {
                path: "/user/products",
                element: <AuthGuardComponent>
                    <UserProductPageComponent/>
                </AuthGuardComponent>
            },
            {
                path: '/cartshop',
                element: <CartShopPageComponent/>,
                children: [
                    {
                        path: 'cart-products',
                        element: <CartComponent/>,
                    },
                    {
                        path: 'checkout',
                        element: <CheckoutComponent/>,
                    },
                    {
                        path: 'payment',
                        element: <PaymentPageComponent/>
                    }
                ],
            },
            {
                path: '/order',
                element: <OrderPageComponent/>
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetailComponent/>,
            },
            {
                path: '/unsubscribe/:id',
                element: <UnSubscribeNeswletter/>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <AdminPageComponent />,
        children: [
            {
                path: "",
                element: (
                    <AdminGuardComponent>
                        <UsersPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "users",
                element: (
                    <AdminGuardComponent>
                        <UsersPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "categories",
                element: (
                    <AdminGuardComponent>
                        <AdminCategoryPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "products",
                element: (
                    <AdminGuardComponent>
                        <AdminProductsPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "subscribers",
                element: (
                    <AdminGuardComponent>
                        <SubscribersPage />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "categories/add-category",
                element: (
                    <AdminGuardComponent>
                        <AddCategoryPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "user/:id",
                element: (
                    <AdminGuardComponent>
                        <SingleUserPageComponent />
                    </AdminGuardComponent>
                ),
            },
            {
                path: "categories/edit/:id",
                element: (
                    <AdminGuardComponent>
                        <EditCategoryPageComponent />
                    </AdminGuardComponent>
                ),
            },
        ],
    },
]);
const store = configureStore({
    reducer: {
        userStore: userSlicer,
        loaderStore: loaderSlicer,
        productStore: productSlicer,
        modalStore: modalSlicer,
        cartStore: cartSlicer,
    },
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/*react query hook*/}
        <QueryClientProvider client={queryClient}>
            {/*redux*/}
            <Provider store={store}>
                {/*context API*/}
                <RootStoreContext>
                    {/*routes*/}
                    <RouterProvider router={router}/>
                </RootStoreContext>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
