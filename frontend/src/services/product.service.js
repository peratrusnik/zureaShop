import axios from "axios";

export const GetAllProducts = (elPerPage, page) =>
  axios.get(`/product/get-all/${elPerPage}/${page}`);

export const SearchProducts = (searchParam) =>
  axios.post("/product/search", { searchParam: searchParam });

export const GetProduct = (productId) => axios.get(`/product/get/${productId}`);

export const GetTopTwoProducts = () => axios.get("/product/top-two");

export const getSingleDetailProduct = (id) =>
  axios.get(`/productDetails/${id}`);

export const CreateProduct = (payload) =>
  axios.post("/product/create", payload);
export const UpdateProduct = (payload) => axios.put("product/update", payload);
export const getProductByCategoryId = (id) => axios.get(`/product/${id}`);
