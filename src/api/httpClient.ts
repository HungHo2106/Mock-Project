import axios from "axios";

const getToken = () => {
  const token = sessionStorage.getItem("userToken");
  const bearer = `Bearer ${token}`;
  return bearer;
};

export const httpClient = axios.create({
  baseURL: "https://api.realworld.io/api",
  timeout: 10000,
  headers: {
    "X-Custom-Header": "foobar",
    Authorization: getToken(),
  },
});

httpClient.interceptors.request.use((config: any) => {
  config.headers.Authorization = getToken();
  console.log(config);
  return config;
});
