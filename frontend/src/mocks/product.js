import axios from "axios";
import { API_URL } from "../config";

class ProductAPI {

  async getProductList(keyword = "", pageNumber = "") {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/`,
        {
          params: {
            keyword,
            page: pageNumber || 1,
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to load products"
      );
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