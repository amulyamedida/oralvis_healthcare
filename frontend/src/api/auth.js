import axios from "axios";

const API = axios.create({
  baseURL: "https://oralvis-healthcare-0920.onrender.com/api", 
});


export const signup = ({ email, password, role }) =>
  API.post("/auth/signup", { email, password, role });


export const login = ({ email, password }) =>
  API.post("/auth/login", { email, password });

export default API;
