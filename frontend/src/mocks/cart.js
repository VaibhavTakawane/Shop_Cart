import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";


class CartAPI {
  async fetchProduct(productId) {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const cartAPI = new CartAPI();

export default cartAPI;


