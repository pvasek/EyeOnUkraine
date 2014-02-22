var mongoose = require('mongoose');


var defaultOptions = {
	toJSON: {
		transform: function (doc, ret, options) {
		    // we just "rename" _id to id
		    ret.id = ret._id;
		    delete ret._id;
		}
	}
};

var UserSchema = new mongoose.Schema({
    aid: { type: String},
    email: { type: String},
    deleted: { type: Boolean }
    //lastLogin: { type: 'String'}
}, defaultOptions);

var caseSchema = new mongoose.Schema({    
    date: Date,
    numberOfVictims: { type: Number, min: 1 },

    title: { type: String, trim: true },
    description: { type: String },
    localTitle: { type: String, trim: true },
    localDescription: { type: String },

    place: { type: String },
    lat: { type: Number },
    lng: { type: Number },

    deleted: { type: Boolean }
}, defaultOptions);

exports.User = mongoose.model('User', UserSchema);
exports.Case = mongoose.model('Cases', caseSchema);
