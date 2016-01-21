var shortid = require('shortid');
var fs = require('fs');
var Table = require('cli-table2');

exports.list = function(){
	require('crontab').load(function(err, crontab) {
	   	if(err){
	   	  exports.error(err);
	   	}
	   	else{
			var jobs = crontab.jobs({comment:/(.*)\[rmdr: reminders from the terminal\](.*)/});
			var table = new Table({
			    head: ['id','message','min','h','dom','m','dow']
			});
			for(var i = 0; i < jobs.length; i++){
				var message = jobs[i].comment().split("[yourmessage=");
				message.splice(0,1);
				message = message.join("[yourmessage=]");
				var to_push = [i, message, jobs[i].minute().toString(), jobs[i].hour().toString(), jobs[i].dom().toString(), jobs[i].month().toString(), jobs[i].dow().toString()];
				table.push(to_push);
			}
			if(jobs.length > 0){
			  console.log(table.toString());
			}
			else{
			  console.log("nothing created");
			}
		}
	});
}

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

exports.createRelDateTime = function(_info, info, message,once){
	require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
	    var _date = new Date();
      _date.setHours(_info.time.hour);
      _date.setMinutes(_info.time.minute);
      if(_info.time.spec === true){
        if(_info.time.pm){
          _date.setHours(_date.getHours() + 12); 
        }
      }
      var date = ["" + _date.getMinutes(),"" +  _date.getHours(),"" + "*", "*", info.time];
      date = date.join(" ");
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.createDateTime = function(_info, info, message,once){
	require('crontab').load(function(err, crontab) {
	  if(err){
	     exports.error(err);
	   }
	    else{
	      var date = new Date();
	      var _date = new Date();
        _date.setHours(_info.time.hour);
        _date.setMinutes(_info.time.minute);
        if(_info.time.spec === true){
          if(_info.time.pm){
            _date.setHours(_date.getHours() + 12); 
          }
        }
        var date = ["" + _date.getMinutes(),"" +  _date.getHours(),"" + info.time.day, "*", "*"];
    	  if(info.time.month !== null){
    	    date[3] = info.time.month;
    	  }
    	  date = date.join(" ");
	      var id = shortid.generate();
	      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.createRelDate = function(info,message,once){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var _date = new Date();
      var date = ["" + _date.getMinutes(),"" +  _date.getHours(),"*", "*", info.time];
      console.log(date);
  	  date = date.join(" ");
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.createDate = function(info,message,once){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var _date = new Date();
      var date = ["" + _date.getMinutes(),"" +  _date.getHours(),"" + info.time.day, "*", "*"];
  	  if(info.time.month !== null){
  	    date[3] = info.time.month;
  	  }
  	  date = date.join(" ");
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.createRelTime = function(info, message,once){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      date.setSeconds(date.getSeconds() + info.time.time);
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.createTime = function(info, message,once){
  require('crontab').load(function(err, crontab) {
    if(err){
      exports.error(err);
    }
    else{
      var date = new Date();
      var _date = new Date();
      _date.setHours(info.time.hour);
      _date.setMinutes(info.time.minute);
      if(info.time.spec === false){
        if(date > _date){
          _date.setHours(_date.getHours() + 12);
        }
      }
      else{
        if(info.time.pm){
          _date.setHours(_date.getHours() + 12); 
        }
      }
      date = "" + _date.getMinutes() + " " + _date.getHours() + " * * *";
      var id = shortid.generate();
      var job = crontab.create(exports.makeCmd(message,id,once),date,exports.makeComment(message, id));
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

exports.makeComment = function(message, id){
  var ret = "[rmdr: reminders from the terminal][delete this if you don't want to be reminded about this thing][randomid=" + id + "][yourmessage=" + message;
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

exports.makeCmd = function(message, id, once){
  var ret = "a reminder from rmdr:\n+--------------------+\n" + message + "\n+--------------------+\npress Ctrl+C to exit";
  fs.writeFileSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.rmdr/' + id + '.txt', ret, { flags: 'wx', encoding: 'utf8' });
  
  var output = 'wall -n '+ process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] +'/.rmdr/' + id + '.txt ';
  
  if(once === true){
    output = output + '&& rm -f ' + process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] +'/.rmdr/' + id + '.txt '; //removes script'
    output = output + '&& crontab -l | grep ' + id + ' -v | crontab -'; //removes script'
  }
  return output;
}
