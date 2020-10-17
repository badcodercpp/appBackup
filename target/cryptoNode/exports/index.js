/* eslint-disable no-unused-vars */

// import  { config } from '../config';
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const charType = 'hex';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

export function encrypt(text, key, iv, algo = algorithm, charT = charType) {
    console.log("algorithm", algo, key, iv, charT)
    let cipher = crypto.createCipheriv(algo, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { 
        iv: iv.toString(), 
        encryptedData: encrypted.toString(charT), 
        key: key.toString()
    };
}

export function decrypt(text, key, Iv, algo = algorithm, charT = charType) {
    let iv = Buffer.from(Iv, charT);
    let encryptedText = Buffer.from(text, charT);
    let decipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

