import axios from "axios";
import { API_URL } from "../config";

const getAuthConfig = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "null"
  );

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.token || ""}`,
    },
  };
};

class OrderAPI {

  async createOrder(order) {
    const { data } = await axios.post(
      `${API_URL}/api/orders/add/`,
      order,
      getAuthConfig()
    );

    return data;
  }

  async getOrderDetails(id) {
    const { data } = await axios.get(
      `${API_URL}/api/orders/${id}/`,
      getAuthConfig()
    );

    return data;
  }

  async payOrder(id, paymentResult) {
    const { data } = await axios.put(
      `${API_URL}/api/orders/${id}/pay/`,
      paymentResult,
      getAuthConfig()
    );

    return data;
  }

  async listMyOrders() {
    const { data } = await axios.get(
      `${API_URL}/api/orders/myorders/`,
      getAuthConfig()
    );

    return data;
  }
}

const orderAPI = new OrderAPI();

export default orderAPI;