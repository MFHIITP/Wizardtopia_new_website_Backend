import mongoose from 'mongoose';

export const server = "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
export const database = "Wizardtopia";

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