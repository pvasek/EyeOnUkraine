var model = require('./../../model');


exports.getAll = function(req, res){
	model.Case.find({deleted: { $ne: true }}).exec(function(err, items) {
        if (err) {
            console.log(err);
            res.status(500).send('We are working on that!');
        } else if (items.length == 0) {
            res.json([]);
        } else {
        	items.map(function(i){
        		return {
        			id: i.id,
        			title: i.title,
        			lat: i.lat,
        			lng: i.lng
        		}
        	})
            res.json(items);
        }
    });
};