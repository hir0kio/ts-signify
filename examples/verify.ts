import { PublicKey, Signature, verify } from "../src/main";

// The data to be verified.
let data = Buffer.from("data");

// The signature to be verified.
let signature = Signature.import(
  "untrusted comment: verify with mock-key.pub\n" +
    "RWRYneRdupGjVbLERw56AG1AEuaQsNQaa3cp2tS+2y/GUyt0W/FVYkyGDovVFFDHlVFSWhpHGC6XVTYGUD9HDy6qwGx2NQ//FwY=\n"
);

// The public key that corresponds to the signature.
let publicKey = PublicKey.import(
  "untrusted comment: signify public key\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY\n"
);

// Verify.
let verified = verify(data, signature, publicKey);

// Show the result.
console.log(verified ? "Signature verified" : "Signature verification failed");
