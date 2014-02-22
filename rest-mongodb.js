

module.exports = function(model){

    var result = {};

    //lean() - see: http://ilee.co.uk/mongoose-documents-and-jsonstringify/
    // PV: I removed lean() in order to use the same toJSON method in all REST methods now
    result.get = function(req, res, id) {
        model.findOne({ _id: id }).exec(function(err, item) {
            if (err) {
                console.log(err);
                res.status(500).send('We are working on that!');
            } else if(item == null) {
                console.log("Document with id: " + id + " is not in database.");
                res.status(404).send('Not found');
            } else {
                res.json(item);
            }
        });
    };

    result.getList = function(req, res) {
        model.find({deleted: { $ne: true }}).exec(function(err, items) {
            if (err) {
                console.log(err);
                res.status(500).send('We are working on that!');
            } else if (items.length == 0) {
                //PV: i think its valid to have no results, just return empty array
                //res.status(404).send('Not found'); //MT: I'm not sure with 404 at this place
                res.json([]);
            } else {
                res.json(items);
            }
        });
    };

    result.put = function(req, res, id) {
        model.findByIdAndUpdate(req.body.id, req.body, function(err, item) {
            if (err) {
                console.log(err);
                res.status(500).send('We are working on that!');
            } else if(item == null) {
                console.log("Document with id: " + id + " is not in database.");
                res.status(404).send('Not found');
            } else {
                res.json(item);
            }
        })
    };

    result.post = function(req, res){
        var item = new model(req.body);

        item.save(function(err) {
            if (err) {
                console.log('Error on save Case entity');
                res.status(500).send('We are working on that!');
            } else {
                res.json(item);
            }
        });
    };

    result.deleteItem = function(req, res, id) {
        model.findByIdAndUpdate(id, { deleted: true }, function(err, item) {
            if (err) {
                console.log(err);
                res.status(500).send('We are working on that!');
            } else if(item == null) {
                console.log("Document with id: " + id + " is not in database.");
                res.status(404).send('Not found');
            } else {
                res.json({id: item._id});
            }
        });
    };

    return result;
};