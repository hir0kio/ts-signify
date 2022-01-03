import { parsePublicKey, parseSignature, verify } from "../src";

let verified = verify({
  signature: parseSignature(
    "untrusted comment: verify with mock-key.pub" +
      "\n" +
      "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb" +
      "0aJjPmikdatNl9LR93po7F9E8Aq/8xCw" +
      "Ek8yrq2ym8yuY97qQnF1rPpSd/F1bvzT" +
      "IQI=" +
      "\n"
  )!,
  message: "[mock message]" + "\n",
  publicKey: parsePublicKey(
    "untrusted comment: signify public key" +
      "\n" +
      "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIa" +
      "z0SpP/qUQhCv1q2prRgKXNCY" +
      "\n"
  )!,
});

console.log(
  `node-signify: ${
    verified ? "Signature verified" : "Signature verification failed"
  }`
);
