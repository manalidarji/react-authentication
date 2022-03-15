import sendgrid from '@sendgrid/mail';

// sendgrid API key 
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// sends email using sendgrid.send(), returns promise
export const sendEmail = ({to, from, subject, text, html}) => {
    const msg = {to, from, subject, text, html};
    return sendgrid.send(msg);
}