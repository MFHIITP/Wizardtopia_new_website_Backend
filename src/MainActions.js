import { app, Collection1, JWT_SECRET, otpStore } from "./backend.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const sendRegistrationEmail = async (email, context) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hossainfarshid@gmail.com",
      pass: "geem zmeo ixga nylq",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "hossainfarshid@gmail.com",
    to: email,
    subject: "Welcome from Wizardtopia",
    html: context,
  };
  await transporter.sendMail(mailOptions);
};

const mainactions = (req, res) => {
  const output = async () => {
    const mail = await Collection1.find({ email: req.body.email });
    if (mail.length == 0) {
      const otp = crypto.randomInt(100000, 999999).toString();
      otpStore[0] = { otp, expiresAt: Date.now() + 300000 };
      await sendRegistrationEmail(
        req.body.email,
        `Your One Time Password is ${otp}`
      );
      res.status(200).json({
        data: req.body,
      });
    } else {
      res.status(400).send("You have already registered before");
    }
  };
  output();
};

export { mainactions, sendRegistrationEmail };
