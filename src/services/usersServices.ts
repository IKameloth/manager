import environment from "../config/environment";

type Headers = {
  "Content-type"?: string
  "Authorization"?: string
}

export class UsersServicesProvider {
  private get $httpClient() {
    return {
      post(targetUrl: string, payload: unknown, options?: { headers?: Headers }) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            ...(options ? options.headers : {}),
          },
          body: JSON.stringify(payload),
        };

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
      put(targetUrl: string, payload: unknown, options?: { headers?: Headers }) {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            ...(options ? options.headers : {}),
          },
          body: JSON.stringify(payload),
        };

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
      get(targetUrl: string, options?: { headers?: Headers }) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options ? options.headers : {}),
          },
        };

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
      delete(targetUrl: string, payload: unknown, options?: { headers?: Headers }) {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            ...(options ? options.headers : {}),
          },
          body: JSON.stringify(payload),
        };

        return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
      },
    };
  }
}