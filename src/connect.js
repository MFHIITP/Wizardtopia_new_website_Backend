import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const server = process.env.DB_HOST;
const database = process.env.DB_NAME;

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${server}/${database}`);
        console.log("Connecion Successful");
    }
    catch (err) {
        console.log(err);
    }
};

export default connect;