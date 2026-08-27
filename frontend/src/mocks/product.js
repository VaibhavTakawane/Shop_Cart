import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

class ProductAPI {

  async getProductList(keyword = "", pageNumber = "") {
    try {

      const { data } = await axios.get(
        `${API_URL}/api/products/`,
        {
          params: {
            keyword: keyword,
            page: pageNumber || 1,
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
      throw error;
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
          "Content-Type": "application/json",
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
      throw error;
    }
  }


  async getTopRatedProducts() {
    try {

      const { data } = await axios.get(
        `${API_URL}/api/products/top/`
      );

      return data;

    } catch (error) {
      throw error;
    }
  }
}

const productAPI = new ProductAPI();

export default productAPI;