var User = require('../models/User');
var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy; 


exports.index = function(req,callback) {

	var filter = {};

	console.log(req);

	var perPage = 10 , page = req.param.page ? (parseInt(req.param.page) - 1) : 0;
	
	
	User.find(filter)
	    .limit(perPage)
	    .skip(perPage * page)
	    .sort('id')
	    .exec(function(err, users) {
	        User.count().exec(function(err, count) {
	            
	            callback({
	                users: users,
	                page: page,
	                max : Math.round(count / perPage)
	            });
	            
	        })
	    })
	
}


exports.create = function(req,callback) {

	var u = new User();

	console.log('creating...');
	
	
	var values = req.body.data;

	Object.keys(values).map(key => {
		if(key !== 'password')
		u[key] = values[key];
	})

	User.register(u,values.password,function(err,user){
		if(!err)  {
		callback(user);
		} else {
			callback({ 'error' : err });
		}
		

	});

	
}

exports.show = function(req,callback) {

	var id = req.params.id;

	if(!id || typeof id === "undefined")
		id = req.session.user.id;

	User.where({ id : id }).findOne(function (err, user) {
	  if (err) callback(err);
	  
	  if (user) {

	  	 callback(user);
	  }
	
	});
	
}



exports.update = function(req,callback) {

	var id = req.body.id;
	
	var filename = req.body.proxyavatar ? req.body.proxyavatar : '';


	if(req.file)
	     filename = req.file.filename;

	var doc = {

		 first_name: ( ! req.body.first_name || req.body.first_name == "") ? "" : req.body.first_name,
		  last_name: ( ! req.body.last_name || req.body.last_name == "") ? "" : req.body.last_name,
		  avatar: filename,
		  skills: ( ! req.body.skills || req.body.skills == "") ? "" : req.body.skills,
		  phone: ( ! req.body.phone || req.body.phone == "") ? "" : req.body.phone,
		  about: ( ! req.body.about || req.body.about == "") ? "" : req.body.about,
		  email: ( ! req.body.email || req.body.email == "") ? "" : req.body.email,
		  type: ( ! req.body.type || req.body.type == "") ? "" : req.body.type
	};

	console.log(doc);


	User.where().updateOne({ id : id },doc,function (err, user) {
	  
	  if (user) {
	  	 callback(user);
	  }
	
	});
	
}




exports.delete = function(req,callback) {

	var id = req.params.id;
	

	User.findOneAndRemove({ id : id },function (err, user) {
	  if (err) callback(err);
	  
	  if (user) {

	  	 callback(user);
	  	 
			
	  }
	
	});
	
}




exports.authenticate = function(req,callback) {
	console.log('test');
	var data = req.body.data;

	User.findOne({ email : data.email },function (err, user) {
	  
	  if (user) {

	  	 user.authenticate(data.password,function(err,status){

	  	 	var output = {};

	  	 	if(status !== false) {
	  	 		output = user;
	  	 	} else
	  	 	  output = { 'error' : err , 'success' : false };


	  	 	callback(output);
	  	 	

	  	 });
	  	 
			
	  } else {

	  	 callback({ 'error' : err , 'success' : false });
	  	 

	  }
	
	});
	

}