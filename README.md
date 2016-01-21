# rmdr

#### Installation
```
npm install -g rmdr 
```

#### Basic usage
```
rmdr [me|clear|list|remove] [messsage] [options]

rmdr me get coffee -in 10min
rmdr me project is due -date jan 30
rmdr me get lunch -time 12:30
rmdr me work out -every 7am
rmdr me do something -every friday -time 3pm
```

##### Interval
```
rmdr me [messsage] -in [interval]
rmdr me [messsage] -i [interval]
```
Types of intervals:
+ `minute|min|minutes|mins`
+ `hour|hr|hrs|hours`
+ `day|d|days|dy`
+ `month`
+ `week|weeks|wk|wks`

Examples:
```
-i 10 min
-i 5min
```

##### Date
```
rmdr me [message] -date [date]
rmdr me [message] -d [date]
rmdr me [message] -every [date]
rmdr me [messsage] -e [date]
```
Date formats:
+ day of week: `sun, mon, tues, wed, thurs, fri, sat`
+ day of month: `1-31`
+ month/day of month: `1-12/1-31' or `jan-dec/1-31`

Examples:
```
-d 12 #12th day of month
-d jan 12
-d 1/12
```

##### Time
```
rmdr me [messsage] -time [time]
rmdr me [messsage] -t [time]
rmdr me [messsage] -every [time]
rmdr me [message] -e [time]
```
Time formats:
+ hour: `1-12` automatically decides on am or pm
+ hour minute: `1-12:0-59`
+ hour am/pm: `1-12am` or `1-12pm`
+ hour minute am/pm: `1-12:0-59am` or `1-12:0-59pm`

Examples:
```
-t 7
-t 7pm
-t 12:30
-t 12:30pm
```

##### Date and time
```
rmdr me [message] -date [date] -time [time]
rmdr me [message] -d [date] -t [time]
```
Examples:
```
-d jan 12 -t 7pm
-d 01/12 -t 12:30
```

##### Managing reminders
```
rmdr clear 	# deletes all created reminders

rmdr list #everything scheduled
┌────┬─────────────────────┬─────┬────┬─────┬───┬─────┐
│ id │ message             │ min │ h  │ dom │ m │ dow │
├────┼─────────────────────┼─────┼────┼─────┼───┼─────┤
│ 0  │ something           │ 12  │ 17 │ 18  │ 1 │ *   │
├────┼─────────────────────┼─────┼────┼─────┼───┼─────┤
│ 1  │ pick up the laundry │ 0   │ 12 │ 20  │ 1 │ *   │
└────┴─────────────────────┴─────┴────┴─────┴───┴─────┘

rmdr remove 0 # by id
```