import mongoose from 'mongoose';

const server = "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
const database = "Wizardtopia";

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