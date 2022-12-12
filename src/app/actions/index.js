import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../service/axiosInstance";

const baseURL = instance.defaults.baseURL;

// GET ALL USER
export const getUsers = createAsyncThunk("users/usersFetched", async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data.items;
  } catch (error) {
    alert.error(error);
  }
});

// GET ONE USER
export const getUser = createAsyncThunk("user/userFetched", async (userId) => {
  try {
    const user = await axios.get(`${baseURL}/${userId}`);
    return user.data;
  } catch (error) {
    alert.error(error);
  }
});

// ADD USER
export const addUser = createAsyncThunk(
  "users/userAdded",
  async ({
    firstName,
    lastName,
    gender,
    phone,
    address,
    dateOfBirth,
    school,
    isGraduate,
    email,
    favourites,
  }) => {
    try {
      const newUser = {
        firstName,
        lastName,
        gender,
        phone,
        address,
        dateOfBirth,
        school,
        isGraduate,
        email,
        favourites,
      };

      await axios.post(baseURL, newUser);

      return newUser;
    } catch (error) {
      alert.error(error);
    }
  }
);

// UPDATE USER
export const updateUser = (userId, dataUser) => {
  return axios.put(`${baseURL}/${userId}`, dataUser);
};

// DELETE USER
export const deleteUser = createAsyncThunk(
  "users/userDeleted",
  async (userId) => {
    try {
      await axios.delete(`${baseURL}/${userId}`);
      return userId;
    } catch (error) {
      alert.error(error);
    }
  }
);
// LOADING

export const loadingItem = () => {};
