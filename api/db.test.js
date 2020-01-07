require('dotenv').config()
const db = require('db')
const test = require('ava')

test('db set key', async t => {
  db().set('foo', 'bar')
  const result = await db().getAsync('foo')
  t.is(result, 'bar')
})
