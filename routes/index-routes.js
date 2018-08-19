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

router.get('/projects1',kafkaController.make('projectsview1'));

router.get('/users',userController.index); // get list of all users
router.post('/user',userController.create); // create a new user
router.get('/user/:id',userController.show); // get details of a single user
router.get('/user',userController.show); // get details of a currently logged in user

router.put('/user/:id',upload.single('file'),userController.update); // update user 
router.delete('/user/:id',userController.delete); // delete user 

router.post('/authenticate',userController.authenticate); 

router.get('/api/v1/projects/relevant',projectController.relevant); // get list of all projects
router.get('/api/v1/bidprojects',projectController.bidprojects); // get list of all projects
router.get('/api/v1/projects',projectController.index); // get list of all projects
router.post('/api/v1/project',upload.single('file'),projectController.create); // create a new project
router.get('/api/v1/project/:slug',projectController.show); // get details of a single project
router.put('/project/:slug',projectController.update); // update project 
router.put('/api/v1/submitproject',upload.single('file'),projectController.submitproject); // update project 
router.post('/api/v1/project/finalize',projectController.finalize); // update project 
router.delete('/project/:slug',projectController.delete); // delete project 

router.get('/api/v1/bids',bidController.index); // get list of all bids
router.post('/api/v1/bid',bidController.create); // create a new bid
router.get('/bid/:id',bidController.show); // get details of a single bid
router.put('/bid/:id',bidController.update); // update bid 
router.delete('/bid/:id',bidController.delete); // delete bid 

router.get('/api/v1/transaction',transactionController.index);
router.post('/api/v1/transaction',transactionController.create);
router.post('/api/v1/transaction/withdraw',transactionController.withdraw);

router.post('/ajax',upload.single('file'),utilityController.ajax); // delete bid 



module.exports = router;



router.post('/session',function(req,res){

	var temp = {};
	if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
		temp['logged'] = true;
		temp['user'] = req.session.user;
	} else {
		temp['logged'] = false;
		}
	
	res.json(temp);
	res.end();		
}); 


router.post('/logout',function(req,res){

	req.session.user = '';
	req.session.destroy();
	
	res.json({ logged : true });
	res.end();		
}); 

module.exports = router;
