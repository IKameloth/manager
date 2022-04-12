export type SensorType = {
    code: string;
    date_from: string;
    date_to: string;
    description: string;
    external_code: string;
    institution: string;
    last_operator: string;
    location: string;
    location_code: string;
    logon_dni: string;
    logon_type: number;
    register_at: Date;
    technology: string;
    result: { error: string; glosa: string };
}