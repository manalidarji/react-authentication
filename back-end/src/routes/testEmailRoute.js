import {sendEmail} from '../util/sendEmail';

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        sendEmail({
            to: 'darjimanali93+test@gmail.com', // this will be email address of the user whose email we are trying to verify
            from: 'darjimanali93@gmail.com', // sender email that we set up in 'single sender'
            subject: 'Does this work ?',
            text: 'If you reading this, yes it works!',
            html: '<h1>Test Email</h1>'
        }).then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
}