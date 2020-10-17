import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import { doLogin as login } from '../../db/connection/mongo/auth/login';

const doLogin = (req, res) => {
    const parsedBody = req.body || {};
    const phone = _get(parsedBody, 'phone');
    const auth = _get(parsedBody, 'password');
    const options = {
        phone, 
        email: phone,
        password: auth,
    }
    login(options, req, res).then((data) => {
        if (!_isEmpty(data)) {
            const respAuth = {
                success: true,
                message: 'Authentication successful!',
                token: data,
            };
            res.status(200);
            res.send(respAuth);
        } else {
            res.status(401);
            res.statusMessage = JSON.stringify({error: `Authentication failed`});
            res.send(`Authentication failed`);
        }
    }).catch((err) => {
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
    });
}

export default doLogin;