import { test, expect } from "bun:test"
import { createNewKeyPair, 
  encryptWithPublicKey, 
  decryptWithPrivateKey,
  encodeSecretIntoText, 
  decodeTextIntoSecret
} from "."

test("test createNewKeyPair function", () => {
  const keypair = createNewKeyPair()
  expect(keypair).toContainAllKeys(['privateKey', 'publicKey'])
})

test("test decryption", () => {
  const keypair = createNewKeyPair()
  const secretMessage = encryptWithPublicKey(keypair.publicKey, "hello world!")
  const readableMessage = decryptWithPrivateKey(keypair.privateKey, secretMessage)
  expect(readableMessage).toEqual("hello world!")
})

test("test encoding to text", () => {
  const keypair = createNewKeyPair()
  const secretMessage = encryptWithPublicKey(keypair.publicKey, "hello world!")
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit. Etiam a cursus felis. Pellentesque id lectus quis elit 
  placerat rhoncus ac at enim. Sed ac porta lacus. Suspendisse 
  porta cursus aliquet. Suspendisse rhoncus lacus risus, ut feugiat 
  diam hendrerit in. Nam accumsan pretium velit ut volutpat. 
  Phasellus viverra orci ac eros ornare malesuada. Sed elit eros, 
  scelerisque sed ultricies quis, maximus quis turpis. Vestibulum 
  vestibulum lacinia nisl eu accumsan. Cras vel est a magna 
  venenatis efficitur eget id nunc. Nulla non sodales dui. Sed sit 
  amet lobortis turpis.
  Fusce ultrices sagittis dolor, eget finibus tellus pharetra vitae. Phasellus id finibus neque, sed venenatis odio. Sed velit magna, tristique ac hendrerit pulvinar, pulvinar ut leo. Ut volutpat ex nisi, ut fringilla massa tempor vitae. Morbi gravida ornare pretium. Nam eget nibh ante. Suspendisse potenti. Donec ut semper dui, non varius arcu. In eget mauris dapibus, euismod lorem nec, ultrices leo. Nullam eros sapien, lobortis ac interdum sit amet, congue et nisl. Vivamus in diam lacinia, placerat leo id, ornare sapien. Donec egestas finibus hendrerit. Nulla erat lectus, auctor id tristique quis, consequat quis sapien. Maecenas elementum magna eget turpis auctor blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Donec at condimentum quam. Nullam odio elit, suscipit at felis in, pellentesque ornare leo. Nulla ornare iaculis tellus et ultrices. Duis leo eros, sagittis vitae faucibus in, congue vitae erat. Aliquam nec magna faucibus, faucibus dui eget, accumsan nibh. Ut imperdiet ultrices sem nec blandit. Ut in viverra odio, eget tempor orci. Sed vitae orci maximus, tristique mauris a, euismod felis. Quisque dictum justo vitae dolor ultrices gravida eu nec eros. Quisque lorem ante, congue pharetra orci viverra, faucibus facilisis eros. Etiam et mi bibendum, suscipit orci non, semper odio. Donec non metus iaculis, imperdiet magna ac, aliquam nibh.`
  const encodedText = encodeSecretIntoText(text, keypair.publicKey, secretMessage)
  expect(encodedText).toContain(text)
  // const readableMessage = decryptWithPrivateKey(keypair.privateKey, secretMessage)
})


test('decoding to JSON from encoded text', () => {
  const keypair = createNewKeyPair()
  const secretMessage = encryptWithPublicKey(keypair.publicKey, "hello world!")
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing 
  elit. Etiam a cursus felis. Pellentesque id lectus quis elit 
  placerat rhoncus ac at enim. Sed ac porta lacus. Suspendisse 
  porta cursus aliquet. Suspendisse rhoncus lacus risus, ut feugiat 
  diam hendrerit in. Nam accumsan pretium velit ut volutpat. 
  Phasellus viverra orci ac eros ornare malesuada. Sed elit eros, 
  scelerisque sed ultricies quis, maximus quis turpis. Vestibulum 
  vestibulum lacinia nisl eu accumsan. Cras vel est a magna 
  venenatis efficitur eget id nunc. Nulla non sodales dui. Sed sit 
  amet lobortis turpis.
  Fusce ultrices sagittis dolor, eget finibus tellus pharetra vitae. Phasellus id finibus neque, sed venenatis odio. Sed velit magna, tristique ac hendrerit pulvinar, pulvinar ut leo. Ut volutpat ex nisi, ut fringilla massa tempor vitae. Morbi gravida ornare pretium. Nam eget nibh ante. Suspendisse potenti. Donec ut semper dui, non varius arcu. In eget mauris dapibus, euismod lorem nec, ultrices leo. Nullam eros sapien, lobortis ac interdum sit amet, congue et nisl. Vivamus in diam lacinia, placerat leo id, ornare sapien. Donec egestas finibus hendrerit. Nulla erat lectus, auctor id tristique quis, consequat quis sapien. Maecenas elementum magna eget turpis auctor blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus.

  Donec at condimentum quam. Nullam odio elit, suscipit at felis in, pellentesque ornare leo. Nulla ornare iaculis tellus et ultrices. Duis leo eros, sagittis vitae faucibus in, congue vitae erat. Aliquam nec magna faucibus, faucibus dui eget, accumsan nibh. Ut imperdiet ultrices sem nec blandit. Ut in viverra odio, eget tempor orci. Sed vitae orci maximus, tristique mauris a, euismod felis. Quisque dictum justo vitae dolor ultrices gravida eu nec eros. Quisque lorem ante, congue pharetra orci viverra, faucibus facilisis eros. Etiam et mi bibendum, suscipit orci non, semper odio. Donec non metus iaculis, imperdiet magna ac, aliquam nibh.`
  const encodedText = encodeSecretIntoText(text, keypair.publicKey, secretMessage)
  const decodedText = decodeTextIntoSecret(encodedText)
  expect(decodedText).toContainAllKeys(['pubkey', 'message'])
})