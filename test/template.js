var colors = require("colors"); //fix this somehow ... just do it manually
var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

execute("who", function(data){
	data = data.trim().split("\n");
	for(var i = 0; i < data.length; i++){
		var line = data[i];
		line = line.split(/\ +/g);
		if(line[1] !== "console"){
			var path = "/dev/" + line[1];
			var text = "hello".green; //craft it here
			exec("echo " + text + " > " + path, function(){});
		}
	}
});