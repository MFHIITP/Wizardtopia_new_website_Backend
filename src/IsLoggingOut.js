import { app, statuscollection } from './backend.js';

const IsLoggingOut = async (req, res) => {
    await statuscollection.updateOne({ email: req.body.email }, { $set: { outtime: req.body.outtime, stats: 'inactive' } });
    res.status(200).send("Logged out successfully");
};
export default IsLoggingOut;
