# rmdr

#### Installation
```
npm install -g rmdr
```

#### Todo
+ errors
+ remove by id
+ edit
+ every
	+ `-e 5min`
	+ `-e jan 12`
	+ `-e friday`
	+ `-e 12pm`

#### One-time commands
```
rmdr me to do something -in 5min
rmdr me do do something -i 5min 	# idential to above

rmdr me get coffee -time 7:45 		# defaults to am
rmdr me get cofeee -t 7
rmdr me get more coffee -t 3pm

rmdr me finish the work -date 01/13/2016	# defaults to 12:00 (noon)
rmdr me finish the work -d January 13 2016
rmdr me finish the work -d January 13
rmdr me finish the work -d jan 13

rmdr me visit a place -date friday -time 10:00am
rmdr me visit a place -d Jan 12 -t 3		# implied 3am
```

#### Interval events
```

```

#### Managing reminders
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