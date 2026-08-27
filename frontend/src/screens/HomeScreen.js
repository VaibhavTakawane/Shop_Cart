import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetchProductList } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

  const { products, loading, error, page, pages } = productList;
  const { pageNumber } = useParams()
  const { products: topProducts, loading: topLoading, error: topError } = topRatedProducts;
  console.log(productList)
  let keyword =
    history.location
      .search;
  console.log(keyword)
  useEffect(() => {
    dispatch(fetchProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);


  return (
    <div>
      {!keyword && (
        <>
          <div style={{ fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>TOP-RATED PRODUCTS</div>
          <ProductCarousel />
        </>
      )}

      <div
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          color: "black",
          fontFamily: "MozAnimationDelay",
          marginTop: "10px",
        }}
      >
        LATEST PRODUCTS
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error}
        </Message>
      ) : products?.length > 0 ? (
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
      ) : (
        <Message variant="info">
          No products found.
        </Message>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
}


export default HomeScreen;


//  <Paginate page={page} pages={pages} keyword={keyword} />  