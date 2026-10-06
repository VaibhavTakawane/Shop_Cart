import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";

function ProductCarousel() {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector(
    (state) => state.product.topRatedProducts
  );

  const {
    error,
    loading,
    products = [],
  } = topRatedProducts;

  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Message variant="info">
        No top-rated products available.
      </Message>
    );
  }

  return (
    <Carousel
      pause="hover"
      className="top-rated-carousel"
      interval={5000}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>

          <Link to={`/product/${product._id}`}>
            <div className="carousel-product">

              <Image
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${process.env.REACT_APP_API_URL}${product.image}`
                }
                className="carousel-product-image"
                alt={product.name}
              />

              <div className="carousel-product-info">
                <span>TOP RATED</span>

                <h4>
                  {product.name}
                </h4>

                <strong>
                  ₹{product.price}
                </strong>

                <div className="carousel-cta">
                  View Product →
                </div>
              </div>

            </div>
          </Link>

        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;