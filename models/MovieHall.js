const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');

const movieHallSchema = new Schema({

  id : { type: Number, default: 0 },
  name: String,
  slug : String,
  movie_items : [],
  tickets_limit : String,
  screen_number: String,
  ticket_price : Number,

  user : { type: Schema.Types.ObjectId, ref: 'User' },
  movies : [{ type: Schema.Types.ObjectId, ref: 'Movie' }],

  created_at: { type: Date, default: Date.now },


}); 

movieHallSchema.plugin(autoIncrement.plugin, { model : 'MovieHall' , field: 'id' });
movieHallSchema.pre('save',function(next){

    this.slug = slug(this.name).toLowerCase();

    next();
});

movieHallSchema.index({'$**': 'text'});

const MovieHall = mongoose.model('MovieHall',movieHallSchema);


module.exports = MovieHall;