import { KeyObject } from 'node:crypto'
export type UserKeyPair = {
  privateKey: string
  publicKey: string 
}

export type UserKeyPairOptions = {
  password?: string
}

export type KeyJSON = {
  pubkey: string
  message: string
}