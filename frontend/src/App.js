import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "../src/component/layout/Footer/Footer";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./component/layout/Loader/Loader";
import Home from "./component/Home/Home.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Products from "./component/Product/Products";
import ProductDetails from "./component/Product/ProductDetails";
import Cart from "./component/Cart/Cart";
import Search from "./component/Product/Search.js";
import NotFound from "./component/layout/NotFound/NotFound";

const About = lazy(() => import("./component/layout/About/About"));
const Contact = lazy(() => import("./component/layout/Contact/Contact"));

const ForgotPassword = lazy(() => import("./component/User/ForgotPassword"));
const ResetPassword = lazy(() => import("./component/User/ResetPassword"));
const Profile = lazy(() => import("./component/User/Profile.js"));
const UpdateProfile = lazy(() => import("./component/User/UpdateProfile.js"));
const UpdatePassword = lazy(() => import("./component/User/UpdatePassword.js"));

const Shipping = lazy(() => import("./component/Cart/Shipping"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder"));
const OrderSuccess = lazy(() => import("./component/Cart/OrderSuccess"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));
const Payment = lazy(() => import("./component/Cart/Payment"));

const Dashboard = lazy(() => import("./component/Admin/Dashboard"));
const ProductList = lazy(() => import("./component/Admin/ProductList"));
const NewProduct = lazy(() => import("./component/Admin/NewProduct"));
const UpdateProduct = lazy(() => import("./component/Admin/UpdateProduct"));
const OrderList = lazy(() => import("./component/Admin/OrderList"));
const ProcessOrder = lazy(() => import("./component/Admin/ProcessOrder"));
const UsersList = lazy(() => import("./component/Admin/UsersList"));
const UpdateUser = lazy(() => import("./component/Admin/UpdateUser"));
const ProductReviews = lazy(() => import("./component/Admin/ProductReviews"));

function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Droid Serif", "Sofia", "Audiowide"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Suspense fallback={<Loader />}>
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginSignUp />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />

              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    loading={loading}
                    isAdminPath={true}
                    isAdmin={user && user.role === "admin" ? true : false}
                  />
                }
              >
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/product" element={<NewProduct />} />
                <Route path="/admin/product/:id" element={<UpdateProduct />} />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/order/:id" element={<ProcessOrder />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/user/:id" element={<UpdateUser />} />
                <Route path="/admin/reviews" element={<ProductReviews />} />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    loading={loading}
                    isAdminPath={false}
                    isAdmin={user && user.role === "admin" ? true : false}
                  />
                }
              >
                <Route path="/account" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatePassword />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/login/shipping" element={<Shipping />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/order/confirm" element={<ConfirmOrder />} />
                <Route path="/process/payment" element={<Payment />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Elements>
        </Suspense>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
