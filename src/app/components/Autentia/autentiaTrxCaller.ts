import { v4 as uuidv4 } from "uuid";

declare var plgAutentiaJS: any;

type Input = {
  rut?: string;
  Nac?: string;
  inTipoCedula?: number;
  pRut?: string;
  inPais?: string;
  inRutOper?: string;
  inNombreOper?: string;
  inInstitucion?: string;
  RutMov?: string;
};

interface Props {
  trxName: string;
  options: {
    input?: Input;
    output: string[];
  };
}

export const autentiaTrxCaller = ({ trxName, options }: Props) => {
  return new Promise((resolve, reject) => {
    console.log(options.input);
    const $autentia = new plgAutentiaJS();
    const token = uuidv4();
    const callBack = (resp: any) => resolve(resp);

    try {
      $autentia.Transaccion2(
        trxName,
        options.input,
        options.output,
        true,
        token,
        callBack
      );
    } catch (err) {
      reject(err);
    }
  });
};
