import authHeader from "./authHeader";

const API_URL = "http://localhost:4000/";

export const getUsersBoard = async() => {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  const response = await fetch(`${API_URL}users`, requestOptions);
  const result = await response.json();
  return result;
};
