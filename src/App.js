import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadCartFromStorage } from "./redux/actions/action";
import Products from "./components/Products/Products";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Cart from "./components/Cart/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Products />} path="/" />
        <Route element={<SingleProduct />} path="/products/:id" />
        <Route element={<Cart />} path="/cart" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
