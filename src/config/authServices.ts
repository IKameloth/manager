//@ts-nocheck
export default class AuthService {
  setUser(data) {
    localStorage.setItem("user", JSON.stringify(data.attributes));
  };

  setToken(accessToken) {
    localStorage.setItem("access_token", accessToken);  
  };

  isAuthenticated = () => {
    const access_token = localStorage.getItem("access_token");
    return !!access_token;
  };

  getUserInfo = () => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    info = {
      user: userData,
      access_token: token
    };

    return info;
  };

  signoutRedirectCallback = () => {
    console.log("SignOut");
    localStorage.clear();
    window.location.replace("/");
  };
};
