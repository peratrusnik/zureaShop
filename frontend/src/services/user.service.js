import axios from "axios";

export const UserProducts = (id) => axios.get("/user/products/" + id);
export const activateAccount = (id) =>
  axios.get(`/user/activate-account/${id}`);
export const getAllUsers = (elPerPage, page) => axios.get(`/user/get-all/${elPerPage}/${page}`)
export const getUserById = (id) => axios.get(`/user/${id}`);
export const getSubscribers = () => axios.get("/subscribers");
export const saveUserOrder = (payload) => axios.post('/user/order', payload)
export const ChangeUserActiveStatus = (body) => axios.put(`/user/activeStatus`, body)
export const DeleteUser = (id) => axios.delete(`/user/deleteUser/${id}`)
export const SearchUser = (body) => axios.post(`/user/search`, body)