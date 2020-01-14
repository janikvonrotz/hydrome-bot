require('dotenv').config()
const test = require('ava')
const { set, get, del, hset, hget, hkeys, hdel } = require('./state')

test('state set and get', async t => {
  set('foo', 'bar')
  const result = await get('foo')
  t.is(result, 'bar')
})

test.serial('state hset and hget', async t => {
  hset('hfoo', 'bar', 'nip')
  const result = await hget('hfoo', 'bar')
  t.is(result, 'nip')
})

test.serial('state iterate hashset and hdel', async t => {
  hset('fooset', 'bar1', 'nip')
  hset('fooset', 'bar2', 'nip')
  hset('fooset', 'bar3', 'nip')

  const set = await hkeys('fooset')
  let result = set.map(async (field) => {
    return hget('fooset', field)
  })
  t.is(result.length, 3)

  result = await hdel('fooset', 'bar3')
  t.is(result, 1)
})

test.serial('state del', async t => {
  del('foo')
  del('hfoo')
  del('fooset')
  t.pass()
})
