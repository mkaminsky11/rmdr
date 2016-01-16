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

exports.createRelDateTime = function(_info, info, message){
	require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      var hour = _info.time.hour;
	  var min = _info.time.minute;
	  date.setMinutes(min);
	  date.setHours(hour);
	  if(_info.time.spec === false){
	    //just leave it
	  }
	  else{
	    if(_info.time.pm){
	  	  date.setHours(date.getHours() + 12); 
	    }
	  }
      if(date.getDay() === info.time){
        date.setDate(date.getDate() + 7);
      }
      else{
        while(date.getDay() !== info.time){
          date.setDate(date.getDate() + 1);
        }
      }
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

exports.createDateTime = function(_info, info, message){
	require('crontab').load(function(err, crontab) {
	    if(err){
	      exports.error(err);
	    }
	    else{
	      var date = new Date();
	      var _date = new Date();
	      var hour = _info.time.hour;
	      var min = _info.time.minute;
	      _date.setMinutes(min);
		  _date.setHours(hour);
	      if(_info.time.spec === false){
	        //just leave it
	      }
	      else{
	        if(_info.time.pm){
	          _date.setHours(_date.getHours() + 12); 
	        }
	      }
		  _date.setDate(info.time.day);
	      _date.setMonth(info.time.month - 1);
	      var curr_year = date.getFullYear() + "";
	      if(info.time.year !== null){
	        info.time.year = parseInt(curr_year.slice(0, curr_year.length - info.time.year.length) + info.time.year);
	        _date.setFullYear(info.time.year);
	        if(_date < date){
		        //NOT VALID
	        }
	        else{
		        date = _date;
	        }
	      }
	      else{
	        while(_date < date){
		        _date.setFullYear(_date.getFullYear() + 1);
	        }
	        date = _date;
	      }
	      
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

exports.createRelDate = function(info,message){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      //set default: noon
      //TODO
      date.setMinutes(0);
      date.setHours(12);
      if(date.getDay() === info.time){
        date.setDate(date.getDate() + 7);
      }
      else{
        while(date.getDay() !== info.time){
          date.setDate(date.getDate() + 1);
        }
      }
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

exports.createDate = function(info,message){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      var _date = new Date();
	  _date.setMinutes(0);
	  _date.setHours(12);
	  _date.setDate(info.time.day);
      _date.setMonth(info.time.month - 1);
      var curr_year = date.getFullYear() + "";
      if(info.time.year !== null){
        info.time.year = parseInt(curr_year.slice(0, curr_year.length - info.time.year.length) + info.time.year);
        _date.setFullYear(info.time.year);
        if(_date < date){
	        //NOT VALID
        }
        else{
	        date = _date;
        }
      }
      else{
        while(_date < date){
	        _date.setFullYear(_date.getFullYear() + 1);
        }
        date = _date;
      }
      
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

exports.createTime = function(info, message){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      var hour = info.time.hour;
      var min = info.time.minute;
      var _date = new Date();
      _date.setHours(hour);
      _date.setMinutes(min);
      if(info.time.spec === false){
        if(date > _date){
          _date.setHours(_date.getHours() + 12);
          date = _date;
        }
        else{
          date = _date;
        }
      }
      else{
        if(info.time.pm){
          _date.setHours(_date.getHours() + 12); 
        }
        if(date > _date){
          _date.setHours(_date.getHours() + 24);
          date = _date;
        }
        else{
          date = _date;
        }
      }
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