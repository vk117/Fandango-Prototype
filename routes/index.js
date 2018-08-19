var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') 
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });


const userController = require('../controllers/userController');
const movieController = require('../controllers/movieController');
const movieHallController = require('../controllers/movieHallController');
const utilityController = require('../controllers/utilityController');
const transactionController = require('../controllers/transactionController');
const kafkaController = require('../controllers/kafkaController');

/*

Example

router.get('/api/v1/entities',entityController.index); // get list of all entities
router.get('/api/v1/entity/:id',entityController.show); // get details of a single entity

router.post('/api/v1/entity',upload.single('file'),entityController.create); // create a new entity

router.put('/api/v1/entity/:id',projectController.update); // update entity 

router.delete('/api/v1/entity/:id',projectController.delete); // delete entity 
*/


// Do not edit

router.post('/ajax',upload.single('file'),utilityController.ajax); // delete bid 



module.exports = router;


