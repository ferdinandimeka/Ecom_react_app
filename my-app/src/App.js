import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { Container } from "react-bootstrap";
import HomeScreen from "./components/screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from './components/screens/CartScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import ShippingScreen from './components/screens/ShippingScreen'
import PaymentScreen from './components/screens/PaymentScreen'
import PlaceOrderScreen from './components/screens/PlaceOrderScreen'
import OrderScreen from './components/screens/OrderScreen'
import OrderListScreen from './components/screens/OrderListScreen'
import ProductListScreen from './components/screens/ProductListScreen'
import UserListScreen from './components/screens/UserListScreen'
import ProductEditScreen from './components/screens/ProductEditScreen'
import UserEditScreen from './components/screens/UserEditScreen'

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} exact />
            <Route path="/cart/:id?" element={<CartScreen />} exact />
            <Route path="/login/shipping" element={<ShippingScreen />} exact />
            <Route path="/payment" element={<PaymentScreen />} exact />
            <Route path="/placeorder" element={<PlaceOrderScreen />} exact />
            <Route path="/order/:id" element={<OrderScreen />} exact />
            <Route path="/orderlist" element={<OrderListScreen />} exact />
            <Route path="/productlist" element={<ProductListScreen />} exact />
            <Route path="/userlist" element={<UserListScreen />} exact />
            <Route path="/user/:id/edit" element={<UserEditScreen />} exact />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
