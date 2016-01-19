var constants = [
  {
    alias: ["minute","min","mins","mn","mns","minutes"],
    time: 60
  },
  {
    alias: ["hour","hr","hrs","hours"],
    time: 60 * 60
  },
  {
    name: "day",
    alias: ["d","dy","ds","dys","days"],
    time: 24 * 60 * 60
  },
  {
    alias: ["month","months","mn","mth"],
    time: (365/12) * 24 * 60 * 60
  },
  {
    alias: ["week","wk","weeks","wks"],
    time: 7 * 24 * 60 * 60
  },
  {
    alias: ["year","years","yr","yrs"],
    time: 365 * 24 * 60 * 60
  }
];

var week = [
  ["sunday","sun"],
  ["monday","mon"],
  ["tuesday","tue","tues"],
  ["wednesday","wed"],
  ["thursday","thur","thurs"],
  ["friday","fri"],
  ["saturday","sat"]
];

var month = [
  ["january","jan"],
  ["february","feb"],
  ["march","mar"],
  ["april","apr"],
  ["may"],
  ["june","jun"],
  ["july","jul"],
  ["august","aug"],
  ["september","sept","sep"],
  ["october","oct"],
  ["november","nov"],
  ["december","dec"]
];

/*
5 min [x]
5min [x]
7:45 <--am [x]
7:45pm [x]
every 10 hours
every 10hrs
every friday
every friday at 8:00pm
every january
january 12, 2016 [x]
Jan 12 2016 [x]
Jan 12 at 8:00pm [x]
01/12/2016 [x]
friday [x]
*/

exports.isRelDate = function(text){
  for(var i = 0; i < week.length; i++){
    if(week[i].indexOf(text) !== -1){
      return {
        valid: true,
        time: i
      };
    }
  }
  return {
    valid: false,
    time: null
  }
}

exports.isAbsDate = function(text){ //TODO
  var _month = [];
  for(var i = 0; i < month.length; i++){
    _month.push(month[i][0]);
    for(var j = 0; j < month[i].length; j++){
      text = text.replace(month[i][j], month[i][0]);
    }
  }
  if(/[0-9]+\/[0-9]+\/[0-9]+/.test(text) === true){
    try{
      var arr = text.split("/");
      var _d = parseInt(arr[0]);
      var _m = parseInt(arr[1]);
      var _y = arr[2];
      return {
        valid: true,
        time: {
          day: _d,
          month: _m,
          year: _y
        }
      };
    }
    catch(e){
      return {
        valid: false,
        time: null
      }
    }
  }
  else if(/[a-z]+\ [0-9]+\ [0-9]+/.test(text) === true){
    try{
      var arr = text.split(" ");
      var _m = (_month.indexOf(arr[0])) + 1;
      var _d = parseInt(arr[1]);
      var _y = arr[2];
      return {
        valid: true,
        time: {
          day: _d,
          month: _m,
          year: _y
        }
      };
    }
    catch(e){
      return {
        valid: false,
        time: null
      }
    }
  }
  else if(/[0-9]+\/[0-9]+/.test(text) === true){
    try{
      var arr = text.split("/");
      var _d = parseInt(arr[0]);
      var _m = parseInt(arr[1]);
      var _y = null;
      return {
        valid: true,
        time: {
          day: _d,
          month: _m,
          year: _y
        }
      };
    }
    catch(e){
      return {
        valid: false,
        time: null
      }
    }
  }
  else if(/[a-z]+\ [0-9]+/.test(text) === true){
    try{
      var arr = text.split(" ");
      var _m = (_month.indexOf(arr[0])) + 1;
      var _d = parseInt(arr[1]);
      var _y = null;
      return {
        valid: true,
        time: {
          day: _d,
          month: _m,
          year: _y
        }
      };
    }
    catch(e){
      return {
        valid: false,
        time: null
      }
    }
  }
  else{
	if(_month.indexOf(text) !== -1){
		//maybe a month?
		return {
			valid: true,
			time: {
				day: 1,
				month: (_month.indexOf(text)) + 1,
				year: null
			}
		};
	}
    return {
      valid: false,
      time: null
    }
  }
}

exports.isDate = function(text){
  text = text.toLowerCase();
  var ret = exports.isRelDate(text);
  if(ret.valid === true){
    return {
      valid: true,
      time: ret.time,
      type: "reldate"
    };
  }
  else{
    ret = exports.isAbsDate(text);
    if(ret.valid === true){
      return {
        valid: true,
        time: ret.time,
        type: "absdate"
      };
    }
    else{
      return {
        valid: false,
        time: null
      }
    }
  }
};

exports.isTime = function(text){
  text = text.toLowerCase()
  text = text.trim().split(" ").join("").split(".").join("");
  var increase = false;
  var spec = false;
  if(/[0-9]+pm/g.test(text) === true || /[0-9]+:[0-9]+pm/g.test(text)){
    increase = true;
    spec = true;
  }
  if(/[0-9]+am/g.test(text) === true || /[0-9]+:[0-9]+am/g.test(text)){
    spec = true;
  }
  text.replace("am","").replace("pm","");
  var arr = text.split(":");
  var first = parseInt(arr[0]);
  var second = 0;
  if(arr.length > 1){
    second = parseInt(arr[1]);
  }
  if(arr.length === 0 || arr.length > 2 || first > 12 || second > 59 || first < 1 || second < 0){
    return {
      valid: false,
      time: null
    };
  }
  
  return{
    type: "time",
    valid: true,
    time: {
      hour: first,
      minute: second,
      pm: increase,
      spec: spec
    }
  };
}

exports.isRelTime = function(text){
  //5 min, etc.
  text = text.trim();
  text = text.split(" ").join("");
  if(/[0-9]+[a-z]+/g.test(text) === true){
    try{
      var char = /[a-z]+/g.exec(text)[0];
      var num = /[0-9]+/g.exec(text)[0];
      num = parseInt(num);
      if(num > 0){
        for(var i = 0; i < constants.length; i++){
          for(var j = 0; j < constants[i].alias.length; j++){
            if(constants[i].alias[j] === char){
              return {
                type: "reltime",
                valid: true,
                time: {
                  time: num * constants[i].time,
                  unit: constants[i].alias[0]
                }
              };
            }
          }
        }
      }
      return {
        valid: false,
        time: null
      };
    }
    catch(e){
      return {
        valid: false,
        time: null
      };
    }
  }
  else{
    return {
      valid: false,
      time: null
    };
  }
};