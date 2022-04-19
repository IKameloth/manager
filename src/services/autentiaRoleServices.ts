import environment from "../config/environment";

type Headers = {
  "Content-type"?: string
  "Authorization"?: string
}

export class AutentiaRoleServicesProvider {
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


  // GET USERS LIST
  public async getUsersList(token: string, country: string, institution: string, offset?: number) {
    const limit = 10
    if(!offset){
      offset = 0
    }
    const resp = await this.$httpClient.get(`autentia/roles?institution=${institution}&country=${country}&limit=${limit}&offset=${offset}`, {
      headers: { Authorization: token },
    });

    if (resp.status != 200) {
      return { error: resp.statusText, status: resp.status };
    }

    const respJson = await resp.json();
    return respJson;
  }

  // Search user
  public async searchUser(token: string, country: string, institution: string, dni: string) {
    const resp = await this.$httpClient.get(`autentia/roles/${dni}?institution=${institution}&country=${country}`, {
      headers: { Authorization: token },
    });

    if (resp.status != 200) {
      return { error: resp.statusText, status: resp.status };
    }

    const respJson = await resp.json();
    return respJson;
  }
  
  // Add Role
  public async addAutentiaRole(
    dni: string,
    name: string,
    institution: string,
    country: string,
    token: string
  ) {
    const res = await this.$httpClient.post(
      `autentia/roles`,
      {
        name,
        institution,
        country,
        dni
      },
      { headers: { Authorization: token } }
    );

    if (res.status != 200) {
      return { error: res.statusText, status: res.status };
    }

    const resJson = await res.json();
    return resJson;
  }

  // Remove Role
  public async removeRole(
    dni: string,
    name: string,
    institution: string,
    country: string,
    token: string
  ) {
    const res = await this.$httpClient.delete(
      `autentia/roles`,
      {
        name,
        institution,
        country,
        dni
      },
      { headers: { Authorization: token } }
    );

    if (res.status != 200) {
      return { error: res.statusText, status: res.status };
    }

    const resJson = await res.json();
    return resJson;
  }

  // GET INSTITUTIONS LIST
  public async getInstitutions(country: string, token: string) {
    const resp = await this.$httpClient.get(`institutions?country=${country}`, {
      headers: { Authorization: token },
    });

    if (resp.status != 200) {
      return { error: resp.statusText, status: resp.status };
    }

    const respJson = await resp.json();
    return respJson;
  }
}
