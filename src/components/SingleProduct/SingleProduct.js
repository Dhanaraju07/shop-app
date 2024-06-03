import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleProduct,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/action";
import Star from "../Star/Star";
import "./SingleProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleProduct = () => {
  const { product } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch]);

  const cartItem = cartItems.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="product-wrapper container">
      <div className="row">
        <div className="col-12 col-md-6 image-wrapper">
          <img src={product.image} alt={product.title} className="img-fluid product-photo" />
        </div>
        <div className="col-12 col-md-6 details-wrapper">
          <h4 className="details-title">{product.title}</h4>
          <Star rating={product.rating?.rate} count={product.rating?.count} />
          <p className="details-description">{product.description}</p>
          <h4 className="details-price">${product.price}</h4>
          {!cartItem ? (
            <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
          ) : (
            <div className="quantity-wrapper">
              <button onClick={handleDecreaseQuantity} className="btn btn-secondary">-</button>
              <span className="quantity-count">{cartItem.quantity}</span>
              <button onClick={handleIncreaseQuantity} className="btn btn-secondary">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
