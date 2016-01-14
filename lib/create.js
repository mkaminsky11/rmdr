var shortid = require('shortid');
var fs = require('fs');

exports.clear = function(){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      crontab.remove({comment:/(.*)\[rmdr: reminders from the terminal\](.*)/});
      crontab.save(function(err, crontab) {
        if(err){
          exports.error(err);
        }
        else{
          //ALL GOOD
        }
      });
    }
  });
}

exports.createRelTime = function(info, message){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      date.setSeconds(date.getSeconds() + info.time.time);
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id),date,exports.makeComment(id));
      if(job === null){exports.error()}
      else{
        crontab.save(function(err, crontab) {
          if(err){
            exports.error(err);
          }
          else{
            //ALL GOOD
          }
        });
      }
    }
  });
}

exports.error = function(err){
  //SOME ERROR
  console.log(err);
}

exports.makeComment = function(id){
  var ret = "[rmdr: reminders from the terminal][delete this if you don't want to be reminded about this thing][randomid=" + id + "]";
  return ret;
}

exports.getJobs = function(callback){
  require('crontab').load(function(err, crontab) {
    if(err){
      this.error();
    }
    else{
      callback(crontab.jobs());
    }
  });
}

exports.makeCmd = function(message, id){
	var ret =   "+---------------------------------+\n";
	ret = ret + "| rmdr just wanted to remind you: |\n";
	ret = ret + "+---------------------------------+\n";
	ret = ret + message;
	ret = ret +  "\n+---------------------------------+\n";
	ret = ret +    "| for help with rmdr:  rmdr help  |\n";
	ret = ret +    "+---------------------------------+";

  fs.writeFileSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr/' + id + '.txt', ret, { flags: 'wx' });
  return 'wall -t 1 -n '+ process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] +'/.rmdr/' + id + '.txt && rm -rf ' + process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] +'/.rmdr/' + id + '.txt'; //removes script
}