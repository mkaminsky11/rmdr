# rmdr

#### TODO
+ 1st: parse commands
+ register ways to remind
  + local or remote
  + shell (cron or something else)
  + mail
  + twitter message (?)
+ send reminders to server which need mail, etc.

keywords: `at, in, every` (1st or last occurance...if both, say so)

```
rmdr me to have coffee @ 5 min
rmdr me fix the app @ 7:45pm
rmdr me something something @ every friday # will remind at default
rmdr me create new product @ 9:00am every monday
rmdr me something @ 10hrs.

rmdir set default 1:00pm

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
