const API_URL = "http://localhost:4000"

export const register = async(rut:string, email:string, name:string, country:string, password:string) => {
  const user = {
    rut: rut,
    email: email,
    name: name,
    country: country,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  };

  const response = await fetch(API_URL + "/sign_up", requestOptions);
  const data = await response.json();
  console.log("REGISTER: " + data );
  return data;
};

const login = async(rut:string, password:string, country:string) => {
  const user = {
    user: {
      rut: rut,
      password: password,
      country: country,    
    }
  };

  const requestOptions = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  };

  const response = await fetch(API_URL + "/login", requestOptions);
  const accessToken = response.headers.get("authorization");
  const data = await response.json();
  const status = await response.status;

  if (status === 401) {
    throw new Error(data.error);
  }

  if (accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("accessToken", accessToken);
  };

  return {data: data, accessToken: accessToken};
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

export default {
  login,
  logout
};
