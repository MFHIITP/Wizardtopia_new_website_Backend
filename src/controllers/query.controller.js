import nodemailer from "nodemailer";

const SendQuery = async (req, res) => {
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
    from: req.body.email,
    to: "hossainfarshid@gmail.com",
    subject: req.body.subject,
    text: req.body.message,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).send("Sent");
};

export {SendQuery}
