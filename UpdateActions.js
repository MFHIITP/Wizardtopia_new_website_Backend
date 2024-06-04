import { app, Collection1 } from './backend.js';

const updateactions = (req, res) => {
    const output = (async () => {
        const mail = await Collection1.updateOne({ email: req.body.email }, { $set: { [req.body.old]: req.body.name } });
        const mail1 = await Collection1.find({email:req.body.email});
        const profiles = {
            name: mail1[0].name,
            email: mail1[0].email,
            college: mail1[0].study,
            password: mail1[0].password,
            year: mail1[0].year,
            branch: mail1[0].branch,
            phone: mail1[0].phone
        }
        res.status(200).json({
            message: "OK",
            profileinfo: profiles
        });
    });
    output();
}
export default updateactions
