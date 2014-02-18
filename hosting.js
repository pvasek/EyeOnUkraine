exports.getMongoUrl = function(defaultUrl){

    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        console.log("ENVIRONMENT:");
        console.log(env);

        var mongo = env['mongodb2-2.4.8'][0]['credentials'];

        var generate_mongo_url = function(obj){
            obj.hostname = (obj.hostname || 'localhost');
            obj.port = (obj.port || 27017);
            obj.db = (obj.db || 'test');
            if(obj.username && obj.password){
                return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
            else{
                return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
            }
        };
        return generate_mongo_url(mongo);
    }
    return defaultUrl;
};

exports.getPort = function (defaultPort) {
    return process.env.VCAP_APP_PORT || process.env.PORT || defaultPort;
};
