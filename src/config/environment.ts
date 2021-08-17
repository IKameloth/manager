const dev = {
  API_URI: process.env.LEGACY_API_URL,
};

const stg = {
  API_URI: process.env.LEGACY_API_URL,
};

const prod = {
  API_URI: process.env.LEGACY_API_URL,
};

export default window.location.href.includes('dev') 
  || window.location.href.includes('localhost') 
  || window.location.href.includes('127.0.0.1')  
    ? dev 
    : window.location.href.includes('stg') 
      ? stg 
      : prod