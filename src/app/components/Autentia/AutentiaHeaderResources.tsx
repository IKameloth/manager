import React from "react";
import { Helmet } from "react-helmet";

export const AutentiaHeaderResources = () => {
  const basePath = "/assets/js/";
  return (
    <Helmet>
      <script src={basePath + "jquery.js"}></script>
      <script src={basePath + "jquery-ui.js"}></script>
      <script src={basePath + "jsbn.js"}></script>
      <script src={basePath + "jsbn2.js"}></script>
      <script src={basePath + "rsa.js"}></script>
      <script src={basePath + "base64.js"}></script>
      <script src={basePath + "rsa2.js"}></script>
      <script src={basePath + "yahoo-min.js"}></script>
      <script src={basePath + "core.js"}></script>
      <script src={basePath + "crypto-1.1.min.js"}></script>
      <script src={basePath + "md5.js"}></script>
      <script src={basePath + "sha1.js"}></script>
      <script src={basePath + "sha256.js"}></script>
      <script src={basePath + "ripemd160.js"}></script>
      <script src={basePath + "x64-core.js"}></script>
      <script src={basePath + "sha512.js"}></script>
      <script src={basePath + "rsapem-1.1.min.js"}></script>
      <script src={basePath + "rsasign-1.2.min.js"}></script>
      <script src={basePath + "asn1hex-1.1.min.js"}></script>
      <script src={basePath + "x509-1.1.min.js"}></script>
      <script src={basePath + "jquery.blockUI.js"}></script>
      <script src="https://files.autentia.cl/pluginautentia_v4.0.0.js"></script>
    </Helmet>
  );
};
