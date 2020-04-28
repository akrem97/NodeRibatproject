const multer = require("multer");

const storage = multer.diskStorage({
  
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
  
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }

});

const fileFilter=function(req,file,cb){
    if(file.mimetype==='video/mp4' || file.mimetype === 'video/x-msvideo' || file.mimetype ==='video/x-ms-wmv')
    {
         cb(null,true);
    }
    
    else 
        cb(null,false,new Error('type doesn\'t exists')); 
}

const upload = multer(
    {storage:storage,
    fileFilter:fileFilter}
)

module.exports=upload;