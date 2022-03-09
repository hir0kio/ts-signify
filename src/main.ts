import * as base64 from "base64-js";
import { pbkdf } from "bcrypt-pbkdf";
import nacl from "tweetnacl";

const presets = {
  algorithm: "Ed",
  kdfAlgorithm: "BK",
  kdfRounds: 42,
};

export class KeyPair {
  protected _publicKey: PublicKey;
  protected _secretKey: SecretKey;

  constructor(publicKey: PublicKey, secretKey: SecretKey) {
    this._publicKey = publicKey;
    this._secretKey = secretKey;
  }

  get publicKey() {
    return this._publicKey;
  }

  get secretKey() {
    return this._secretKey;
  }

  /**
   * Imports a key pair.
   *
   * @param pubKeyStr The `string` representation of a public key.
   * @param secKeyStr The `string` representation of a secret key.
   * @returns A key pair.
   * @since v0.5.0
   */
  static import(pubKeyStr: string, secKeyStr: string) {
    return new KeyPair(
      PublicKey.import(pubKeyStr),
      SecretKey.import(secKeyStr)
    );
  }

  /**
   * Generates a key pair.
   *
   * @param passphrase The passphrase to protect the secret key with.
   * @returns A key pair.
   * @since v0.5.0
   */
  static generate(passphrase: string) {
    let id = nacl.randomBytes(8);
    let keyPair = nacl.sign.keyPair();
    let salt = nacl.randomBytes(16);
    let derivedSecretKey = new Uint8Array(64);

    pbkdf(
      stringToByteArray(passphrase),
      stringToByteArray(passphrase).length,
      salt,
      salt.length,
      derivedSecretKey,
      derivedSecretKey.length,
      presets.kdfRounds
    );

    return new KeyPair(
      new PublicKey(
        "signify public key",
        presets.algorithm,
        id,
        keyPair.publicKey
      ),
      new SecretKey(
        "signify secret key",
        presets.algorithm,
        presets.kdfAlgorithm,
        presets.kdfRounds,
        salt,
        nacl.hash(keyPair.secretKey).subarray(0, 8),
        id,
        new Uint8Array(64).map(
          (value, index) => derivedSecretKey[index] ^ keyPair.secretKey[index]
        )
      )
    );
  }
}

export class PublicKey {
  protected _comment: string;
  protected _algorithm: string;
  protected _id: Uint8Array;
  protected _content: Uint8Array;

  constructor(
    comment: string,
    algorithm: string,
    id: Uint8Array,
    content: Uint8Array
  ) {
    this._comment = comment;
    this._algorithm = algorithm;
    this._id = id;
    this._content = content;
  }

  get comment() {
    return this._comment;
  }

  get algorithm() {
    return this._algorithm;
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  /**
   * Imports a public key.
   *
   * @param pubKeyStr The `string` representation of a public key.
   * @returns A public key.
   * @since v0.5.0
   */
  static import(pubKeyStr: string) {
    let split = pubKeyStr.split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let body = base64.toByteArray(split[1]);
    let algorithm = byteArrayToString(body.subarray(0, 2));
    let id = body.subarray(2, 10);
    let content = body.subarray(10, 42);

    return new PublicKey(comment, algorithm, id, content);
  }

  /**
   * Exports the public key.
   *
   * @returns The `string` representation of the public key.
   * @since v0.5.0
   */
  export() {
    return (
      `untrusted comment: ${this.comment}` +
      "\n" +
      base64.fromByteArray(
        concatByteArrays(
          stringToByteArray(this.algorithm),
          this.id,
          this.content
        )
      ) +
      "\n"
    );
  }
}

export class SecretKey {
  protected _comment: string;
  protected _algorithm: string;
  protected _kdfAlgorithm: string;
  protected _kdfRounds: number;
  protected _salt: Uint8Array;
  protected _checksum: Uint8Array;
  protected _id: Uint8Array;
  protected _content: Uint8Array;

  constructor(
    comment: string,
    algorithm: string,
    kdfAlgorithm: string,
    kdfRounds: number,
    salt: Uint8Array,
    checksum: Uint8Array,
    id: Uint8Array,
    content: Uint8Array
  ) {
    this._comment = comment;
    this._algorithm = algorithm;
    this._kdfAlgorithm = kdfAlgorithm;
    this._kdfRounds = kdfRounds;
    this._salt = salt;
    this._checksum = checksum;
    this._id = id;
    this._content = content;
  }

  get comment() {
    return this._comment;
  }

  get algorithm() {
    return this._algorithm;
  }

  get kdfAlgorithm() {
    return this._kdfAlgorithm;
  }

  get kdfRounds() {
    return this._kdfRounds;
  }

  get salt() {
    return this._salt;
  }

  get checksum() {
    return this._checksum;
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  /**
   * Imports a secret key.
   *
   * @param secKeyStr The `string` representation of a secret key.
   * @returns A secret key.
   * @since v0.5.0
   */
  static import(secKeyStr: string) {
    let split = secKeyStr.split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let body = base64.toByteArray(split[1]);
    let algorithm = byteArrayToString(body.subarray(0, 2));
    let kdfAlgorithm = byteArrayToString(body.subarray(2, 4));
    let kdfRounds = byteArrayToNumber(body.subarray(4, 8));
    let salt = body.subarray(8, 24);
    let checksum = body.subarray(24, 32);
    let id = body.subarray(32, 40);
    let content = body.subarray(40, 104);

    return new SecretKey(
      comment,
      algorithm,
      kdfAlgorithm,
      kdfRounds,
      salt,
      checksum,
      id,
      content
    );
  }

  /**
   * Exports the secret key.
   *
   * @returns The `string` representation of the secret key.
   * @since v0.5.0
   */
  export() {
    return (
      `untrusted comment: ${this.comment}` +
      "\n" +
      base64.fromByteArray(
        concatByteArrays(
          stringToByteArray(this.algorithm),
          stringToByteArray(this.kdfAlgorithm),
          numberToByteArray(this.kdfRounds, 4),
          this.salt,
          this.checksum,
          this.id,
          this.content
        )
      ) +
      "\n"
    );
  }

  /**
   * Decrypts the secret key. Returns `null` if incorrect passphrase is given.
   *
   * @param passphrase The passphrase to decrypt the key with.
   * @returns An unencrypted secret key.
   * @since v0.5.0
   */
  decrypt(passphrase: string) {
    let derivedKey = new Uint8Array(64);

    pbkdf(
      stringToByteArray(passphrase),
      stringToByteArray(passphrase).length,
      this.salt,
      this.salt.length,
      derivedKey,
      derivedKey.length,
      this.kdfRounds
    );

    let decryptedKey = new Uint8Array(64).map(
      (value, index) => this.content[index] ^ derivedKey[index]
    );

    if (compareArrays(this.checksum, nacl.hash(decryptedKey).subarray(0, 8))) {
      return new UnencryptedSecretKey(
        this.comment,
        this.algorithm,
        this.kdfAlgorithm,
        this.kdfRounds,
        this.salt,
        this.checksum,
        this.id,
        this.content,
        decryptedKey
      );
    }

    return null;
  }
}

export class UnencryptedSecretKey extends SecretKey {
  protected _unencryptedContent: Uint8Array;

  constructor(
    comment: string,
    algorithm: string,
    kdfAlgorithm: string,
    kdfRounds: number,
    salt: Uint8Array,
    checksum: Uint8Array,
    id: Uint8Array,
    content: Uint8Array,
    unencryptedContent: Uint8Array
  ) {
    super(
      comment,
      algorithm,
      kdfAlgorithm,
      kdfRounds,
      salt,
      checksum,
      id,
      content
    );

    this._unencryptedContent = unencryptedContent;
  }

  get unencryptedContent() {
    return this._unencryptedContent;
  }
}

export class Signature {
  protected _comment: string;
  protected _algorithm: string;
  protected _keyId: Uint8Array;
  protected _content: Uint8Array;

  constructor(
    comment: string,
    algorithm: string,
    keyId: Uint8Array,
    content: Uint8Array
  ) {
    this._comment = comment;
    this._algorithm = algorithm;
    this._keyId = keyId;
    this._content = content;
  }

  /**
   * Imports a signature.
   *
   * @param sigStr The `string` representation of a signature.
   * @returns A signature.
   * @since v0.5.0
   */
  static import(sigStr: string) {
    let split = sigStr.split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let body = base64.toByteArray(split[1]);
    let algorithm = byteArrayToString(body.subarray(0, 2));
    let keyId = body.subarray(2, 10);
    let content = body.subarray(10, 74);

    return new Signature(comment, algorithm, keyId, content);
  }

  get comment() {
    return this._comment;
  }

  get algorithm() {
    return this._algorithm;
  }

  get keyId() {
    return this._keyId;
  }

  get content() {
    return this._content;
  }

  /**
   * Exports the signature.
   *
   * @returns The `string` representation of the signature.
   * @since v0.5.0
   */
  export() {
    return (
      `untrusted comment: ${this.comment}` +
      "\n" +
      base64.fromByteArray(
        concatByteArrays(
          stringToByteArray(this.algorithm),
          this.keyId,
          this.content
        )
      ) +
      "\n"
    );
  }
}

/**
 * Signs the data with the given secret key.
 *
 * @param data The data to be signed.
 * @param secretKey The secret key to sign the data with.
 * @param comment The "untrusted comment" section of the signature.
 * @returns A signature.
 * @since v0.5.0
 */
export function sign(
  data: Uint8Array,
  secretKey: UnencryptedSecretKey,
  comment: string = ""
) {
  let algorithm = presets.algorithm;
  let keyId = secretKey.id;
  let content = nacl.sign.detached(data, secretKey.unencryptedContent);

  return new Signature(comment, algorithm, keyId, content);
}

/**
 * Verifies the signature with the given public key.
 *
 * @param data The signed data.
 * @param signature The signature to be verified.
 * @param publicKey The public key that corresponds to the signature.
 * @returns The verification result.
 * @since v0.5.0
 */
export function verify(
  data: Uint8Array,
  signature: Signature,
  publicKey: PublicKey
) {
  return nacl.sign.detached.verify(data, signature.content, publicKey.content);
}

function byteArrayToNumber(array: Uint8Array) {
  let num = 0;

  for (let i = 0; i < array.length; i++) {
    num += array[array.length - 1 - i] * 256 ** i;
  }

  return num;
}

function numberToByteArray(num: number, size: number) {
  let array = new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    let min = 256 ** (size - 1 - i);
    let unit = num / min - ((num / min) % 1);

    array[i] = unit;
    num -= min * unit;
  }

  return array;
}

function compareArrays(array1: Uint8Array, array2: Uint8Array) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i of array1) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

function byteArrayToString(input: Uint8Array) {
  let result = "";

  for (let i = 0; i < input.length; i++) {
    result += String.fromCharCode(input[i]);
  }

  return result;
}

function stringToByteArray(input: string) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    result.push(input.charCodeAt(i));
  }

  return new Uint8Array(result);
}

function concatByteArrays(...arrays: Uint8Array[]) {
  let totalLength = 0;

  for (let i in arrays) {
    totalLength += arrays[i].byteLength;
  }

  let result = new Uint8Array(totalLength);
  let next = 0;

  for (let i in arrays) {
    result.set(arrays[i], next);
    next += arrays[i].byteLength;
  }

  return result;
}
