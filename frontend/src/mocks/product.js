import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

class ProductAPI {
  async getProductList(keyword = "", pageNumber = "") {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products${keyword}`,
        {
          params: {
            page: pageNumber,
          },
        }
      );

      return data;
    } catch (error) {
      throw error.response?.data?.detail || error.message;
    }
  }

  async getProductDetails(productId) {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${productId}/`
      );

      return data;
    } catch (error) {
      throw error.response?.data?.detail || error.message;
    }
  }

  async createProductReview(productId, review) {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const token = userInfo?.token;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/reviews/`,
        review,
        config
      );

      return data;
    } catch (error) {
      throw error.response?.data?.detail || error.message;
    }
  }

  async getTopRatedProducts() {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/top/`
      );

      return data;
    } catch (error) {
      throw error.response?.data?.detail || error.message;
    }
  }
}

const productAPI = new ProductAPI();

export default productAPI;