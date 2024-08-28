import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const server = process.env.DB_HOST || "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
const database = process.env.DB_NAME || "Wizardtopia";

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