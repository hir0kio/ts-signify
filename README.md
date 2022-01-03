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

See [examples/generate.ts](examples/generate.ts).

```ts
import { generate } from "node-signify";

let keyPair = generate({
  passphrase: "passphrase",
});
```

### Sign

See [examples/sign.ts](examples/sign.ts).

```ts
import { parsePrivateKey, sign } from "node-signify";

let signature = sign({
  privateKey: parsePrivateKey(PRIVATE_KEY)!.content,
  message: "[mock message]" + "\n",
  passphrase: "passphrase",
});
```

### Verify

See [examples/verify.ts](examples/verify.ts).

```ts
import { parsePrivateKey, parseSignature, verify } from "node-signify";

let verified = verify({
  signature: parseSignature(SIGNATURE)!.content,
  message: "[mock message]" + "\n",
  publicKey: parsePublicKey(PUBLIC_KEY)!.content,
});
```

## Contributions

Contributions are welcome. Submit a pull request on GitHub or send a patch to
hirokio@tutanota.com.

## License

See [LICENSE](LICENSE).
