var constants = [
  {
    name: "minute",
    alias: ["min","mins","min.","mins.","minutes"],
    time: 60
  },
  {
    name: "hour",
    alias: ["hr","hrs","hr.","hrs.","hours"],
    time: 60 * 60
  },
  {
    name: "day",
    alias: ["d","d.","days"],
    time: 24 * 60 * 60
  }
];

/*
5 min
5min
7:45 <--am
7:45pm
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

exports.isValid = function(text){
  //should return {valid, err, at, every}
  text = text.toLowerCase();
  text = text.trim();
  if(text === ""){
    return {
      valid: false,
      err: "empty text",
      at: null,
      every: null
    };
  }
  else{
    var arr = text.split(" ");
    if(arr[0] !== "at" && arr[0] !== "every"){
      //does not start with at|every
      arr.reverse();
      arr.push("at");
      arr.reverse();
    }
    text = arr.join(" ");
    //check how many occurances of at...every
    if( (text.split("at").length - 1) > 1 || (text.split("every").length - 1) > 1 ){
      return {
        valid: false,
        err: "too many keywords",
        at: null,
        every: null
      };
    }
    else{
      //should get at and every
      _arr = text.split(/every|at/);
      _arr.splice(0,1);
      console.log(_arr);
      var at = null;
      var every = null;
      if(text.indexOf("at") === -1){
        //just every
        every = _arr[0].trim();
      }
      else if(text.indexOf("every") === -1){
        //just at
        at = _arr[0].trim();
      }
      else{
        //both...check which one comes first
        if(text.indexOf("every") > text.indexOf("at")){
          //every is second
          every = _arr[1].trim();
          at = _arr[0].trim();
        }
        else{
          at = _arr[1].trim();
          every = _arr[0].trim();
        }
      }
      console.log("at:" + at);
      console.log("every:" + every);
    }
  }
}