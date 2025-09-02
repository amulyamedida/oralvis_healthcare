import axios from "axios";

const API = "https://oralvis-healthcare-0920.onrender.com/api/scans";


export const uploadScan = async (token, formData) => {
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const fetchScans = async (token) => {
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
