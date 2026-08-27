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

class UserAPI {

  async getUserDetails() {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/users/profile/`,
        getAuthConfig()
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to fetch user profile"
      );
    }
  }

  async createUser(name, email, password) {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/register/`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Registration failed"
      );
    }
  }

  async updateUser(userId, updateData) {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/users/profile/update/`,
        updateData,
        getAuthConfig()
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Profile update failed"
      );
    }
  }

  async deleteUser(userId) {
    try {
      await axios.delete(
        `${API_URL}/api/users/delete/${userId}/`,
        getAuthConfig()
      );
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Unable to delete account"
      );
    }
  }

  async login(email, password) {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login/`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail ||
        error.message ||
        "Login failed"
      );
    }
  }
}

const userAPI = new UserAPI();

export default userAPI;