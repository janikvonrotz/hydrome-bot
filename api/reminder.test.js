const Reminder = require('./reminder')
require('dotenv').config()
const test = require('ava')
const { set, get, del } = require('./state')

test.serial('reminder set and get', async t => {
  let reminder = new Reminder('foo')
  await set('reminder', JSON.stringify(reminder))
  reminder = Object.setPrototypeOf(JSON.parse(await get('reminder')), Reminder.prototype)
  t.is(reminder.getName(), 'foo')
})

test.serial('reminder del', async t => {
  await del('reminder')
  t.pass()
})
