import { app, statuscollection } from './backend.js';

const LoggingIn = async (req, res) => {
    const person = await statuscollection.find({ email: req.body.email });
    if (person.length == 0) {
        const data = new statuscollection(req.body);
        await data.save();
        res.status(200).send(`${req.body.name} just logged in`);
    }
    else {
        await statuscollection.updateOne({ email: req.body.email }, { $set: { intime: req.body.intime, stats: 'live', outtime: '_' } });
        res.status(200).send("Found and updated");
    }
}

export default LoggingIn;
