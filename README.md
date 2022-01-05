# node-signify

node-signify is a Node.js port of OpenBSD's
[signify(1)](https://man.openbsd.org/signify) written in TypeScript. It
provides various APIs for manipulating signify keys and signatures which allow
it to be integrated to other Node.js packages.

## Install

```
$ npm install node-signify
```

## Usage

### Generate a key pair

See [examples/generate-key-pair.ts](examples/generate-key-pair.ts).

```ts
import { generateKeyPair } from "node-signify";

let keyPair = generateKeyPair({
  passphrase: "passphrase",
});
```

### Sign

See [examples/sign.ts](examples/sign.ts).

```ts
import { sign } from "node-signify";

let signature = sign({
  privateKey: PRIVATE_KEY,
  message: "[mock message]" + "\n",
  passphrase: "passphrase",
  comment: "verify with mock-key.pub",
});
```

### Verify

See [examples/verify.ts](examples/verify.ts).

```ts
import { verify } from "node-signify";

let verified = verify({
  signature: SIGNATURE,
  message: "[mock message]" + "\n",
  publicKey: PUBLIC_KEY,
});
```

## Contributions

Contributions are welcome. Submit a pull request on GitHub or send a patch to
hirokio@tutanota.com.

## License

See [LICENSE](LICENSE).
