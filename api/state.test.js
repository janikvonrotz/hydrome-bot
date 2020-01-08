require('dotenv').config()
const test = require('ava')
const { setState, getState } = require('./state')

test('db set key', async t => {
  setState('foo2', 'bar2')
  const result = await getState('foo2')
  t.is(result, 'bar2')
})
