var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({    
    date: Date,
    numberOfVictims: { type: Number, min: 1 },

    title: { type: String, trim: true },
    description: { type: String },
    localTitle: { type: String, trim: true },
    localDescription: { type: String },

    place: { type: String },
    lat: { type: Number },
    lng: { type: Number }
});

// it is used in modelInstance.toJSON() calls,
// and toJSON is called in JSON.stringify() that is inside res.json() method
caseSchema.options.toJSON = caseSchema.options.toJSON || {};
caseSchema.options.toJSON.transform = function (doc, ret, options) {
    // we just "rename" _id to id
    ret.id = ret._id;
    delete ret._id;
};

var Case = mongoose.model('Cases', caseSchema);

//lean() - see: http://ilee.co.uk/mongoose-documents-and-jsonstringify/
// PV: I removed lean() in order to use the same toJSON method in all REST methods now
exports.get = function(req, res, id) {
    Case.findOne({ _id: id }).exec(function(err, c) {
        if (err) {
            console.log(err);
            res.status(500).send('We are working on that!');
        } else if(c == null) {
            console.log("Document with id: " + id + " is not in database.");
            res.status(404).send('Not found');
        } else {
            res.json(c);
        }
    });
};

exports.getList = function(req, res) {
    Case.find({}).lean().exec(function(err, cases) {
        if (err) {
            console.log(err);
            res.status(500).send('We are working on that!');
        } else if (cases.length == 0) {            
            //PV: i think its valid to have no results, just return empty array
            //res.status(404).send('Not found'); //MT: I'm not sure with 404 at this place
            res.json([]);
        } else {
            cases.forEach(function(c){
                c.id = c._id;
            });
            res.json(cases);
        }
    });
};

exports.put = function(req, res, id) {
    Case.findByIdAndUpdate(req.body.id, req.body, function(err, c) {
        if (err) {
            console.log(err);
            res.status(500).send('We are working on that!');
        } else if(c == null) {
            console.log("Document with id: " + id + " is not in database.");
            res.status(404).send('Not found');
        } else {
            res.json(c);
        }
    })
};

exports.post = function(req, res){
    var c = new Case (req.body);

    c.save(function(err) {
        if (err) {
            console.log('Error on save Case entity');
            res.status(500).send('We are working on that!');
        } else {
            res.json(c);
        }
    });
};

exports.delete = function(req, res, id) {
    Case.findOneAndRemove({ _id: id }, function(err, c) {
        if (err) {
            console.log(err);
            res.status(500).send('We are working on that!');
        } else if(c == null) {
            console.log("Document with id: " + id + " is not in database.");
            res.status(404).send('Not found');
        } else {
            res.json({id: c._id});
        }
    });
};