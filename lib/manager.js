var fs = require('fs');
exports.init = function(){
  //check if ~/.rmdr exists
  try {
      stats = fs.lstatSync('/the/path');
      if (stats.isDirectory()) {
        //OK
      }
      else{
        //A FILE?
      }
  }
  catch (e) {
      //DOES NOT EXIST, SHOULD PROBABLY BE MADE
  }
}