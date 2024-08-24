import { app, Collection1 } from './backend.js';

const removeactions = (req, res) => {
    const output = (async () => {
        const mail = await Collection1.deleteOne({ email: req.body.email });
        res.status(200).send("Deleted");
    });
    output();
}
export default removeactions
