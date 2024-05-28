import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import sgMail from '@sendgrid/mail'
import connect from './connect.js'
import mainactions from './MainActions.js';
import loginactions from './LoginActions.js';
import profileactions from './ProfileActions.js';
import removeactions from './RemoveActions.js';
import updateactions from './UpdateActions.js';
import checktoken from './CheckToken.js';
import dotenv from 'dotenv'

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(SENDGRID_API_KEY)

export const JWT_SECRET = process.env.JWT_SECRET
const port = process.env.PORT

export const app = express();
app.use(express.json())

app.use(session({
    secret: JWT_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true
    } 
}));

app.set('view-engine', 'html')
app.use(cors())

const reactBuildPath = 'C:/Users/hp/Desktop/Programs/Project/Wizardtopia_react/Wizardtopia-vite/dist'


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

app.post('/backend_profile', profileactions)

app.post('/backend_remove', removeactions)

app.post('/backend_login', loginactions)

app.post('/backend_update', updateactions)

app.post('/check_token', checktoken)

app.get('*', (req,res)=>{
    res.status(200).sendFile(path.join(reactBuildPath, 'index.html'));
});

app.listen(port, ()=>{
    console.log(`http://localhost:${port}/backend_login`);
});