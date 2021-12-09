const dev = {
  REACT_APP_DOMAIN: "https://autentia-admin-dev.autentia.io",
  API_URI: "https://api-dev.autentiaplus.id/_alpha-legacy-api"
};

const stg = {
  REACT_APP_DOMAIN: "https://autentia-admin-staging.autentia.io",
  API_URI: "https://api-staging.autentiaplus.id/_alpha-legacy-api"
};

const prod = {
  REACT_APP_DOMAIN: "https://autentia-admin.autentia.io",
  API_URI: "https://api.autentiaplus.id/_alpha-legacy-api"
};

export default window.location.href.includes('dev') 
  || window.location.href.includes('localhost') 
  || window.location.href.includes('127.0.0.1')  
    ? dev 
    : window.location.href.includes('staging') 
      ? stg 
      : prod