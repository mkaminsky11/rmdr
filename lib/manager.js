var fs = require('fs');
exports.init = function(){
  if(process.platform === "linux" || process.platform === "darwin"){
  }
  else{
    console.log("sorry, OSX/Linux only!");
    process.exit();
  }
  try {
       var stats = fs.lstatSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr');
       if(stats.isDirectory()){}
       else{}
  }
  catch(e){
      //DOES NOT EXIST, SHOULD PROBABLY BE MADE
      fs.mkdirSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr');
  }
}

exports.cleanTags = function(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i] = "-" + arr[i].charAt(1);
  }
  return arr;
}