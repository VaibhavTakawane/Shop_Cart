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

  // IMPORTANT:
  // Do not render Carousel when there are no products.
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Message variant="info">
        No top-rated products available.
      </Message>
    );
  }

  return (
    <Carousel
      style={{ height: "300px" }}
      pause="hover"
      className="bg-dark"
      interval={5000}
    >
      {Array.isArray(products) &&
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : `${process.env.REACT_APP_API_URL}${product.image}`
                }
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "contain",
                }}
                alt={product.name}
              />

              <Carousel.Caption className="carousel-caption">
                <h4>
                  {product.name} (₹{product.price})
                </h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ProductCarousel;