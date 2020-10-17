// import saveOtp from '../../db/connection/mongo/auth/saveOtp';
const twilio = require('twilio');

const accountSid = 'ACd5c338067626f115c9c9ddfc98755b26';
const authToken = 'dad811ff1284b10dd0af334e55317e8d';
const t = Math.floor(1000 + Math.random() * 9000);
const sendOtp = (to = '+917416634081', otp = t) => {
    // const otp = Math.floor(1000 + Math.random() * 9000);
    const client = new twilio(accountSid, authToken);
    return client.messages.create({
        body: `your verification code is - ${otp}`,
        to,
        from: '+13012737412'
    });
}

/**
 * 
 * 
 * meeweeAuth
 * Bhfqz6w3BCPSTLHredtPIYJG8YkU0ZHWur9ctUFAnlEyHNMAoTffH676RAnzGrAo
 */

export default sendOtp;