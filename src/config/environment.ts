const local = {
  REACT_APP_DOMAIN: "http://localhost:3000",
  API_URI: "http://localhost:4000",
  BASE_KEY: "743bd500-1c24-424b-9065-acc657613eca"
};

const dev = {
  REACT_APP_DOMAIN: "https://autentia-admin-dev.autentia.io",
  API_URI: "https://api-dev.autentiaplus.id/_alpha-legacy-api",
  BASE_KEY: "62fa1490-8284-48ae-aaf7-30abad0a6887"
};

const stg = {
  REACT_APP_DOMAIN: "https://autentia-admin-staging.autentia.io",
  API_URI: "https://api-staging.autentiaplus.id/_alpha-legacy-api",
  BASE_KEY: "ec8bbef2-70c3-4987-a6fa-f661c43f4df2"
};

const prod = {
  REACT_APP_DOMAIN: "https://autentia-admin.autentia.io",
  API_URI: "https://api.autentiaplus.id/_alpha-legacy-api",
  BASE_KEY: "83a5a274-7420-4b97-b9a2-ecfbc40da025"
};

export default window.location.href.includes("localhost") ||
window.location.href.includes("127.0.0.1") ||
window.location.href.includes(":3000")
  ? local
  : window.location.href.includes("dev")
  ? dev
  : window.location.href.includes("staging")
  ? stg
  : prod;
