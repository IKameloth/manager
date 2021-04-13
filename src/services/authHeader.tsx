export default function authHeader() {
  const accessToken:string = JSON.parse(localStorage.getItem("accessToken"));

  if (accessToken) {
    return { 
      "Content-Type": "application/json",
      "Authorization": accessToken
    }
  } else {
    return { 
      "Content-Type": "application/json"
    }
  };
};
