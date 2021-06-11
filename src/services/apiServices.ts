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
      get(targetUrl: string, options?: { headers?: any}){
        const requestOptions = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            ...(options ? options.headers : {})
          }
        };

        return fetch(`${environment.LOCALHOST}${targetUrl}`, requestOptions);
      },
    };
  };

  // Login
  public async sendLoginRequest(password: string, dni: string, country: string) {
    const response = await this.$httpClient.post('login', { user: { rut: dni, password: password, country: country } });

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

  // List user institutions
  public async sendInstitutionsRequest(){
    const token = authServices.getToken();
    const res = await this.$httpClient.get('institutions/list', { headers: {'Authorization': token}});
    const data = await res.json();

    if (data.error && data.error[0].status === 401) {
      // user not allowed if token does not exists
      throw new Error('Imposible obtener instituciones.');
    } else {
      return data;
    };
  };
};
