const crypto = require('crypto')

const keyLength = 32;

// Generate a random key
const key = crypto.randomBytes(keyLength)

console.log('generate key : ', key.toString('hex'))

// just run node>generateKey > Copy this key and paste into env secret key