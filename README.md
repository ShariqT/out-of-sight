# out-of-sight

This library will hide encrypted messages in text via stenography. Messages are meant to be encrypted with RSA public/private keypairs,
but you can swap that out with other asymmetric protocols as you see
fit. 

## What problem does this library solve?

This library will help if you need to smuggle digital information in plain text. You can also use this library to encrypt and decrypt messages made with RSA keypairs. 

## Usage

There are four functions that you can make use of:

```typescript

import {createNewKeyPair} from 'out-of-sight'

const keypair = createNewKeyPair()

import { encryptWithPublicKey, decryptWithPrivateKey} from 'out-of-sight'

const secretMessage = encryptWithPublicKey(keypair.publicKey, "hello world")

const readableMessage = decryptWithPrivateKey(keypair.privateKey, secretMessage)

const text = "some sample text"
const encodedText = encodeSecretIntoText(text, keypair.publicKey, secretMessage)

const decodedText = decodeTextIntoSecret(encodedText)

console.log(decodedText)
// {
//  pubkey: <public key in string form>
//  message: <encrypted string from pubkey value>
//}

```

## Contributing

This was made using Bun and I highly recommend it for developing Typescript libraries. 