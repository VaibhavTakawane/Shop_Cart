import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

class ProductAPI {

  async getProductList(keyword = "", pageNumber = "") {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${keyword}`,
        {
          params: {
            page: pageNumber,
          },
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProductDetails(productId) {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${productId}/`
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to load product"
      );
    }
  }

  async createProductReview(productId, review) {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "null"
      );

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/reviews/`,
        review,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token || ""}`,
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to submit review"
      );
    }
  }

  async getTopRatedProducts() {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/top/`
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to load top products"
      );
    }
  }
}

const productAPI = new ProductAPI();

export default productAPI;