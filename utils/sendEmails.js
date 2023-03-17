import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);

oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
});

// send email
export const sendEmail = (to, url, txt, subject, template) => {  
    const accessToken = oauth2Client.getAccessToken();
    
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: template(to, url),
    };
    
    smtpTransport.sendMail(mailOptions, (err, infos) => {
        if(err) {
            console.log('error mail: ', err)
        } else {``
            console.log('infos mail: ',infos)
        }
    });
}