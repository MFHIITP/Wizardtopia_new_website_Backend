import jwt from 'jsonwebtoken';
import { app, Collection1, JWT_SECRET } from './backend.js';

const loginactions = async(req, res) => {
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
                const profiles = {
                    name: mail[0].name,
                    email: mail[0].email,
                    college: mail[0].study,
                    password: mail[0].password,
                    year: mail[0].year,
                    branch: mail[0].branch,
                    phone: mail[0].phone
                }
                const options = {
                    httpOnly: false,
                    secure: false,
                    sameSite: "lax",
                    path: '/'
                }
                res.status(200).cookie("Cookie", token, [{...options, domain: "wkhx5f4s-5173.inc1.devtunnels.ms"}]).cookie("ProfileInfo", profiles, [{...options, domain: "wkhx5f4s-5173.inc1.devtunnels.ms"}])
                .send({
                    message: "OK"
                });
            }
        }
    });

    output();
}
export default loginactions
