const dev = {
  LOCALHOST: process.env.LEGACY_API_URL,
};

const stg = {
  // por definir
  LOCALHOST: process.env.LEGACY_API_URL,
};

const prod = {
  // por definir
  LOCALHOST: process.env.LEGACY_API_URL,
};

export default window.location.href.includes('dev') 
  || window.location.href.includes('localhost') 
  || window.location.href.includes('127.0.0.1')  
    ? dev 
    : window.location.href.includes('stg') 
      ? stg 
      : prod