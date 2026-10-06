import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetchProductList } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector(
    (state) => state.product.productList
  );

  const {
    products = [],
    loading,
    error,
    page,
    pages,
  } = productList;

  const { pageNumber } = useParams();

  const params = new URLSearchParams(
    history.location.search
  );

  const keyword = params.get("keyword") || "";

  useEffect(() => {
    dispatch(
      fetchProductList(
        keyword,
        pageNumber || 1
      )
    );
  }, [
    dispatch,
    keyword,
    pageNumber,
  ]);

  return (
    <div className="home-page">

      {!keyword && (
        <section className="featured-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                Featured
              </span>

              <h2>
                Top-Rated Products
              </h2>

              <p>
                Discover products loved by our customers.
              </p>
            </div>
          </div>

          <ProductCarousel />
        </section>
      )}

      <section className="products-section">

        <div className="section-heading">
          <div>
            <span className="section-label">
              Shop
            </span>

            <h2>
              {keyword
                ? `Search results for "${keyword}"`
                : "Latest Products"}
            </h2>

            <p>
              Explore our latest products and find something you love.
            </p>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error}
          </Message>
        ) : products.length === 0 ? (
          <Message variant="info">
            No products found.
          </Message>
        ) : (
          <Row className="product-grid">
            {Array.isArray(products) &&
              products.map((product) => (
                <Col
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="product-column"
                >
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        )}

        <div className="pagination-wrapper">
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword}
          />
        </div>

      </section>

    </div>
  );
}

export default HomeScreen;