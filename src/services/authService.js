const API_URL = "http://localhost:4000"

export const register = async(rut, email, name, country, password) => {
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

const login = async(rut, password, country) => {
  let err = new Error();
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
    err.status = status;
    err.message = data.error;
    throw err;
  }

  if (accessToken) {
    console.log(accessToken);
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
