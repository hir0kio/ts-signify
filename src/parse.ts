import {
  Container,
  PublicKey,
  PrivateKey,
  Signature,
  checkPrivateKey,
  checkPublicKey,
  checkSignature,
  _buf2num,
} from ".";

export function parseContainer(
  input: Buffer | string
): Container<string> | null {
  try {
    let split = input.toString().split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let content = split[1];

    return content
      ? {
          comment,
          content,
        }
      : null;
  } catch (e) {
    return null;
  }
}

export function parsePrivateKey(
  input: Buffer | string
): Container<PrivateKey> | null {
  let container = parseContainer(input);

  if (!container) {
    return null;
  }

  let decoded = Buffer.from(container.content, "base64"),
    privateKey = {
      algorithm: decoded.subarray(0, 2).toString(),
      kdfAlgorithm: decoded.subarray(2, 4).toString(),
      kdfRounds: _buf2num(decoded.subarray(4, 8)),
      salt: decoded.subarray(8, 24),
      checksum: decoded.subarray(24, 32),
      keyNumber: decoded.subarray(32, 40),
      content: decoded.subarray(40, 104),
    };

  return checkPrivateKey(privateKey)
    ? {
        ...container,
        content: privateKey,
      }
    : null;
}

export function parsePublicKey(
  input: Buffer | string
): Container<PublicKey> | null {
  let container = parseContainer(input);

  if (!container) {
    return null;
  }

  let decoded = Buffer.from(container.content, "base64"),
    publicKey = {
      algorithm: decoded.subarray(0, 2).toString(),
      keyNumber: decoded.subarray(2, 10),
      content: decoded.subarray(10, 42),
    };

  return checkPublicKey(publicKey)
    ? {
        ...container,
        content: publicKey,
      }
    : null;
}

export function parseSignature(
  input: Buffer | string
): Container<Signature> | null {
  let container = parseContainer(input);

  if (!container) {
    return null;
  }

  let decoded = Buffer.from(container.content, "base64"),
    signature = {
      algorithm: decoded.subarray(0, 2).toString(),
      keyNumber: decoded.subarray(2, 10),
      content: decoded.subarray(10, 74),
    };

  return checkSignature(signature)
    ? {
        ...container,
        content: signature,
      }
    : null;
}
