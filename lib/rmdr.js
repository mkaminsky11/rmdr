#! /usr/bin/env node
var fs = require('fs');
var manager = require('./manager');
var time = require('./time');
var create = require('./create');

var input = process.argv;
var _ok_cmds = ["me","list","clear","remove","help","init"];
var _ok_tags = ["-in","-i","-time","-t","-date","-d","-every","-e","-message","-m"];

var _cmds = {};
_cmds.me = function(arr){
  var text = arr.join(" ").toLowerCase();
  var arr1 = text.split(/-[a-z]+/g);
  var arr2 = text.match(/-[a-z]+/g);
  if(arr1.length > 1){ //2 or 3
    if(arr1[0] === ""){
      arr1.splice(0,1);
      if(arr2.indexOf("-m") === -1 && arr.indexOf("-message") === -1){
        //NO MESSAGE!
        console.log("rmdr: no message found! usage: rmdr me [message] [options]")
      }
    }
    else{
      arr2.reverse();
      arr2.push("-m");
      arr2.reverse();
    }
    var message = null;
    for(var i = 0; i < arr2.length; i++){
      arr1[i] = arr1[i].trim();
      arr2[i] = arr2[i].trim();
      if(_ok_tags.indexOf(arr2[0]) === -1){
        //INVALID TAG!
        console.log("rmdr: invalid tag! use 'rmdr help' to see valid tags")
      }
      else if(arr2[i] === "-m" || arr2[i] === "-message"){
        message = arr1[i];
      }
    }
    arr2 = manager.cleanTags(arr2);
    var _every = false;
    var _in = false;
    var _time = false;
    var _date = false;
    if(arr2.indexOf("-e") !== -1){_every=true}
    if(arr2.indexOf("-i") !== -1){_in=true}
    if(arr2.indexOf("-t") !== -1){_time=true}
    if(arr2.indexOf("-d") !== -1){_date=true}
    if(_in && !_every && !_time && !_date){
      var ret = time.isRelTime(arr1[arr2.indexOf("-i")]);
      if(ret.valid === true){
        create.createRelTime(ret, message, true);
      }
      else{
        //NOT VALID
        console.log("rdmr: invalid interval!")
      }
    }
    else if(!_in && !_every && time && !_date){
      var ret = time.isTime(arr1[arr2.indexOf("-t")]);
      if(ret.valid === true){
        create.createTime(ret, message,true);
      }
      else{
        //NOT VALID
        console.log("rdmr: invalid time!")
      }
    }
    else if(!_in && !_every && !_time && _date){
      var ret = time.isDate(arr1[arr2.indexOf("-d")]);
      if(ret.valid === true){
        if(ret.type === "reldate"){
          create.createRelDate(ret, message,true);
        }
        else{
          create.createDate(ret, message,true);
        }
      }
      else{
        //NOT VALID
        console.log("rdmr: invalid date!")
      }
    }
    else if(!_in && !_every && _time && _date){
      var ret1 = time.isTime(arr1[arr2.indexOf("-t")]);
      if(ret1.valid === true){
        var ret2 = time.isDate(arr1[arr2.indexOf("-d")]);
        if(ret2.valid === true){
          if(ret2.type === "reldate"){
            create.createRelDateTime(ret1, ret2, message,true);
          }
          else{
            create.createDateTime(ret1, ret2, message,true);
          }
        }
        else{
          //NOT VALID
          console.log("rdmr: invalid date or time!")
        }
      }
      else{
        //NOT VALID
        console.log("rdmr: invalid date or time!")
      }
    }
    else if(!_in && _every && !_time && !_date){
      var ret = time.isTime(arr1[arr2.indexOf("-t")]);
      if(ret.valid === true){
        create.createTime(ret, message,false);
      }
      else{
        ret = time.isDate(arr1[arr2.indexOf("-d")]);
        if(ret.valid === true){
          if(ret.type === "reldate"){
            create.createRelDate(ret, message,false);
          }
          else{
            create.createDate(ret, message,false);
          }
        }
        else{
          //NOT VALID
          console.log("rdmr: invalid options!")
        }
      }
    }
    else{
	    //NOT VALID COMBINATION!
	    console.log("rdmr: invalid input!")
    }
  }
  else{
    //NOT VALID INPUT!
    console.log("rdmr: invalid input!")
  }
};

_cmds.remove = function(arr){
  create.remove(arr);
}

_cmds.list = function(arr){
	create.list();
}

_cmds.clear = function(arr){
  create.clear();
}

_cmds.init = function(){
  
}

_cmds.help = function(arr){
  var text = fs.readFileSync('help.txt','utf8');
  console.log(text);
}

if(input.length > 2){
  input.splice(0,2);
  if(input.length !== 0){
    var _chosen_cmd = input[0];
    if(_ok_cmds.indexOf(_chosen_cmd) !== -1){
      manager.init();
      input.splice(0,1);
      _cmds[_chosen_cmd](input);
    }
    else{
      //NO VALID COMMAND!
      console.log("rdmr: invalid command!")
    }
  }
  else{
    //NO COMMAND!
    console.log("rdmr: no command!")
  }
}