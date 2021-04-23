import environment from "../config/environment";
import AuthService from "../config/authServices";

const authServices = new AuthService();

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

        return fetch(`${environment.LOCALHOST}${targetUrl}`, requestOptions);
      },
    };
  };

  // Login
  public async sendLoginRequest(password: string, dni: string, country: string) {
    const response = await this.$httpClient.post('/login', { user: { rut: dni, password: password, country: country } });

    const accessToken = response.headers.get("authorization");
    const data = await response.json();
    const status = await response.status;

    if (accessToken) {
      authServices.setUser(data.data);
      authServices.setToken(accessToken);

      return data.data;
    };

    if (status === 401) {
      throw new Error(data.error);
    };
  };

  // Register
};

