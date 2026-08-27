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
    products,
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
    <div>

      {!keyword && (
        <>
          <h2>TOP-RATED PRODUCTS</h2>
          <ProductCarousel />
        </>
      )}

      <h2 className="mt-3">
        LATEST PRODUCTS
      </h2>

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
        <Row>
          {products.map((product) => (
            <Col
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <Paginate
        page={page}
        pages={pages}
        keyword={keyword}
      />

    </div>
  );
}

export default HomeScreen;


//  <Paginate page={page} pages={pages} keyword={keyword} />  