import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: "dmr09pu10",
    api_key: "994639334958429",
    api_secret: "_iC6yBC3Os6-mzPD64w6nf356JA"
});

const multer_storage = new CloudinaryStorage({
    cloudinary: cloudinary
})

const upload = multer({
    storage: multer_storage
})

export {upload}