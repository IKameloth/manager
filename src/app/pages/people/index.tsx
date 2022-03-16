import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import Section from "@/app/components/Section";
import { TitleBar } from "@/app/components/Admin";
import SearchIcon from "@material-ui/icons/Search";
import { MotionContainer, MotionItemUp } from "@/app/components/Motion";
import { useForm, SubmitHandler } from "react-hook-form";

type IForm = {
  dni: string;
};

export default function People() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const sendForm: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  const handleTest = () => {};

  return (
    <Container>
      <Section>
        <Grid container spacing={8}>
          <TitleBar
            title="TESTING"
            subTitle="plugin autentia"
            btnText="test"
            btnAction={handleTest}
          />
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            width="100%"
          >
            <Grid item xs={12} sm={6} md={8} lg={4}>
              <MotionContainer>
                <Card>
                  <CardHeader title="Verificacion contra Base" />
                  <CardContent>
                    <MotionItemUp>
                      <form onSubmit={handleSubmit(sendForm)}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          error={errors.dni ? true : false}
                        >
                          <InputLabel htmlFor="dni">Ingresar DNI</InputLabel>
                          <OutlinedInput
                            id="dni"
                            label="Ingresar dni"
                            type="text"
                            autoFocus
                            {...register("dni", {
                              required: true,
                              validate: {
                                required: (value) => !!value.trim().length,
                              },
                            })}
                          />
                          <FormHelperText id="dni-error">
                            {errors.dni && errors.dni.type === "required" && (
                              <span>Campo requerido</span>
                            )}
                          </FormHelperText>
                        </FormControl>

                        <CardActions
                          style={{ padding: 16, justifyContent: "center" }}
                        >
                          <Fab
                            variant="extended"
                            color="primary"
                            onClick={handleSubmit(sendForm)}
                            size="medium"
                          >
                            <SearchIcon />
                            Consultar
                          </Fab>
                        </CardActions>
                      </form>
                    </MotionItemUp>
                  </CardContent>
                </Card>
              </MotionContainer>
            </Grid>
          </Box>
        </Grid>
      </Section>
    </Container>
  );
}
