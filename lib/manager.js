var fs = require('fs');

exports.init = function(){
  try {
       var stats = fs.lstatSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr');
       if(stats.isDirectory()){} else{}
  }
  catch(e){
      try{
        fs.mkdirSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr');
        var output = JSON.stringify({
          cmd: "",
          template: "rmdr: {message}"
        });
        fs.writeFileSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr/config.json', output, { flags: 'wx', encoding: 'utf8' });
      }
      catch(e){
        console.log("rmdr: error creating ~/.rmdr!")
      }
  }
}

exports.cleanTags = function(arr){
  for(var i = 0; i < arr.length; i++){
    arr[i] = "-" + arr[i].charAt(1);
  }
  return arr;
}