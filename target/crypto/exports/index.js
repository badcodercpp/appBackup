import  { config } from '../config';
const CryptoJS = require("crypto-js");

export function encrypt(cypherText, key = config.key) {
    const keyutf = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Base64.parse(key);
    const enc = CryptoJS.AES.encrypt(cypherText, keyutf, { iv: iv });
    const encStr = enc.toString();

    // const encrypted =  CryptoJS.AES.encrypt(cypherText, key);
    // return encrypted.toString();
    return encStr;
}

export function decrypt(cypher, key = config.key) {
    const keyutf = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Base64.parse(key);
    const dec = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(cypher) },
        keyutf,
        {
            iv: iv
        });
    const decStr = CryptoJS.enc.Utf8.stringify(dec)

    // const bytes  = CryptoJS.AES.decrypt(cypher, key);
    // return bytes.toString(CryptoJS.enc.Utf8);
    return decStr
}
