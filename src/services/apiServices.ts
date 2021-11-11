import environment from "../config/environment";

export class ApiServicesProvider {
  private get $httpClient() {
    return {
      post(targetUrl: string, payload: unknown, options?: { headers?: any }){
        const requestOptions = {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            ...(options ? options.headers : {})
          },
          body: JSON.stringify(payload),
        };
        
        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
      get(targetUrl: string, options?: { headers?: any}){
        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            ...(options ? options.headers : {})
          }
        };

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
    };
  };

  // Login
  public async sendLoginRequest(password: string, dni: string) {
    const response = await this.$httpClient.post('login', { user: { dni, password } });
    const accessToken = response.headers.get("authorization");
    const resultData = await response.json();
    if (accessToken) {
      if (resultData.data.roles?.length > 0) {
        resultData.data.roles.data = resultData.included;
      };
    
      const response = {
        userData: resultData.data,
        userToken: accessToken,
      };

      return response;
    } else {
      return resultData;
    };
  };

  // Get Countries
  public async getCountries() {
    const response = await this.$httpClient.get('countries', {  });
    const resultData = await response.json();
    return resultData
  };

  // Get Roles
  public async getRoles(token: string, userID: string, country: string) {
    const response = await this.$httpClient.get(`roles/${userID}/${country}`, {  });
    const resultData = await response.json();
    return resultData
  };

  // Get Users
  public async getUsers() {
    const res = await this.$httpClient.get('users', {  })
    const resJson = await res.json()
    return resJson
  }

  // Post User
  public async postUser(name: string, dni: string, email: string) {
    const res = await this.$httpClient.post('users', { name, dni, email })
    const resJson = await res.json()
    return resJson
  }
};