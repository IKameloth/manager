import environment from "../config/environment";

type Headers = {
  "Content-type"?: string
  "Authorization"?: string
}

export class ApiServicesProvider {
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

  // Login
  public async sendLoginRequest(password: string, dni: string) {
    const res = await this.$httpClient.post("login", {
      user: { dni, password },
    });

    const accessToken = res.headers.get("authorization");
    const resJson = await res.json();

    if (res.status === 401) {
      return { error: "Dni ó Contraseña incorrecta", status: res.status };
    }

    if (accessToken) {
      if (resJson.data.roles?.length > 0) {
        resJson.data.roles.data = resJson.included;
      }

      const finalResp = {
        user: resJson.data,
        token: accessToken,
      };

      return finalResp;
    } else {
      return resJson;
    }
  }

  // Get Countries
  public async getCountries(token: string) {
    const response = await this.$httpClient.get("countries", {
      headers: { Authorization: token },
    });

    if (response.status === 401) {
      return { error: "User not allowed", status: response.status };
    }

    const resultData = await response.json();
    return resultData;
  }

  // Get Roles
  public async getRoles(userID: string, country: string, token: string) {
    const response = await this.$httpClient.get(`roles/${userID}/${country}`, {
      headers: { Authorization: token },
    });
    const resultData = await response.json();
    return resultData;
  }

  // Get Users
  public async getUsers(token: string) {
    const res = await this.$httpClient.get("users", {
      headers: { Authorization: token },
    });

    switch (res.status) {
      case 200:
        const resJson = await res.json();
        return resJson;
      case 401:
        return { error: "Usuario no permitido", status: res.status };
      default:
        return { error: "Imposible retornar los datos", status: res.status };
    }
  }

  // Post User
  public async postUser(
    name: string,
    dni: string,
    email: string,
    token: string
  ) {
    const res = await this.$httpClient.post("users", {
      name,
      dni,
      email,
      token,
    });

    if (res.status === 400) {
      return { error: res.statusText, status: res.status };
    }

    const resJson = await res.json();
    return resJson;
  }

  // Recover Pass
  public async recoverPass(dni: string) {
    const res = await this.$httpClient.post(`users/${dni}/recovery`, {});

    switch (res.status) {
      case 401:
        return { error: "Usuario inhabilitado", status: res.status };
      case 404:
        return { error: "Usuario no encontrado", status: res.status };
      default:
        const resJson = await res.json();
        return resJson;
    }
  }

  // Get User
  public async getUser(dni: string, token: string) {
    const res = await this.$httpClient.get(`users/${dni}`, {
      headers: { Authorization: token },
    });

    if (res.status === 401) {
      return { error: "Usuario inhabilidato", status: res.status };
    }

    const resJson = await res.json();
    return resJson;
  }

  // Get Roles by User Id
  public async getRolesByUserId(userId: string, token: string) {
    const res = await this.$httpClient.get(`roles/${userId}`, {
      headers: { Authorization: token },
    });
    const resJson = await res.json();
    return resJson.data;
  }

  // Update User
  public async updateUser(
    dni: string,
    status: boolean,
    token: string,
    name?: string,
    email?: string,
    password?: string,
  ) {
    const res = await this.$httpClient.put(
      `users/${dni}`,
      {
        name,
        email,
        password,
        status,
      },
      { headers: { Authorization: token } }
    );
    const resJson = await res.json();
    return resJson;
  }

  // Ban-Unban User
  public async banUser(dni: string, status: boolean, token: string) {
    const res = await this.$httpClient.put(
      `users/${dni}`,
      {
        dni,
        status,
      },
      { headers: { Authorization: token } }
    );

    const resJson = await res.json();
    return resJson;
  }

  // Validate User Token
  public async validateToken(token: string) {
    const res = await this.$httpClient.post("users/validate", { token });
    if (res.status === 404) {
      return { error: "Token expirado o invalido", status: res.status };
    }

    return { message: res.statusText, status: res.status };
  }

  // Confirm User Account
  public async confirmUser(password: string, token: string) {
    const res = await this.$httpClient.post("users/confirm", {
      password,
      token,
      recovery: true,
    });

    if (res.status != 200) {
      return { error: res.statusText, status: res.status };
    }

    const resJson = await res.json();
    return resJson.data;
  }

  // Assign Role
  public async assignNewRole(
    dni: string,
    role: string,
    institution: string,
    country: string,
    token: string
  ) {
    const res = await this.$httpClient.post(
      `users/${dni}/role`,
      {
        role,
        institution,
        country,
      },
      { headers: { Authorization: token } }
    );

    if (res.status != 200) {
      return { error: "Rol no permitido", status: res.status };
    }

    const resJson = await res.json();
    return resJson;
  }

  // Remove Role
  public async removeRole(
    userId: string,
    name: string,
    institution: string,
    country: string,
    token: string
  ) {
    const res = await this.$httpClient.delete(
      `roles/${userId}`,
      {
        name,
        institution,
        country,
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
