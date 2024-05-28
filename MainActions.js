import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import { app, Collection1, JWT_SECRET } from './backend.js';

const mainactions =  (req, res) => {

    const sendRegistrationEmail = async (email) => {
        const msg = {
            to: email,
            from: 'hossainfarshid@gmail.com',
            subject: 'Registration Successful',
            text: `Welcome to Wizardtopia! Your registration was successful. The password you gave us is ${req.body.password}`,
            html: `<p>Welcome to Wizardtopia! Your registration was successful.</p><p>Thank you for joining us!</p><p>The password you gave us is ${req.body.password}<p>Join our official Watsapp Group </p>`,
        };

        sgMail.send(msg).then(() => {
            console.log('Email sent');
        }).catch((error) => {
            console.log(error);
        });
    };

    const data = new Collection1(req.body);
    const output = (async () => {
        const mail = await Collection1.find({ email: req.body.email });
        if (mail.length == 0) {
            await data.save();
            const mail1 = await Collection1.find({ email: req.body.email });
            const token = jwt.sign(
                {
                    id: mail1[0]._id,
                    email: mail1[0].email
                },
                JWT_SECRET,
                {
                    expiresIn: '24h'
                }
            );
            sendRegistrationEmail(req.body.email);
            res.status(200).json({
                message: "OK",
                token: token
            });
        }
        else {
            res.status(400).send("You have already registered before");
        }
    });
    output();
}

export default mainactions
