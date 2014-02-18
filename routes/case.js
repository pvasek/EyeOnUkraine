var mongoose = require('mongoose');

// connect to db
var dbUri = 'mongodb://localhost/eyeonukraine';
var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect(dbUri, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + dbUri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + dbUri);
    }
});

var caseSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    date: Date,
    numberOfVictims: { type: Number, min: 0 },
    description: String
});

var Case = mongoose.model('Cases', caseSchema);

//lean() - see: http://ilee.co.uk/mongoose-documents-and-jsonstringify/

exports.get = function(req, res, id) {
    Case.findOne({ _id: id }).lean().exec(function(err, c) {
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
            console.log("There is no documents in database.");
            res.status(404).send('Not found'); //I'm not sure with 404 at this place
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
            res.json({id: c._id});
        }
    })
};

exports.post = function(req, res){
    var c = new Case ({title: req.body.name,
                       date: new Date(req.body.date),
                       numberOfVictims: req.body.numberOfVictims,
                       description: req.body.description});

    c.save(function(err) {
        if (err) {
            console.log('Error on save Case entity');
            res.status(500).send('We are working on that!');
        } else {
            res.json({id: c._id});
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