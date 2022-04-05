// LIKE CGI RESPONSE
export type SensorType = {
    technology: string,
    code: string,
    externalCode: string,
    institution: string,
    location: string,
    locationCode: string,
    description: string,
    registerAt: string,
    logonType: number,
    logonDNI: string,
    lastOperator: string,
    dateFrom: string,
    dateTo: string,
    result: {
        error: string,
        detail: string
    }
}