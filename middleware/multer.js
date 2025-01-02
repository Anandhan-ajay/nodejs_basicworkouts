const multer = require("multer");
// const {v4 as uuid} = require("uuid");
// const uuid = require("uuid"); 
// const { v4 } = uuid;
// const id = v4();
const { v4: uuid } = require("uuid");



const storage  = multer.diskStorage({
    destination(req, file, cb){
        cb(null,"./uploads")
    },
    filename(req, file, cb){
        const id = uuid();
        const extension = file.originalname.split(".").pop();
        const filename = `${id}.${extension}`;
        cb(null , filename)
    }
});

const uploadFiles = multer({storage}).single("image")
module.exports = uploadFiles;