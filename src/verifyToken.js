import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key'; // Replace with your secret key

export const verifyToken = (req, res, next) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(127).send("Invalid Token");
  }
  console.log(token)
  return next();
};
