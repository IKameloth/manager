import React from "react";
import { Helmet } from "react-helmet";

export const AutentiaHeaderResources = () => {
  const basePath = "/assets/js/";
  const path = process.env.NODE_ENV != "development" ? "/public" + basePath : basePath;

  return (
    <Helmet>
      <script src={path + "jquery.js"}></script>
      <script src={path + "jquery-ui.js"}></script>
      <script src={path + "jsbn.js"}></script>
      <script src={path + "jsbn2.js"}></script>
      <script src={path + "rsa.js"}></script>
      <script src={path + "base64.js"}></script>
      <script src={path + "rsa2.js"}></script>
      <script src={path + "yahoo-min.js"}></script>
      <script src={path + "core.js"}></script>
      <script src={path + "crypto-1.1.min.js"}></script>
      <script src={path + "md5.js"}></script>
      <script src={path + "sha1.js"}></script>
      <script src={path + "sha256.js"}></script>
      <script src={path + "ripemd160.js"}></script>
      <script src={path + "x64-core.js"}></script>
      <script src={path + "sha512.js"}></script>
      <script src={path + "rsapem-1.1.min.js"}></script>
      <script src={path + "rsasign-1.2.min.js"}></script>
      <script src={path + "asn1hex-1.1.min.js"}></script>
      <script src={path + "x509-1.1.min.js"}></script>
      <script src={path + "jquery.blockUI.js"}></script>
      <script src="https://files.autentia.cl/pluginautentia_v4.0.0.js"></script>
    </Helmet>
  );
};
