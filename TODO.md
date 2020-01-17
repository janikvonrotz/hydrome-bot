# TODO

## Clean code

- [ ] Separate module for reminderPrint list

## Features

- [ ] Batch notifications
- [ ] Log all messages
- [ ] Add multi language
- [ ] Add nlp

## Dialog Chain

- [ ] Allow to abort delete reminder action

## Bugs

- [ ] Lists of reminders have a comma on each line

# DONE

## Bugs

- [x] Answer callback_query with callback_query_id automatically
- [x] Update must delete the existing reminders
- [x] Ensure job runs properly -> somethings odd with the db calls :/ -> maybe add secret /cron command or check if foreach is a good option promise all sure is complicated -> forEach is not async https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404 -> use for in loop