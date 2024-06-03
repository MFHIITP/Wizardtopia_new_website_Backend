import jwt from 'jsonwebtoken';
import { app, JWT_SECRET } from './backend.js';

const checktoken = (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).send("Correct Token");
    }
    catch (err) {
        res.status(127).send("Wrong Token");
    }
}
export default checktoken
