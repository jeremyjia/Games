const express = require('express');
const multer = require('multer');
/*Configuration for storage that multer will use to save your files. 
You need to create the folder beforehand and mention the location in the below configuration
*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Retains the original file name
  }
})
const upload = multer({ storage: storage })
const app = express();
// It's very crucial that the file name matches the name attribute in your html
app.post('/upload', upload.single('theFile'), (req, res) => {
  res.send({status:1});
});
app.listen(3000);