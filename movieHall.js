/*
    Created by Varun Khatri on 4/21/2018
*/


var Movie = require('../models/Movie');
var MovieHall = require('../models/MovieHall');
var User = require('../models/User');
var Transaction = require('../models/Transaction');

exports.index = function(req, res){

    var filter = req.param('filter') ? req.param('filter') : {};
    var sortable = 'id';
    var perPage = 10 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;

    if(typeof filter == "string")
     filter = JSON.parse(filter);

    if(  typeof filter.s !== "undefined"  ) {

    filter = { $text : {$search: filter.s} };

    }

    if( typeof filter.user !== "undefined" ) {

    filter['user_id'] = req.session.user.id;
    delete filter['user'];
    }

    if( typeof filter.sort !== "undefined" ) {

        switch(filter.sort) {
    
           case 'date' : break;
           case 'asc' : sortable = 'price'; break;
           case 'desc' : sortable = { price: -1 }; break;
    
        }
        delete filter['sort'];
      }

    MovieHall.find(filter)
        .limit(perPage)
        .skip(perPage * page)
        .sort(sortable)
        .populate('movies')
        .populate('user')
        .exec(function(err, halls) {
            MovieHall.count().exec(function(err, count) {
              
                res.json({
                    halls: halls,
                    page: page,
                    max : Math.round(count / perPage)
                });
                    
                res.end();
      
            })
        })
}


exports.create = function(req, res){

    var hall = new MovieHall;
    var values = req.body.formData;

    Object.keys(values).map(key => {
        hall[key] = values[key];
    })

    hall.save(function(err, b){
        if(err) {

            res.json({ error : err , 'success' : false });

          }
          
        if(b){
            output = {
                name: b.name,
                slug: b.slug,
                movie_items: b.movie_items,
                tickets_limit: b.tickets_limit,
                screen_number: b.screen_number,
                ticket_price: b.ticket_price
            };

            res.json(output);
            res.end();
        }

    });
}


exports.show = function(req,res) {

    var id = req.params.id;
  
    MovieHall.where({ id : id })
    .findOne()
    .populate('user')
    .populate('movies')
    .exec(function (err, hall) {
      
      if (hall) {
  
         res.json(hall);
         res.end();
        
      }
    
    });
    
}

exports.update = function(req,res) {

    var id = req.params.id;
    var doc =  req.body.formData;
  
  
    MovieHall.where().updateOne({ id : id },doc,function (err, hall) {
      if (err) return handleError(err);
      
      if (hall) {
  
         res.json(hall);
         res.end();
        
      }
    
    });
    
}


exports.delete = function(req,res) {

    var id = req.params.id;
    
    MovieHall.findOneAndRemove({ id : id },function (err, hall) {
      if (err) return handleError(err);
      
      if (hall) {
  
         res.json(hall);
         res.end();
        
      }
    
    });
    
  }

