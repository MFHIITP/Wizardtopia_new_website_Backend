import { Collection1, otpStore } from "./backend.js";
import { sendRegistrationEmail } from "./MainActions.js";


const otpverify = async (req, res) => {
  const userdata = new Collection1(req.body.data);
  const storedOTP = otpStore[0];
  if (storedOTP && storedOTP.otp === req.body.otp && Date.now() < storedOTP.expiresAt) {
    delete otpStore[0];
    await userdata.save();
    await sendRegistrationEmail(userdata.email, '<div>Welcome to Wizardtopia - Jadavpur University Wizarding Club. Thank you for joining us.</div> <div>Regards</div><div>Md. Farshid Hossain</div><div>Headmaster</div><div>Wizardtopia</div>')
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    delete otpStore[0];
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
};

export default otpverify
