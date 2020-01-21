require('dotenv').config()
const test = require('ava')
const { set, get, del, hset, hget, hkeys, hdel, incr } = require('./redis')

test('state set and get', async t => {
  await set('foo', 'bar')
  const result = await get('foo')
  t.is(result, 'bar')
})

test.serial('state hset and hget', async t => {
  hset('foo:set', 'bar', 'nip')
  const result = await hget('foo:set', 'bar')
  t.is(result, 'nip')
})

test.serial('state iterate hashset and hdel', async t => {
  hset('foo:map', 'bar1', 'nip')
  hset('foo:map', 'bar2', 'nip')
  hset('foo:map', 'bar3', 'nip')

  const set = await hkeys('foo:map')
  let result = set.map(async (field) => {
    return hget('foo:map', field)
  })
  t.is(result.length, 3)

  result = await hdel('foo:map', 'bar3')
  t.is(result, 1)
})

test.serial('state incr', async t => {
  await incr('foo:key')
  const result = await incr('foo:key')
  t.is(result, 2)
})

test.serial('state del', async t => {
  await del('foo')
  await del('foo:set')
  await del('foo:map')
  await del('foo:key')
  t.pass()
})
