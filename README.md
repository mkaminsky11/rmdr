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
rmdr me to do something in 5 min
rmdr me have something don in 10hrs
rmdr me in can have in in it at every day
rmdr me take out the trash every day
rmdr me every 4th friday keep it classy

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
