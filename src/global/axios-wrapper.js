import axios from "axios";
import qs from "qs";

const getToken = function() {
  return localStorage.getItem("access_token");
};

const client = axios.create({
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat",skipNulls: true })
});

client.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

const request = function(options) {
  const onSuccess = function(response) {
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function(error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
