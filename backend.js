import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import sgMail from '@sendgrid/mail'
import connect from './connect.js'
import mainactions from './MainActions.js';
import loginactions from './LoginActions.js';
import removeactions from './RemoveActions.js';
import updateactions from './UpdateActions.js';
import checktoken from './CheckToken.js';
import dotenv from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import adminactions from './AdminActions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(SENDGRID_API_KEY)

export const JWT_SECRET = process.env.JWT_SECRET
const port = process.env.PORT

const hostname = "0.0.0.0"

export const app = express();
app.use(express.json())

app.set('view-engine', 'html')
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());

const reactBuildPath = '../Wizardtopia-vite/dist'


app.use("/static", express.static(path.join(path.resolve(), 'static')));
app.use(express.static(reactBuildPath));

connect();

var Schema = mongoose.Schema({
    name:String,
    year:String,
    branch:String,
    phone: Number,
    email:String,
    study:String,
    password: String
});
export const Collection1 = mongoose.model("collection_1", Schema);

app.post('/backend_main', mainactions)

app.post('/backend_login', loginactions)

app.post('/backend_remove', removeactions)

app.post('/backend_update', updateactions)

app.post('/check_token', checktoken)

app.post('/admins', adminactions)

let newschema = mongoose.Schema({
    name: String,
    title: String,
    content: String
})

let postcollection = mongoose.model("posts", newschema)


app.get('/backend_posts', async (req, res)=>{
    const mail = await postcollection.find();
    res.status(200).json(mail);
})

app.post('/backend_posts', async (req, res)=>{
    const data = new postcollection(req.body)
    await data.save();
    res.status(200).send("Added")
})

app.listen(port, hostname, ()=>{
    console.log(`Server Listning ${port}`)
})