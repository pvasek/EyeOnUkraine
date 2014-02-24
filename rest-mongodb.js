var models = require('./model');

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
        var body = req.body;

        //User could not change user's email
        //MT: Maybe we should rethink concept of this common rest interface
        if (model == models.User) {
            delete body.email;

            model.findById(req.user.id, function(err, user) {
                if (err) {
                    console.log(err);
                    res.status(500).send("We are working on that!");
                    return;
                } else if(user == null) {
                    console.log("Current user with id: " + user.id + " is not in database.");
                    res.status(404).send("Not found");
                    return;
                } else {
                    if(user.id == body.id) {
                        model.findByIdAndUpdate(body.id, body, function(err, item) {
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
                    } else {
                        if(user.isAdministrator) {
                            model.findByIdAndUpdate(body.id, body, function(err, item) {
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
                        } else {
                            res.status(500).send("You are not Administrator");
                            return;
                        }
                    }
                }
            });
        } else {
            model.findByIdAndUpdate(body.id, body, function(err, item) {
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
        }
    };

    result.post = function(req, res){
        var item = new model(req.body);

        item.save(function(err) {
            if (err) {
                console.log('Error on save Case entity' + err);
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