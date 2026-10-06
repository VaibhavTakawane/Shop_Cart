import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

import Rating from "./Rating";

function Product({ product }) {
  return (
    <Paper className="product-card">
      <CardActionArea
        component={Link}
        to={`/product/${product._id}`}
        className="product-action"
      >
        <div className="product-image-wrapper">
          <CardMedia
            component="img"
            className="product-image"
            image={
              product.image?.startsWith("http")
                ? product.image
                : `${process.env.REACT_APP_API_URL}${product.image}`
            }
            alt={product.name}
          />
        </div>

        <CardContent className="product-content">

          <Typography
            className="product-name"
            variant="h6"
            component="div"
          >
            {product.name}
          </Typography>

          <div className="product-rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f59e0b"
            />
          </div>

          <Typography
            className="product-price"
            variant="h6"
            component="div"
          >
            ₹{product.price}
          </Typography>

          <div className="product-view">
            View Product →
          </div>

        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;