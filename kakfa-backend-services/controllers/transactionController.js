var User = require('../models/User');
var Transaction = require('../models/Transaction');
var passport = require('passport');  


exports.index = function(req,callback) {

	var filter = req.param.filter ? req.param.filter : {};

	var perPage = 100 , page = req.param.page ? (parseInt(req.param.page) - 1) : 0;
	
	if(typeof filter == "string")
     filter = JSON.parse(filter);

 	console.log(filter);
 

  if( typeof filter.user !== "undefined" ) {

    filter['user_id'] = req.session.user.id;
    delete filter['user'];
  }


	Transaction.find(filter)
	    .limit(perPage)
	    .skip(perPage * page)
	    .sort('id')
	    .exec(function(err, transcations) {
	        Transaction.count().exec(function(err, count) {
	            
	            callback({
	                transcations: transcations,
	                page: page,
	                max : Math.round(count / perPage)
	            });
	            
	            

	        })
	    })
	
}


exports.create = function(req,callback) {

	var transcation = new Transaction();
	
	var values = req.body.data;

	transcation['amount'] = values.amount;
	transcation['type'] = values.type;
	transcation['user_id'] = req.session.user.id;
	transcation['user'] = req.session.user._id;
	transcation['transfer_user_id'] = "";
	transcation['notes'] = "Money Deposited from Card "+values.number;

	var balance = 0;

	User.where({ id : req.session.user.id }).findOne(function (e, user) {

		balance = parseInt(values.amount) + user.balance; 

		User.where().updateOne({ id : req.session.user.id },{ balance : balance },function (e1, u) {

				transcation.save(function(err,t){

					user.balance = balance;

					req.session.user = user;

				    callback(user);
				    

				});

		
		});

	});

	
}


exports.withdraw = function(req,callback) {

	var transcation = new Transaction();
	
	var values = req.body.data;


	transcation['amount'] = values.amount;
	transcation['type'] = values.type;
	transcation['user_id'] = req.session.user.id;
	transcation['user'] = req.session.user._id;
	transcation['transfer_user_id'] = "";
	transcation['notes'] = "Money Withdraw to from Account No "+values.account_no;


	var balance = 0;

	User.where({ id : req.session.user.id }).findOne(function (e, user) {

		balance = user.balance - parseInt(values.amount) ; 

		User.where().updateOne({ id : req.session.user.id },{ balance : balance },function (e1, u) {

				transcation.save(function(err,t){

					user.balance = balance;

					req.session.user = user;

				    callback(user);
				    

				});

		
		});

	});

	
}
