import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connect from './connect.js'
import {mainactions} from './MainActions.js';
import loginactions from './LoginActions.js';
import removeactions from './RemoveActions.js';
import updateactions from './UpdateActions.js';
import checktoken from './CheckToken.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import adminactions from './AdminActions.js';
import Logging_In from './Logging_In.js';
import IsLoggingOut from './IsLoggingOut.js';
import otpverify from './VerifyOTP.js';
import queryrouter from './routes/query.route.js'
import { upload } from './middlewares/multer.middleware.js';

export let otpStore = {}

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET
const port = process.env.PORT

const hostname = "0.0.0.0"

export const app = express();
app.use(cookieParser()); 
app.use(express.json())

app.set('view engine', 'html')
app.use(cors({origin: true, credentials: true}));


connect();

var Schema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    year:{
        type: String,
        require: true
    },
    branch:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    study:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true});
export const Collection1 = mongoose.model("collection_1", Schema);

app.post('/backend_main', mainactions)

app.post('/backend_login', loginactions)

app.post('/backend_remove', removeactions)

app.post('/backend_update', updateactions)

app.post('/check_token', checktoken)

app.post('/admins', adminactions)

app.post('/otpverify', otpverify)

let newschema = new mongoose.Schema({
    name: String,
    title: String,
    content: String,
    image: String
})

let postcollection = mongoose.model("posts", newschema)


app.get('/backend_posts', async (req, res)=>{
    const mail = await postcollection.find();
    res.status(200).json(mail);
})

app.post('/backend_posts', upload.single('file'), async (req, res)=>{
    const data = new postcollection({
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        image: req.file.path
    })
    await data.save();
    res.status(200).send("Saved")
})


let points_schema = new mongoose.Schema({
    house: String,
    points: Number
})

const pointcollection = mongoose.model('points', points_schema)

app.get('/backend_points', async(req, res)=>{
    const gryf = await pointcollection.find({house: "Gryffindor"})
    const raven = await pointcollection.find({house: "Ravenclaw"})
    const huff = await pointcollection.find({house: "Huffelpuff"})
    const slyth = await pointcollection.find({house: "Slytherin"})
    res.status(200).json({
        Gryffindor: gryf[0].points,
        Ravenclaw: raven[0].points,
        Huffelpuff: huff[0].points,
        Slytherin: slyth[0].points
    })
})

app.post('/backend_points_increase', async(req, res)=>{
    const oldpoint = await pointcollection.find({house: req.body.house})
    let newpoint = req.body.point + oldpoint[0].points;
    await pointcollection.updateOne({house: req.body.house}, {$set:{points: newpoint}})
    res.status(200).json({
        newpoint: newpoint,
    })
})

app.post('/backend_points_decrease', async(req, res)=>{
    const oldpoint = await pointcollection.find({house: req.body.house})
    let newpoint = oldpoint[0].points - req.body.point
    await pointcollection.updateOne({house: req.body.house}, {$set:{points: newpoint}})
    res.status(200).json({
        newpoint: newpoint,
    })
})

let status = new mongoose.Schema({
    email: String,
    name: String,
    intime: String,
    outtime: String,
    stats: String
})

export const statuscollection = mongoose.model('status_info', status);

app.post('/backend_logging', Logging_In);

app.post('/backend_isloggingout', IsLoggingOut);

app.get('/backend_logging', async(req, res)=>{
    const persons = await statuscollection.find({});
    res.status(200).json(persons);
})

app.post('/backend_signedout', async(req, res)=>{
    const reuslt = await statuscollection.deleteOne({email: req.body.email});
    res.status(200).send('Gone for good');
})

app.use("/api", queryrouter);

app.listen(port, hostname, ()=>{
    console.log(`Server Listning ${port}`)
})