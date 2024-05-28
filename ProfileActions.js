import { app, Collection1 } from './backend.js';

const profileactions = (req, res) => {
    const output = (async () => {
        const mail = await Collection1.find({ email: req.body.email });
        res.status(200).json({
            name: mail[0].name,
            year: mail[0].year,
            branch: mail[0].branch,
            phone: mail[0].phone,
            email: mail[0].email,
            university: mail[0].study,
            password: mail[0].password
        });
    });
    output();
}
export default profileactions
