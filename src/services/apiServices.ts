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

        return fetch(`${environment.LOCALHOST}${targetUrl}`, requestOptions);
      },
    };
  };

  public async sendLoginRequest(password: string, dni: string, country: string) {
    const response = await this.$httpClient.post('/login', { user: { rut: dni, password: password, country: country } });
    const data = await response.json();

    return data; // return undefined
  };
};

