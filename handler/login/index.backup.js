import connection from '../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import { encrypt, decrypt } from '../../cryptoNode/exports';
import { identity } from '../../utils/identity';
import unlock from './unlock';
import { applyLock } from './lock/applyLock';
import { applyUnock } from './unlock/applyUnlock';
const jwt = require('jsonwebtoken');

const doLogin = (req, res) => {
    const parsedBody = req.body || {};
    const phone = _get(parsedBody, 'phone');
    const auth = _get(parsedBody, 'password');
    const options = {
        phone, 
        email: phone,
        auth
    }
    unlock(options).then(({ hash, iv }) => {
        console.log(hash, "hash", iv)
        const identityOption = identity(options);
        if (!_isEmpty(hash)) {
            const lockedOption = applyLock(identityOption, hash, iv);
            const ph = _get(lockedOption, 'phone');
            const authentication = _get(lockedOption, 'auth')
            connection.query(`SELECT password, id, fName, lName, phone, email, gender, expertise, otp,  confirm, Highest_Qualification, Course, Specialization, Passsing_Year, Skills,  Profile_Img, Captcha, pContact, pcontact_email, agreement, Hash  FROM BJS_SIGNUP WHERE email='${ph}' OR phone='${ph}'`, function (error, results, fields) {
                if (!error) {
                    const data = _head(JSON.parse(JSON.stringify(results)));
                    const password = _get(data, 'password');
                    const id = _get(data, 'id');
                    const fName = _get(data, 'fName');
                    const lName = _get(data, 'lName');
                    const phone = _get(data, 'phone');
                    const email = _get(data, 'email');
                    const gender = _get(data, 'gender');
                    const expertise=_get(data,'expertise');
                    const otp=_get(data,'otp');
                    const confirm=_get(data,'confirm');
                    const Highest_Qualification=_get(data,'Highest_Qualification');
                    const Course=_get(data,'Course');
                    const Specialization=_get(data,'Specialization');
                    const Passsing_Year=_get(data,'Passsing_Year');
                    const Skills=_get(data,'Skills');
                    const Profile_Img=_get(data,'Profile_Img');
                    const Captcha=_get(data,'Captcha');
                    const pContact=_get(data,'pContact');
                    const pcontact_email=_get(data,'pcontact_email');
                    const agreement=_get(data,'agreement');
                    const Hash=_get(data,'Hash');

                    // const k = Buffer.from(d.key, 'hex');
                    // const i = Buffer.from(d.iv, 'hex');
                    // const dt = d.encryptedData;
                    // const e = decrypt(dt, k, i);
                    // console.log("e")
                    // console.log(e)
                     
                    // console.log("password is ", password, authentication, decrypt(password, hash));
                    if (_isEqual(password, authentication)) {
                        const resp = {
                            id, 
                            fName, 
                            lName, 
                            phone, 
                            email, 
                            gender, 
                            expertise,
                            otp,
                            confirm,
                            Highest_Qualification,
                            Course,
                            Specialization,
                            Passsing_Year,
                            Skills,
                            Profile_Img,
                            Captcha,
                            pContact,
                            pcontact_email,
                            agreement,
                            Hash,
                        }
                        console.log("resp", resp)
                        const unlockedResp = applyUnock(resp, hash, iv);
                        const respData = identity(unlockedResp);
                        console.log(respData)
                        const useragent = _get(req, 'useragent', {}) || {};
                        const respWithUserAgent = { ...respData, ...useragent };
                        const token = jwt.sign(respWithUserAgent, 'kashish');
                        // const encryptedToken = encrypt(token, hash, iv);
                        // console.log("encryptedToken", encryptedToken)
                        const respAuth = {
                            success: true,
                            message: 'Authentication successful!',
                            token,
                        };
                        res.status(200);
                        res.send(respAuth);
                    } else {
                        res.status(401);
                        res.statusMessage = JSON.stringify({error: `Authentication failed`});
                        res.send(`Authentication failed`);
                    }
                    console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
                } else {
                    res.status(500);
                    res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
                    res.send(`something went wrong trace - ${error}`);
                }
            });
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `User don't exist`});
            res.send(`something went wrong trace - `);
        }
    })
    //connection.connect()
    
    // connection.end();
}

export default doLogin;