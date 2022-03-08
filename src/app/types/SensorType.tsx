// LIKE CGI RESPONSE
export type SensorType = {
    Techonology: string,
    Code: string,
    ExternalCode: string,
    Institution: string,
    Location: string,
    LocationCode: string,
    Description: string,
    RegisterAt: string,
    LogonType: number,
    LogonDNI: string,
    LastOperator: string,
    DateFrom: string,
    DateTo: string,
    Result: {
        Error: string,
        Detail: string
    }
}