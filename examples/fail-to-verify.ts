import { parsePublicKey, parseSignature, verify } from "../src";

let verified = verify({
  signature: parseSignature(
    "untrusted comment: verify with mock-key.pub" +
      "\n" +
      "RWRYneRdupGjVdv0VsY/ChV0ouN1Nkkb0aJjPmikdatNl9LR93po7F9E8Aq/8xCwEk8yrq2ym8yuY97qQnF1rPpSd/F1bvzTIQI=" +
      "\n"
  )!.content,
  message: "[mock invalid message]" + "\n",
  publicKey: parsePublicKey(
    "untrusted comment: signify public key" +
      "\n" +
      "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY" +
      "\n"
  )!.content,
});

console.log(
  `node-signify: ${
    verified ? "Signature verified" : "Signature verification failed"
  }`
);
