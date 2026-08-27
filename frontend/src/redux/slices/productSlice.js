import { createSlice } from '@reduxjs/toolkit';
import productAPI from '../../mocks/product';

const initialState = {
  productList: { products: [], loading: false, error: null, page: 0, pages: 0 },
  productDetails: { product: { reviews: [] }, loading: false, error: null },
  createReview: { loading: false, error: null, success: false },
  topRatedProducts: { products: [], loading: false, error: null },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productListRequest(state) {
      state.productList.loading = true;
      state.productList.error = null;
    },
    productListSuccess(state, action) {
      state.productList.loading = false;
      state.productList.products = action.payload.products;
      state.productList.page = action.payload.page;
      state.productList.pages = action.payload.pages;
    },
    productListFailure(state, action) {
      state.productList.loading = false;
      state.productList.error = action.payload;
    },
    productDetailsRequest(state) {
      state.productDetails.loading = true;
      state.productDetails.error = null;
    },
    productDetailsSuccess(state, action) {
      state.productDetails.loading = false;
      state.productDetails.product = action.payload;
    },
    productDetailsFailure(state, action) {
      state.productDetails.loading = false;
      state.productDetails.error = action.payload;
    },
    createReviewRequest(state) {
      state.createReview.loading = true;
      state.createReview.error = null;
      state.createReview.success = false;
    },
    createReviewSuccess(state) {
      state.createReview.loading = false;
      state.createReview.success = true;
    },
    createReviewFailure(state, action) {
      state.createReview.loading = false;
      state.createReview.error = action.payload;
    },
    productTopRequest(state) {
      state.topRatedProducts.loading = true;
      state.topRatedProducts.error = null;
    },
    productTopSuccess(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.products = action.payload;
    },
    productTopFailure(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.error = action.payload;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListFailure,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  productTopRequest,
  productTopSuccess,
  productTopFailure,
} = productSlice.actions;

export const fetchProductList =
  (keyword = "", pageNumber = "") =>
    async (dispatch) => {
      try {
        dispatch(productListRequest());

        const data = await productAPI.getProductList(
          keyword,
          pageNumber
        );

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        const page = Array.isArray(data)
          ? 1
          : data?.page || 1;

        const pages = Array.isArray(data)
          ? 1
          : data?.pages || 1;

        dispatch(
          productListSuccess({
            products,
            page,
            pages,
          })
        );
      } catch (error) {
        dispatch(
          productListFailure(
            error?.response?.data?.detail ||
            error?.message ||
            String(error)
          )
        );
      }
    };

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    const productDetails = await productAPI.getProductDetails(id);
    dispatch(productDetailsSuccess(productDetails));
  } catch (error) {
    dispatch(
      productListFailure(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unable to load products"
      )
    );
  }
};

export const createReview = (productId, review) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());

    await productAPI.createProductReview(productId, review);
    dispatch(createReviewSuccess());
  } catch (error) {
    dispatch(
      productListFailure(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Unable to load products"
      )
    );
  }
};

export const fetchTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRequest());

    const data = await productAPI.getTopRatedProducts();

    const products = Array.isArray(data)
      ? data
      : Array.isArray(data?.products)
        ? data.products
        : [];

    dispatch(productTopSuccess(products));
  } catch (error) {
    dispatch(
      productTopFailure(
        error?.response?.data?.detail ||
        error?.message ||
        String(error)
      )
    );
  }
};

export const { reducer } = productSlice;
export default productSlice;
