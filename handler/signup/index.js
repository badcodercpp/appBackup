import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEmpty from 'lodash/isEmpty';
import { doSignUp as signup } from '../../db/connection/mongo/auth/signup';
const uuidv1 = require('uuid/v1');

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
    const badId = uuidv1();

    const options = {
        fName,
        lName,
        mobile: phone,
        Captcha,
        pContact,
        pContact_email,
        agreement,
        password,
        confirm,
        otp,
        badId,
        email, 
        gender, 
        expertise, 
    }

    signup(options, req, res).then((data) => {
        if (!_isEmpty(data)) {
            const d = {
                data: "done",
                token: data
            };
            res.send(d);
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `something went wrong`});
            res.send(`something went wrong trace - `);
        }
    }).catch((err) => {
        const userId = _get(err, 'badId');
        if (!_isEmpty(userId)) {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `user already exist - ${userId}`})
            res.send({error: `user already exist - ${userId}`});
        } else {
            res.status(500);
            res.statusMessage = JSON.stringify({error: `something went wrong trace - ${err}`});
            res.send({error: `something went wrong trace - ${err}`});
        }
    });
}

export default doSignup;