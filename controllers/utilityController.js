var Movie = require('../models/Movie');
var MovieHall = require('../models/MovieHall');
var User = require('../models/User');
var Transaction = require('../models/Transaction');

var mailer = require('../handlers/mailer.js');;



/**
 * Ajax handler
 */




exports.ajax = function(req,res) {

	let data = '', response = '';

	switch(req.body.type) {

	
		case 'session-heartbeat' : 

			var temp = {};
			if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
				temp['logged'] = true;
				temp['user'] = req.session.user;
			} else {
				temp['logged'] = false;
 			}

 			res.json(temp);
 			res.end();

		break;

		case 'logout' : 
			
			req.session.user = '';
			req.session.destroy();

			res.end();

		break;


	}
	
};
