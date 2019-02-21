import * as assert from 'assert'
import { InheritanceContainer } from '../src/containers/inheritanceContainer'

describe('InheritanceContainer', () => {
  let inheritanceContainer: InheritanceContainer<string>
  const TEST_VALUE = 'test_value'

  const TEST_PATH = ['a', 'b']
  const TEST_PATH2 = ['a', 'e']

  beforeEach(() => {
    inheritanceContainer = new InheritanceContainer()
  })

  describe('get', () => {
    it('returns null if the value is unset', () => {
      assert.equal(inheritanceContainer.get(TEST_PATH), null)
    })

    it('returns the set value', () => {
      inheritanceContainer.set(TEST_PATH, TEST_VALUE)
      assert.equal(inheritanceContainer.get(TEST_PATH), TEST_VALUE)
    })

    describe('with overlapping branches', () => {
      it('returns null if the full path has not been set', () => {
        inheritanceContainer.set(TEST_PATH, TEST_VALUE)
        assert.equal(inheritanceContainer.get(TEST_PATH2), null)
      })

      it('returns the value if it has been set', () => {
        const TEST_VALUE2 = 'test_value2'

        inheritanceContainer.set(TEST_PATH, TEST_VALUE)
        inheritanceContainer.set(TEST_PATH2, TEST_VALUE2)
        assert.equal(inheritanceContainer.get(TEST_PATH2), TEST_VALUE2)
      })
    })
  })

  describe('getDeepest', () => {
    it('returns the deepest', () => {
      inheritanceContainer.set(['a'], 'a')
      inheritanceContainer.set(['a', 'b'], 'b')
      inheritanceContainer.set(['a', 'b', 'c'], 'c')

      assert.equal(inheritanceContainer.getDeepest(['a']), 'a')
      assert.equal(inheritanceContainer.getDeepest(['a', 'b']), 'b')
      assert.equal(inheritanceContainer.getDeepest(['a', 'b', 'c']), 'c')
      assert.equal(inheritanceContainer.getDeepest(['a', 'b', 'c', 'd']), 'c')
    })
  })
})
