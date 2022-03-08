import { KeyPair, PublicKey, SecretKey, sign, Signature, verify } from "./main";

const mockPublicKey =
    "untrusted comment: signify public key\n" +
    "RWRYneRdupGjVQSVGSpr1Om9B6d1XYIaz0SpP/qUQhCv1q2prRgKXNCY\n",
  mockSecretKey =
    "untrusted comment: signify secret key\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSxyy7KLRVbwLE=\n",
  mockSignature =
    "untrusted comment: verify with key.pub\n" +
    "RWRYneRdupGjVbLERw56AG1AEuaQsNQaa3cp2tS+2y/GUyt0W/FVYkyGDovVFFDHlVFSWhpHGC6XVTYGUD9HDy6qwGx2NQ//FwY=\n";

describe("Class KeyPair", () => {
  describe("generate()", () => {
    it("returns a valid KeyPair object", () => {
      let keyPair = KeyPair.generate("passphrase");

      expect(keyPair.publicKey.comment).toBe("signify public key");
      expect(keyPair.publicKey.algorithm).toHaveLength(2);
      expect(keyPair.publicKey.id).toHaveLength(8);
      expect(keyPair.publicKey.content).toHaveLength(32);
      expect(keyPair.secretKey.comment).toBe("signify secret key");
      expect(keyPair.secretKey.algorithm).toHaveLength(2);
      expect(keyPair.secretKey.kdfAlgorithm).toHaveLength(2);
      expect(keyPair.secretKey.salt).toHaveLength(16);
      expect(keyPair.secretKey.checksum).toHaveLength(8);
      expect(keyPair.secretKey.id).toHaveLength(8);
      expect(keyPair.secretKey.content).toHaveLength(64);
    });
  });
});

describe("Class PublicKey", () => {
  describe("import()", () => {
    it("properly imports the given public key", () => {
      let publicKey = PublicKey.import(mockPublicKey);

      expect(publicKey.algorithm).toHaveLength(2);
      expect(publicKey.id).toHaveLength(8);
      expect(publicKey.content).toHaveLength(32);
    });
  });

  describe("export()", () => {
    it("properly exports the public key", () => {
      let comment = "comment";
      let algorithm = "Ed";
      let id = Buffer.alloc(8, "a");
      let content = Buffer.alloc(32, "b");
      let publicKey = new PublicKey(comment, algorithm, id, content);

      expect(publicKey.export()).toBe(
        "untrusted comment: comment" +
          "\n" +
          Buffer.from("Ed" + "a".repeat(8) + "b".repeat(32)).toString(
            "base64"
          ) +
          "\n"
      );
    });
  });
});

describe("Class SecretKey", () => {
  describe("import()", () => {
    it("properly imports the given secret key", () => {
      let secretKey = SecretKey.import(mockSecretKey);

      expect(secretKey.algorithm).toHaveLength(2);
      expect(secretKey.kdfAlgorithm).toHaveLength(2);
      expect(secretKey.salt).toHaveLength(16);
      expect(secretKey.checksum).toHaveLength(8);
      expect(secretKey.id).toHaveLength(8);
      expect(secretKey.content).toHaveLength(64);
    });
  });

  describe("export()", () => {
    it("properly exports the secret key", () => {
      let comment = "comment";
      let algorithm = "Ed";
      let kdfAlgorithm = "BK";
      let kdfRounds = 42;
      let salt = Buffer.alloc(16, "a");
      let checksum = Buffer.alloc(8, "b");
      let id = Buffer.alloc(8, "c");
      let content = Buffer.alloc(64, "d");
      let secretKey = new SecretKey(
        comment,
        algorithm,
        kdfAlgorithm,
        kdfRounds,
        salt,
        checksum,
        id,
        content
      );

      expect(secretKey.export()).toBe(
        "untrusted comment: comment" +
          "\n" +
          Buffer.from(
            "Ed" +
              "BK" +
              Buffer.from([0, 0, 0, 42]).toString() +
              "a".repeat(16) +
              "b".repeat(8) +
              "c".repeat(8) +
              "d".repeat(64)
          ).toString("base64") +
          "\n"
      );
    });
  });

  describe("decrypt()", () => {
    it("properly decrypts the key", () => {
      let secretKey = SecretKey.import(mockSecretKey).decrypt("passphrase");

      expect(
        Buffer.from(secretKey!.unencryptedContent).toString("base64")
      ).toBe(
        "auUKfrs8aYMJfQhfL7bCoM604sTdeMnn/rrkDACUfWoElRkqa9TpvQendV2CGs9EqT/6lEIQr9atqa0YClzQmA=="
      );
    });

    it("returns null if incorrect passphrase is given", () => {
      let secretKey = SecretKey.import(mockSecretKey).decrypt(
        "incorrect-passphrase"
      );

      expect(secretKey).toBe(null);
    });
  });
});

describe("Class Signature", () => {
  describe("import()", () => {
    it("properly imports the given signature", () => {
      let signature = Signature.import(mockSignature);

      expect(signature.algorithm).toHaveLength(2);
      expect(signature.keyId).toHaveLength(8);
      expect(signature.content).toHaveLength(64);
    });
  });

  describe("export()", () => {
    it("properly exports the signature", () => {
      let comment = "comment";
      let algorithm = "Ed";
      let keyId = Buffer.alloc(8, "a");
      let content = Buffer.alloc(64, "b");
      let signature = new Signature(comment, algorithm, keyId, content);

      expect(signature.export()).toBe(
        "untrusted comment: comment" +
          "\n" +
          Buffer.from("Ed" + "a".repeat(8) + "b".repeat(64)).toString(
            "base64"
          ) +
          "\n"
      );
    });
  });
});

describe("sign()", () => {
  it("returns a valid signature", () => {
    let signature = sign(
      Buffer.from("data"),
      SecretKey.import(mockSecretKey).decrypt("passphrase")!,
      "verify with key.pub"
    );

    expect(signature.export()).toBe(mockSignature);
  });
});
describe("verify()", () => {
  it("returns true if a valid signature and the corresponding data are given", () => {
    expect(
      verify(
        Buffer.from("data"),
        Signature.import(mockSignature),
        PublicKey.import(mockPublicKey)
      )
    ).toBe(true);
  });

  it("returns false if the given data has been modified", () => {
    expect(
      verify(
        Buffer.from("modified data"),
        Signature.import(mockSignature),
        PublicKey.import(mockPublicKey)
      )
    ).toBe(false);
  });
});
