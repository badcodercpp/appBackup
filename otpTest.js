import sendOtp from './handler/otp';

sendOtp('+919836648105', 1234).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})