import { app, Collection1 } from './backend.js';

const updateactions = (req, res) => {
    const output = (async () => {
        const mail = await Collection1.updateOne({ email: req.body.email }, { $set: { [req.body.old]: req.body.name } });
        res.status(200).send("Updated");
    });
    output();
}
export default updateactions
