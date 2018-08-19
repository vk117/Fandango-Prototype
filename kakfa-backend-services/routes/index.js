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
const projectController = require('../controllers/projectController');
const bidController = require('../controllers/bidController');
const utilityController = require('../controllers/utilityController');
const transactionController = require('../controllers/transactionController');
const kafkaController = require('../controllers/kafkaController');

router.get('/alive',function(req,res){

	res.send({ 'alive' : true });
}); 


new kafkaController.kafkaHandler('userControllerIndex',userController.index);
new kafkaController.kafkaHandler('userControllerCreate',userController.create)
new kafkaController.kafkaHandler('userControllerShow',userController.show)
;

new kafkaController.kafkaHandler('userControllerAuthenticate',userController.authenticate); 

new kafkaController.kafkaHandler('userControllerUpdate',userController.update); 
new kafkaController.kafkaHandler('userControllerDelete',userController.delete);

new kafkaController.kafkaHandler('projectControllerIndex',projectController.index); // get list of all projects


new kafkaController.kafkaHandler('projectControllerRelevant',projectController.relevant); // get list of all projects
new kafkaController.kafkaHandler('projectControllerBidprojects',projectController.bidprojects); // get list of all projects
new kafkaController.kafkaHandler('projectControllerCreate',projectController.create); // create a new project
new kafkaController.kafkaHandler('projectControllerShow',projectController.show); // get details of a single project
new kafkaController.kafkaHandler('projectControllerUpdate',projectController.update); // update project 
new kafkaController.kafkaHandler('projectControllerSubmitproject',projectController.submitproject); // update project 
new kafkaController.kafkaHandler('projectControllerFinalize',projectController.finalize); // update project 
new kafkaController.kafkaHandler('projectControllerDelete',projectController.delete); // delete project 


new kafkaController.kafkaHandler('bidControllerIndex',bidController.index); // get list of all bids
new kafkaController.kafkaHandler('bidControllerCreate',bidController.create); // create a new bid
new kafkaController.kafkaHandler('bidControllerShow',bidController.show); // get details of a single bid
new kafkaController.kafkaHandler('bidControllerUpdate',bidController.update); // update bid 
new kafkaController.kafkaHandler('bidControllerDelete',bidController.delete); // delete bid 


new kafkaController.kafkaHandler('transactionControllerIndex',transactionController.index);
new kafkaController.kafkaHandler('transactionControllerCreate',transactionController.create);
new kafkaController.kafkaHandler('transactionControllerWithdraw',transactionController.withdraw);

new kafkaController.kafkaHandler('utilityControllerAjax',utilityController.ajax); // delete bid 


module.exports = router;
