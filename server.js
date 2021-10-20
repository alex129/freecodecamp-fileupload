var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser= require('body-parser')
const multer = require('multer');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const router = express.Router();
router.post('/fileanalyse', multer().single('upfile'), (req, res) => {
  const file = req.file
  if (!file) {
    res.json({
      error: "Please upload a file"
    });
  }else{    
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    });
  }
});
app.use('/api', router);


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
