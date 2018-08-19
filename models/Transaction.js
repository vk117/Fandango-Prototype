const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const passportLocalMongoose = require('passport-local-mongoose');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const transactionSchema = new Schema({

  id : { type: Number, default: 0 },
  amount: Number,
  type: String,
  notes: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  date: { type: Date, default: Date.now },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  tax: Number,

  ticked_id : String,
  status: String


});



transactionSchema.plugin(autoIncrement.plugin, { model : 'Transaction' , field: 'id' });

const Transaction = mongoose.model('Transaction',transactionSchema);


module.exports = Transaction;