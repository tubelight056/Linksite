const dev = {
  API_URL: "https://linksite-backend.herokuapp.com",
};

const prod = {
  API_URL: "https://linksite-backend.herokuapp.com",
};
const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;
