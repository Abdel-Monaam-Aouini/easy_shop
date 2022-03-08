import axios from "axios";

const { VITE_APP_BASE_URL } = import.meta.env;

const fetchData = (url) => {
  return axios
    .get(`${VITE_APP_BASE_URL}/${url}`)
    .then(({ data }) => data);
};

export default fetchData;
