//@ts-nocheck
export default class AuthService {
  setUser(data) {
    localStorage.setItem("user", JSON.stringify(data.attributes));
  };

  setToken(accessToken) {
    localStorage.setItem("access_token", accessToken);  
  };

  getToken() {
    const access_token = localStorage.getItem("access_token");
    return access_token;
  }

  isAuthenticated = () => {
    const access_token = localStorage.getItem("access_token");
    return !!access_token;
  };

  getUserInfo = () => {
    const userData = localStorage.getItem("user");
    return JSON.parse(userData);
  };

  signoutRedirectCallback = () => {
    localStorage.clear();
    window.location.replace("/");
  };
};
