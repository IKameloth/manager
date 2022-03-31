const local = {
  REACT_APP_DOMAIN: "http://localhost:3000",
  API_URI: "http://localhost:4000",
};

const dev = {
  REACT_APP_DOMAIN: "https://autentia-admin-dev.autentia.io",
  API_URI: "https://api-dev.autentiaplus.id/_alpha-legacy-api",
};

const stg = {
  REACT_APP_DOMAIN: "https://autentia-admin-staging.autentia.io",
  API_URI: "https://api-staging.autentiaplus.id/_alpha-legacy-api",
};

const prod = {
  REACT_APP_DOMAIN: "https://autentia-admin.autentia.io",
  API_URI: "https://api.autentiaplus.id/_alpha-legacy-api",
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
