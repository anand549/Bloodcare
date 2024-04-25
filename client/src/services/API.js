import axios from "axios";

//creating auxios intercepter------ iski help se network request send karenge node server par

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API; 

// ab is APi ki help se CRUD operation perform kar sakte h



