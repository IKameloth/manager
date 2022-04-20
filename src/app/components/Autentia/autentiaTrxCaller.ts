import { v4 as uuidv4 } from "uuid";
import { ParamsGetType } from "@/app/types"
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
};

export const autentiaTrxCaller = ({ trxName, options }: Props) => {
  return new Promise<ParamsGetType>((resolve, reject) => {
    const $autentia = new plgAutentiaJS();
    const token = uuidv4();
    const callBack = (resp: ParamsGetType) => resolve(resp);

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
