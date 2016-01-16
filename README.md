# rmdr

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

rmdr set default 1:00pm

rmdr list #everything scheduled
# id  |   title    |  when
# ----+------------+-------
# 0   | something  | every day

rmdr rm 0 # by id

rmdr enabled
# id |  service    |  data
# ---+-------------+-------
#  0 |  local      |       
#  1 |  email      | some@thing.com
#  2 |  email      | huh@wut.com

rmdr disable 0
rmdr enable 0
rmdr remove 0
rmdr create email new@mail.com
```
