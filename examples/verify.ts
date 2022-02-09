import { verify } from "../src";

let verified = verify({
  message: "[mock message]" + "\n",
  publicKey:
    "untrusted comment: signify public key" +
    "\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
    "\n",
  signature:
    "untrusted comment: verify with mock-key.pub" +
    "\n" +
    "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCw" +
    "Ek8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
    "\n",
});

console.log(
  `ts-signify: ${
    verified ? "Signature verified" : "Signature verification failed"
  }`
);
