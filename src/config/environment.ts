const dev = {
  LOCALHOST: "http://localhost:4000/",
};

const stg = {
  // por definir
  LOCALHOST: "http://localhost:4000/",
};

const prod = {
  // por definir
  LOCALHOST: "http://localhost:4000/",
};

export default window.location.href.includes('dev') 
  || window.location.href.includes('localhost') 
  || window.location.href.includes('127.0.0.1')  
    ? dev 
    : window.location.href.includes('stg') 
      ? stg 
      : prod