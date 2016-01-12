#! /usr/bin/env node
var fs = require('fs');
var manager = require('./manager');
var time = require('./time');

var input = process.argv;
var _ok_cmds = ["me","set","list","rm","enabled","disabled","enable","disable","remove","create"];
var _cmds = {};
_cmds.me = function(arr){
  var text = arr.join(" ");
  if(text.indexOf("@") !== -1){
    var _split = text.split("@").reverse();
    var after = _split[0].trim();
    _split.splice(0,1);
    var before = _split.reverse().join("@").trim();
    //before is the reminder text
    //after is the time interval
    time.isValid(after);
  }
  else{
    //NO TIME PARAMETER!
  }
}
if(input.length > 2){
  input.splice(0,2);
  if(input.length !== 0){
    //command = first element
    var _chosen_cmd = input[0];
    if(_ok_cmds.indexOf(_chosen_cmd) !== -1){
      manager.init();
      input.splice(0,1);
      _cmds[_chosen_cmd](input);
    }
    else{
      //NO VALID COMMAND!
    }
  }
  else{
    //NO COMMAND!
  }
}