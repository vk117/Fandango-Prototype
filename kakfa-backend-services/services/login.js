
function handle_request(msg, callback){

    var res = [

        { 'project' : 1 },
        { 'project' : 1 },
        { 'project' : 1 },
        { 'project' : 1 },
        { 'project' : 1 },
        { 'project' : 1 }

    ];
    


    callback(null, res);
}

exports.handle_request = handle_request;