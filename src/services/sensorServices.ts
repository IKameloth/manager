import environment from "@/config/environment";

type Headers = {
  "Content-type"?: string;
  Authorization?: string;
};

export class SensorServicesProvider {
  // ONLY GET SENSOR SERVICES
  private get $httpClient() {
    return {
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
      post(
        targetUrl: string,
        payload: unknown,
        options?: { headers?: Headers }
      ) {
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
    };
  }

  // GET SENSOR
  public async getSensor(
    serial: string,
    country: string,
    technology: string,
    token: string
  ) {
    const resp = await this.$httpClient.get(
      `autentia/sensors/${serial}?country=${country}&technology=${technology}`,
      {
        headers: { Authorization: token },
      }
    );

    if (resp.status != 200) {
      return { error: resp.statusText, status: resp.status };
    }

    const respJson = await resp.json();
    if (respJson.data.code === "")
      return { error: "Sensor no encontrado", status: 404 };

    return respJson.data;
  }

  // CREATE SENSOR
  public async createSensor(
    serial: string,
    institution: string,
    country: string,
    location: string,
    logonType: number,
    technology: string,
    token: string
  ) {
    const resp = await this.$httpClient.post(
      "autentia/sensors",
      {
        code: serial,
        location,
        country,
        institution,
        technology,
        logon: logonType.toString(),
      },
      { headers: { Authorization: token } }
    );

    if (resp.status != 200) {
      return { error: resp.statusText, status: resp.status };
    }

    const respJson = await resp.json();
    return respJson.data;
  }
}
