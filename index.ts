import { generateKeyPairSync, privateDecrypt, publicEncrypt } from "node:crypto"
import { type KeyJSON, type UserKeyPair, type UserKeyPairOptions } from "./types"
import { vercelStegaCombine, vercelStegaDecode } from "@vercel/stega"


export function createNewKeyPair(options?: UserKeyPairOptions) : UserKeyPair{
  const keypair = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      
    }
  })
  return {
    "privateKey": keypair.privateKey,
    "publicKey": keypair.publicKey
  }
}


export function encryptWithPublicKey(publicKey: string, message: string) : string {
  const encryptedData = publicEncrypt({ 
    key: publicKey,
  }, Buffer.from(message))
  return encryptedData.toString('base64')
}

export function decryptWithPrivateKey(privateKey: string, message: string) : string {
  const decryptedData = privateDecrypt(privateKey, Buffer.from(message, 'base64'))
  return decryptedData.toString()
}


export function encodeSecretIntoText(text: string, publicKey: string, 
  encryptedMessage: string) : string {
    const secretJSON : KeyJSON = {
      pubkey: publicKey,
      message: encryptedMessage
    }
    return vercelStegaCombine(text, secretJSON)
  }


export function decodeTextIntoSecret(encodedText: string){
  const keyJSON: KeyJSON | undefined = vercelStegaDecode(encodedText)
  if (keyJSON === undefined) {
    console.log('error')
    return {}
  }

  return keyJSON

}
