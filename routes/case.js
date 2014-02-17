var _ = require("underscore");

var data = {
    '1': {id: 1, title: "case1", description: 'description'},
    '2': {id: 2, title: "case2", description: 'description'},
    '3': {id: 3, title: "case3", description: 'description'},
    '4': {id: 4, title: "case4", description: 'description'},
    '5': {id: 5, title: "case5", description: 'description'}
};


exports.get = function(req, res, id) {
    var item = data[id];
    if (!item) {
        res.status(404).send('Not found');
        return;
    }
    res.json(item);
};

exports.getList = function(req, res) {
    res.json(_.values(data));
};

exports.put = function(req, res, id) {
    req.body.id = id;
    data[id] = req.body;
    res.json({id: id});
};

exports.post = function(req, res){
    var inputData = _.isArray(req.body) ? req.body : [req.body];
    inputData.forEach(function(item){
        data[item.id] = item;
    });

    if (results.length === 1 ) {
        res.json(results[0]);
    } else {
        res.json(results);
    }
};

exports.delete = function(req, res, id) {
    delete data[id];
};