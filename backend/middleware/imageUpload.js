import multer from 'multer'
import path from 'path'

const styleStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/Styles');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/Brands');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif'
        ){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const styleUpload = multer({storage: styleStorage, fileFilter: filefilter});
const brandUpload = multer({storage: brandStorage, fileFilter: filefilter});


export{ styleUpload, brandUpload }