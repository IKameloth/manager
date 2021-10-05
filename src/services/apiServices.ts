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
        console.log("CALL",`${environment.API_URI}/${targetUrl}`)
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
    console.log("response",response)
    const accessToken = response.headers.get("authorization");
    const resultData = await response.json();
    console.log("resultData", resultData)
    if (accessToken) {
      if (resultData.data.roles?.length > 0) {
        resultData.data.roles.data = resultData.included;
      };
      console.log("accessToken", accessToken)
      console.log("resultData.data", resultData.data)

      const response = {
        userData: resultData.data,
        userToken: accessToken,
      };

      return response;
    } else {
      return resultData;
    };
  };
};