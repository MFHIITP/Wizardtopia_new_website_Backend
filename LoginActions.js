import jwt from 'jsonwebtoken';
import { app, Collection1, JWT_SECRET } from './backend.js';

const loginactions = (req, res) => {
    const output = (async () => {

        const mail = await Collection1.find({ email: req.body.email });
        if (mail.length == 0) {
            res.status(400).send("You have not registered. Please register");
        }
        else {
            if (req.body.password != mail[0].password) {
                res.status(400).send("Wrong Password");
            }
            else {
                const token = jwt.sign(
                    {
                        id: mail[0]._id,
                        email: mail[0].email
                    },
                    JWT_SECRET,
                    {
                        expiresIn: '24h',
                    }
                );
                res.status(200).json({
                    message: "OK",
                    token: token
                });
            }
        }
    });

    output();
}
export default loginactions
