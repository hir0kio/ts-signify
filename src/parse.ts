import {
  PublicKey,
  PrivateKey,
  Signature,
  checkPrivateKey,
  checkPublicKey,
  checkSignature,
  _buf2num,
} from ".";

function _parseContainer<T extends PrivateKey | PublicKey | Signature>(
  input: Buffer | string,
  parseContent: (comment: string, content: string) => T | null
): T | null {
  try {
    let split = input.toString().split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let content = split[1];

    return content ? parseContent(comment, content) : null;
  } catch (e) {
    return null;
  }
}

export function parsePrivateKey(input: Buffer | string): PrivateKey | null {
  return _parseContainer<PrivateKey>(input, (comment, content) => {
    let decoded = Buffer.from(content, "base64"),
      privateKey = {
        comment,
        algorithm: decoded.subarray(0, 2).toString(),
        kdfAlgorithm: decoded.subarray(2, 4).toString(),
        kdfRounds: _buf2num(decoded.subarray(4, 8)),
        salt: decoded.subarray(8, 24),
        checksum: decoded.subarray(24, 32),
        keyNumber: decoded.subarray(32, 40),
        content: decoded.subarray(40, 104),
      };

    return checkPrivateKey(privateKey) ? privateKey : null;
  });
}

export function parsePublicKey(input: Buffer | string): PublicKey | null {
  return _parseContainer(input, (comment, content) => {
    let decoded = Buffer.from(content, "base64"),
      publicKey = {
        comment,
        algorithm: decoded.subarray(0, 2).toString(),
        keyNumber: decoded.subarray(2, 10),
        content: decoded.subarray(10, 42),
      };

    return checkPublicKey(publicKey) ? publicKey : null;
  });
}

export function parseSignature(input: Buffer | string): Signature | null {
  return _parseContainer(input, (comment, content) => {
    let decoded = Buffer.from(content, "base64"),
      signature = {
        comment,
        algorithm: decoded.subarray(0, 2).toString(),
        keyNumber: decoded.subarray(2, 10),
        content: decoded.subarray(10, 74),
      };

    return checkSignature(signature) ? signature : null;
  });
}
