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
january 12, 2016
Jan 12 2016
Jan 12 at 8:00pm
01/12/2016
friday

can have:...
[time]
at [time]
every [time]
every [time] at [time]
at [time] every [time]
*/

exports.getInfo = function(text){
  var ret = null;
  ret = this.isRelTime(text);
  if(ret.valid === true){
    return ret;
  }
  else{
    ret = this.isTime(text);
    if(ret.valid === true){
      return ret;
    }
  }
  return {
    valid: false,
    time: null,
    unit: null
  };
}

exports.isTime = function(text){
  //if there is not a date, be intelligent!
  text = text.trim().split(" ").join("").split(".").join("");
  var increase = false;
  if(/[0-9]+pm/g.test(text) === true || /[0-9]+:[0-9]+pm/g.test(text)){
    increase = true;
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
      pm: increase
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