import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

class UserAPI {

  async getUserDetails() {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const token = userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/api/users/profile/`,
        config
      );

      return data;

    } catch (error) {
      throw error;
    }
  }


  async createUser(name, email, password) {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/users/register/`,
        {
          name,
          email,
          password,
        },
        config
      );

      return data;

    } catch (error) {
      throw error;
    }
  }


  async updateUser(userId, updateData) {
    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const token = userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/users/profile/update/`,
        updateData,
        config
      );

      return data;

    } catch (error) {
      throw error;
    }
  }


  async deleteUser(userId) {
    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const token = userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${API_URL}/api/users/delete/${userId}/`,
        config
      );

    } catch (error) {
      throw error;
    }
  }


  async login(email, password) {
    try {

      const { data } = await axios.post(
        `${API_URL}/api/users/login/`,
        {
          username: email,
          password: password,
        }
      );

      return data;

    } catch (error) {
      throw error;
    }
  }
}

const userAPI = new UserAPI();

export default userAPI;