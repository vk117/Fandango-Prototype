var Movie = require('../models/Movie');
var MovieHall = require('../models/MovieHall');
var User = require('../models/User');
var Transaction = require('../models/Transaction');



exports.index = function(req,res) {

 var filter = req.param('filter') ? req.param('filter') : {};
 var sortable = 'id';
  var perPage = 4 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
  
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

  
  Movie.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sortable)
      .populate('project')
      .populate('user')
      .exec(function(err, movies) {
          Movie.count().exec(function(err, count) {
              
              res.json({
                  movies: movies,
                  page: page,
                  max : Math.round(count / perPage)
              });
              
              res.end();

          })
      })
  
}


exports.create = function(req,res) {

  var movie = new Movie;
  
  
  var values = req.body.formData;

  Object.keys(values).map(key => {
    movie[key] = values[key];
  })

   

  movie.save(function(err,b){

            if(err) {

              res.json({ error : err , 'success' : false });

            }  


            if (b) {
                output = {
                  project_id: b.project_id,
                  user_id: b.user_id,
                  description: b.description,
                  price: b.price,
                  time: b.time,
                  user : user,
                  id : b.id
                };


               res.json(output);
               res.end();
              
            }
          
  });
          


}

exports.show = function(req,res) {

  var id = req.params.id;

  Movie.where({ id : id })
  .findOne()
  .populate('user')
  .exec(function (err, movie) {
    
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}



exports.update = function(req,res) {

  var id = req.params.id;
  var doc =  req.body.formData;

  Object.keys(values).map(key => {
    movie[key] = doc[key];
  })


  Movie.where().updateOne({ id : id },doc,function (err, movie) {
    if (err) return handleError(err);
    
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}




exports.delete = function(req,res) {

  var id = req.params.id;
  
  Movie.findOneAndRemove({ id : id },function (err, movie) {
    if (err) return handleError(err);
    
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}