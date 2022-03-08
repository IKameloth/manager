import environment from "@/config/environment";

export class SensorServicesProvider {
    // ONLY GET SENSOR SERVICES
    private get $httpClient() {
        return {
            get(targetUrl: string, options?: {headers?: any}) {
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(options ? options.headers : {})
                    }
                }

                return fetch(`${environment.API_URI}/${targetUrl}`, requestOptions);
            },
            post(targetUrl: string, payload: unknown, options?: { headers?: any }) {
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
        }
    }

    // GET SENSOR
    public async getSensor(serial: string, country: string, technology: string, token: string) {
        const resp = await this.$httpClient.get(`autentia/sensors/{${serial}}?country=${country}&technology=${technology}`, {
            headers: { Authorization: token }
        });

        if (resp.status != 200) {
            return { error: resp.statusText, status: resp.status }
        }

        const respJson = await resp.json();
        return respJson;
    }

    // CREATE SENSOR
    public async createSensor(serial: string, country: string, technology: string, token: string) {
        const resp = await this.$httpClient.post(`sensors/{${serial}}`, {
            country,
            technology
        },
        { headers: { Authorization: token } });

        if (resp.status != 201) {
            return { error: resp.statusText, status: resp.status }
        }

        const respJson = await resp.json();
        return respJson;
    }
}
