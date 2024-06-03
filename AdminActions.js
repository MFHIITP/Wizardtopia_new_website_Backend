import { app, Collection1 } from './backend.js';

const adminactions = async(req, res) => {
    const output = (async () => {
        const mail = await Collection1.find();
        res.status(200).json(mail)
    });
    await output();
}

export default adminactions
