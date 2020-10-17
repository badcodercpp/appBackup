// import connection from '../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEmpty from 'lodash/isEmpty';
import addEmail from './addEmail';
import addPhone from './addPhone';
import addBoth from './addBoth';
import checkIfUserExists from './checkIfUserExists';
import { identity } from '../../utils/identity';
import { encrypt } from '../../crypto/exports';
import { getKeys } from '../../utils/getSignKeys';
import cryptoConst from '../../cryptoNode/config/constants';
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const doSignup = (req, res) => {
    const parsedBody = req.body || {};
    const fName = _get(parsedBody, 'fName');
    const lName = _get(parsedBody, 'lName');
    const phone = _get(parsedBody, 'phone');
    const Captcha = _get(parsedBody, 'Captcha');
    const pContact = _get(parsedBody, 'pContact', false) || false;
    const pContact_email = _get(parsedBody, 'pContact_email', false) || false;
    const agreement = _get(parsedBody, 'agreement', false) || false;
    const password = _get(parsedBody, 'password');
    const email = _get(parsedBody, 'email');
    const confirm = _get(parsedBody, 'confirm');
    const otp = _get(parsedBody, 'otp');
    const gender = _get(parsedBody, 'gender');
    const expertise = _get(parsedBody, 'expertise');
    const id = uuidv1();
    // connection.connect()

    const options = {
        fName,
        lName,
        phone,
        Captcha,
        pContact,
        pContact_email,
        agreement,
        password,
        confirm,
        otp,
        id,
        email, 
        gender, 
        expertise, 
    }
    const k = getKeys(options);
    const { key, iv } = cryptoConst;
    checkIfUserExists(email, phone, k).then((user = {}) => {
        console.log("user", user)
        const userId = _get(user, 'id')
        if (_isEmpty(userId)) {
            const resp = {
                id, 
                fName, 
                lName, 
                phone, 
                email, 
            }
            const respData = identity(resp);
            const useragent = _get(req, 'useragent', {}) || {};
            const respWithUserAgent = { ...respData, ...useragent };
            const token = jwt.sign(respWithUserAgent, 'kashish');
            // const encryptedToken = encrypt(token);
            options.hash = token;
            if (!_isEmpty(email) && !_isEmpty(phone)) {
                return addBoth(req, res, options, k, key, iv);
            } else if (!_isEmpty(email) && _isEmpty(phone)) {
                return addEmail(req, res, options, k, key, iv);
            } else if (_isEmpty(email) && !_isEmpty(phone)) {
                return addPhone(req, res, options, k, key, iv);
            } else {
                res.status(500);
                res.statusMessage = JSON.stringify({error: `something went wrong trace - ${err}`});
                res.send({error: `something went wrong trace - ${err}`});
            }
        }
    }).catch((err) => {
        console.log("err", err)
        const userId = _get(err, 'id');
        if (!_isEmpty(userId)) {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `user already exist - ${userId}`})
            res.send({error: `user already exist - ${userId}`});
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `something went wrong trace - ${err}`});
            res.send({error: `something went wrong trace - ${err}`});
        }
    })
}

export default doSignup;