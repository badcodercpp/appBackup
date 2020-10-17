import connection from '../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import { applyLock } from './lock/applyLock';
import lock from './lock';

const addEmail = (req, res, options = {}, k, key, iv) => {
    const fName = _get(options, 'fName');
    const lName = _get(options, 'lName');
    const Captcha = _get(options, 'Captcha');
    const pContact = _get(options, 'pContact');
    const pContact_email = _get(options, 'pContact_email');
    const agreement = _get(options, 'agreement');
    const password = _get(options, 'password');
    const email = _get(options, 'email');
    const confirm = _get(options, 'confirm');
    const otp = _get(options, 'otp');
    const id = _get(options, 'id');
    const hash = _get(options, 'hash');
    const gender = _get(options, 'gender');
    const expertise = _get(options, 'expertise');

    const op = {
        fName, 
        lName, 
        Captcha, 
        pContact, 
        pContact_email, 
        agreement, 
        password, 
        email, 
        confirm, 
        otp, 
        id, 
        hash, 
        gender,
        expertise
    }

    const s = applyLock(op, key, iv);

    const fName_e = _get(s, 'fName');
    const lName_e = _get(s, 'lName');
    const Captcha_e = _get(s, 'Captcha');
    const pContact_e = _get(s, 'pContact');
    const pContact_email_e = _get(s, 'pContact_email');
    const agreement_e = _get(s, 'agreement');
    const password_e = _get(s, 'password');
    const email_e = _get(s, 'email');
    const confirm_e = _get(s, 'confirm');
    const otp_e = _get(s, 'otp');
    const id_e = _get(s, 'id');
    const hash_e = _get(s, 'hash');
    const gender_e = _get(s, 'gender');
    const expertise_e = _get(s, 'expertise');

    lock(k, key, email, iv).then(() => {
        connection.query(`INSERT INTO BJS_SIGNUP(id, fName, lName, email, password, captcha, agreement, confirm, pContact, pContact_email, otp, hash, gender, expertise) VALUES('${id_e}', '${fName_e}', '${lName_e}', '${email_e}', '${password_e}', '${Captcha_e}', '${agreement_e}', '${confirm_e}', '${pContact_e}', '${pContact_email_e}', '${otp_e}', '${hash_e}', '${gender_e}', '${expertise_e}')`, function (e, r, f) {
            if (!e) {
                const d = {
                    data: "done",
                    token: hash
                };
                res.send(d);
            } else {
                res.status(500);
                res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
                res.send(`something went wrong trace - ${e}`);
            }
        });
    }).catch((e) => {
        res.status(500);
        res.statusMessage = JSON.stringify({error: `something went wrong trace - ${e}`});
        res.send(`something went wrong trace - ${e}`);
    });
}

export default addEmail;