import React, { useEffect, useState } from "react";
import {Box, Card, CardActions, CardContent, CardHeader, Collapse, Fab, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, IconButtonProps, InputLabel, OutlinedInput, Theme, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MotionContainer, MotionItemUp } from "../Motion";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { DniRegCl, DniRegCol } from "@/app/helper/Regex";
import { useSelector } from "react-redux";
import { StoreState } from "@/app/store";
import { EnrollmentDataType } from "@/app/types";
import { TrxList } from "@/app/helper/TrxList";
import { AutentiaHeaderResources, autentiaTrxCaller} from "@/app/components/Autentia";
import Alerts from '@/app/components/Alerts';

const useStyles = makeStyles((theme: Theme) => ({
    centered: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow:
        "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
    },
}));

interface Props {
    isMinimized: boolean;
};

interface FormInput {
    dni: string;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
};

export default function FormEnrollment({ isMinimized }: Props) {
    const dispatcher = useDispatch();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const { common } = useSelector((state: StoreState) => state);
    const [dniReg, setDniReg] = useState<RegExp>();
    const [trxName, setTrxName] = useState<string>("");
    const { currentCountry, profile, currentInstitution } = common;

    useEffect(() => {
        isMinimized ? setExpanded(false) : setExpanded(true);
        filterDNI();
    }, [isMinimized]);

    const filterDNI = () => {
        switch (currentCountry) {
            case 'CHILE':
                setTrxName(TrxList.CL.enroll);
                setDniReg(DniRegCl);
                return ;
            case 'COLOMBIA':
                setTrxName(TrxList.COL.verifyMix);
                setDniReg(DniRegCol);
                return ;
        };
    };

    const { register, formState: { errors }, handleSubmit, setError, control } = useForm<FormInput>();

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        setIsLoading(true);
        let input;
        const output = ["Erc", "ErcDesc", "NroAudit", "RutMoc", "PuntajeNEC"];
        const { dni } = data;
        switch (currentCountry) {
            case ('CHILE'):
                input = {
                    RutMov: data.dni,
                };
                break;
            case ('COLOMBIA'):
                input = {
                    pRut: data.dni,
                    inPais: currentCountry,
                    inRutOper: profile.dni.match(DniRegCol) ? profile.dni : profile.dni.split('-')[0],
                    inNombreOper: profile.name,
                    inInstitucion: currentInstitution,
                };
                break;
        };
        if (dni.length === 0) {
            setError(
                "dni",
                { type: "required" },
                { shouldFocus: true }
            );
        } else {
            autentiaTrxCaller({ trxName, options: {input, output}})
                .then((data: EnrollmentDataType) => {
                    let erc = data.ParamsGet.erc;
                    let Erc = data.ParamsGet.Erc;
                    let ErcDesc = data.ParamsGet.ErcDesc;
                    let ercText = data.ParamsGet.ercText;
                    if (erc === 0 && Erc === 0) {
                        Alerts({
                            title: "Enrolamiento",
                            message: ErcDesc,
                            icon: "success",
                        });
                    } else {
                        Alerts({
                            title: "Enrolamiento",
                            message: ErcDesc,
                            icon: "error",
                        });
                    };
                })
                .catch((err) => console.log("error ", err));
        };
        setIsLoading(false);
    };

    return (
        <>
        <AutentiaHeaderResources />
        <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="100%"
        >
        <Grid item xs={12} sm={6} md={8} lg={4}>
            <MotionContainer>
            <Card className={classes.card}>
                <CardHeader
                title="DNI:"
                subheader="Debe ingresar el DNI para Enrolar"
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.centered}>
                    <MotionItemUp>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={errors.dni ? true : false}
                    >
                        <InputLabel htmlFor="dni">Ingresar DNI</InputLabel>
                        <OutlinedInput
                        id="dni"
                        label="Ingresar DNI"
                        type="text"
                        autoFocus
                        {...register("dni", {
                            pattern: dniReg, 
                        })}
                        error= {errors.dni ? true : false}
                        />
                        <FormHelperText id="serial-error">
                        {errors.dni
                            ? "Debe ingresar un Dni válido"
                            : "Ingresar Dni"}
                        </FormHelperText>
                    </FormControl>
                    </MotionItemUp>
                </CardContent>
                <CardActions style={{ padding: 16, justifyContent: "center" }}>
                    <MotionItemUp>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Fab
                        variant="extended"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                        size="medium"
                        >
                        Enrolar
                        </Fab>
                    )}
                    </MotionItemUp>
                </CardActions>
                </Collapse>
            </Card>
            </MotionContainer>
        </Grid>
        </Box>
        </>
    );
};