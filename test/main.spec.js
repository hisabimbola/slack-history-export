import test from 'tape'
import addTwoNumbers from 'main'

test('main module is a function', (t) => {
  t.equal(typeof addTwoNumbers, 'function')

  t.end()
})

test('addTwoNumbers return 5 for 2 and 3', (t) => {
  t.equal(addTwoNumbers(2, 3), 5)

  t.end()
})
