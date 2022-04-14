import React from "react";
import Swal , { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Props {
  title?: string;
  message?: string;
  icon?: SweetAlertIcon;
  timer?: number;
}

const Alerts = async ({ title, message, icon, timer}: Props) => {
  await MySwal.fire({
    title: title,
    html: message,
    icon: icon,
    timer: timer,
  });
};

export default Alerts;
