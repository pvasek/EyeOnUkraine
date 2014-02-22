module.exports = function(model){

    var result = {};

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