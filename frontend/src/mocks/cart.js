import axios from "axios";
import { API_URL } from "../config";

class CartAPI {

  async fetchProduct(productId) {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${productId}/`
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to fetch product"
      );
    }
  }
}

const cartAPI = new CartAPI();

export default cartAPI;