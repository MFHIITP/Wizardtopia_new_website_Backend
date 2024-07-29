import sgMail from "@sendgrid/mail";
import { app, Collection1, JWT_SECRET } from "./backend.js";
import { SENDGRID_API_KEY } from "./backend.js";
// import nodemailer from "nodemailer";

const mainactions = (req, res) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const sendRegistrationEmail = async (email) => {
    const msg = {
      to: email,
      from: "hossainfarshid@gmail.com",
      subject: "Registration Successful",
      text: `Welcome to Wizardtopia! Your registration was successful. The password you gave us is ${req.body.password}`,
      html: `<p>Welcome to Wizardtopia! Your registration was successful.</p><p>Thank you for joining us!</p><p>The password you gave us is ${req.body.password}<p>Join our official Watsapp Group https://chat.whatsapp.com/H7shXB5TJtK2XcUbvRoujO</p>`,
    };

    sgMail.send(msg).then(() => {
        console.log("Email sent");
      }).catch((error) => {
        console.log(error);
      });
  };

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "hossainfarshid@gmail.com",
//       pass: "JUITfh-891",
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
//   });
//   const sendemail = async (email) => {
//     transporter.sendMail({
//         from: "hossainfarshid@gmail.com",
//         to: email,
//         subject: "Wizardtopia JU",
//         html: `<p>Welcome to Wizardtopia</p>`,
//       });
//   };

  const data = new Collection1(req.body);
  const output = async () => {
    const mail = await Collection1.find({ email: req.body.email });
    if (mail.length == 0) {
      await data.save();
      await sendRegistrationEmail(req.body.email);
      res.status(200).json({
        message: "OK",
      });
    } else {
      res.status(400).send("You have already registered before");
    }
  };
  output();
};

export default mainactions;
