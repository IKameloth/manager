import React, { useEffect, useState } from "react";
import {Box, Card, CardActions, CardContent, CardHeader, Collapse, Fab, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, IconButtonProps, InputLabel, OutlinedInput, Theme, } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MotionContainer, MotionItemUp } from "../Motion";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { DniRegCl, DniRegCol } from "@/app/helper/Regex";
import { StoreState } from "@/app/store";
import ErrorAlert from "../ErrorAlert";
import { EnrollmentDataType } from "@/app/types";
import { useSelector } from "react-redux";
import { TrxList } from "@/app/helper/TrxList";
import { AutentiaHeaderResources, autentiaTrxCaller} from "@/app/components/Autentia";
import toast from "react-hot-toast";
  
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
  
export default function FormReEnrollment({ isMinimized }: Props) {
    const dispatcher = useDispatch();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const { common } = useSelector((state: StoreState) => state);
    const [dniReg, setDniReg] = useState<RegExp>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [trxName, setTrxName] = useState<string>("");
    const { currentCountry, profile, currentInstitution } = common;

    useEffect(() => {
        isMinimized ? setExpanded(false) : setExpanded(true);
        filterDNI();
    }, [isMinimized]);

    const filterDNI = () => {
        switch (currentCountry) {
            case 'CHILE':
                setTrxName(TrxList.CL.reEnroll);
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
                .then((data:EnrollmentDataType) => {
                    let erc = data.ParamsGet.erc;
                    let Erc = data.ParamsGet.Erc;
                    let ErcDesc = data.ParamsGet.ErcDesc;
                    let ercText = data.ParamsGet.ercText;
                    if (erc === 0 && Erc === 0) {
                        toast.success("DNI Re Enrolado", { duration: 4000 });
                    } else {
                        setErrorMessage(ErcDesc);
                    };
                })
                .catch((err) => console.log("error ", err));
        };
        setIsLoading(false);
    };
    
    const handleCloseError = () => {
        setErrorMessage('');
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
                subheader="Debe ingresar el DNI para Re-Enrolar"
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.centered}>
                    <MotionItemUp>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={errors.dni ? true : false}
                    >
                        <InputLabel htmlFor="serial">Ingresar DNI</InputLabel>
                        <OutlinedInput
                        id="serial"
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
                        Registrar
                        </Fab>
                    )}
                    </MotionItemUp>
                </CardActions>
                </Collapse>
            </Card>
            </MotionContainer>
            {errorMessage && (
                <ErrorAlert
                onOpen={!!errorMessage}
                onClose={handleCloseError}
                message={errorMessage}
                />
            )}
        </Grid>
        </Box>
        </>
    );
};