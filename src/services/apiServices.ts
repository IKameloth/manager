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
      put(targetUrl: string, payload: unknown, options?: { headers?: any }) {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            ...(options ? options.headers : {})
          },
          body: JSON.stringify(payload),
        }

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions)
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

  // Recover Pass
  public async recoverPass(dni: string) {
    const res = await this.$httpClient.post(`users/${dni}/recovery`, {})
    
    if (res.status === 404) {
      return { error: "Usuario no encontrado", status: res.status }
    }
    
    const resJson = await res.json()
    return resJson
  }

  // Get User
  public async getUser(dni: string) {
    const res = await this.$httpClient.get(`users/${dni}`)
    const resJson = await res.json()
    return resJson
  }

  // Update User
  public async updateUser(dni: string, name: string, email: string, password: string) {
    const res = await this.$httpClient.put(`users/${dni}`, {dni, name, email, password})
    const resJson = await res.json()
    return resJson
  }

  // Validate User Token
  public async validateToken(token: string) {
    const res = await this.$httpClient.post('users/validate', { token })
    
    if (res.status === 404) {
      return { error: "Token expirado o invalido", status: res.status }
    }
    
    return { message: res.statusText, status: res.status }
  }

  // Confirm User Account
  public async confirmUser(password: string, token: string) {
    const res = await this.$httpClient.post('users/confirm', { password, token, recovery: true })
    if (res.status != 200) {
      return { error: res.statusText, status: res.status }
    }

    const resJson = await res.json()
    return resJson.data
  }
};