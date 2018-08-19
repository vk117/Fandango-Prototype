const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');


const movieSchema = new Schema({

  id : { type: Number, default: 0 },
  name: String,
  slug: String,
  description: String,
  trailer_link: String,
  release_date: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  thumbnail: String,
  photos: String,
  movie_length: String,
  available_in: String,
  reviews: [],

  user : { type: Schema.Types.ObjectId, ref: 'User' },
  movie_halls : [{ type: Schema.Types.ObjectId, ref: 'MovieHall' }],

  created_at: { type: Date, default: Date.now },
});

movieSchema.plugin(autoIncrement.plugin, { model : 'Movie' , field: 'id' });
const Movie = mongoose.model('Movie',movieSchema);

 
module.exports = Movie;