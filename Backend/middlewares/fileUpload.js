const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:function(req,file,callbacks){
        callbacks(null,path.join(__dirname, '../public/users'))
    },
    filename:function(req,file,callbacks){
        const  name = Date.now()+"-"+file.originalname;
        callbacks(null,name)
    }
})

const upload = multer({storage:storage})


module.exports={
    upload
}