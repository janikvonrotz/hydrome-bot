require('dotenv').config()
const test = require('ava')
const { set, get, del, hset, hget } = require('./state')

test('state set and get', async t => {
  set('foo', 'bar')
  const result = await get('foo')
  t.is(result, 'bar')
})

test('state hset and hget', async t => {
  hset('hfoo', 'bar', 'nip')
  const result = await hget('hfoo', 'bar')
  t.is(result, 'nip')
})

test('state del', async t => {
  del('foo')
  del('hfoo')
  t.pass()
})
