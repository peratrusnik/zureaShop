import axios from "axios";

export const RandomCategory = () => axios.get("/category/rand");
export const AllCategories = () => axios.get("/category/all");
export const AddCategory = (payload) => axios.post("/category/add", payload);
export const RemoveCategory = (id) => axios.delete(`/category/${id}`);
export const getCategory = (id) => axios.get(`/category/${id}`);
export const UpdateCategory = (payload) =>
  axios.put("category/update", payload);
