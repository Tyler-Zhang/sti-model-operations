import * as assert from 'assert'
import { InformationContainer } from '../src/containers/informationContainer'

describe('InformationContainer', () => {
  class TestClass {}
  let informationContainer: InformationContainer<string>
  const TEST_VALUE = 'test_value'

  beforeEach(() => {
    informationContainer = new InformationContainer()
  })

  it('sets and gets properly with classes', () => {
    assert.equal(informationContainer.get(TestClass as any), null)
    informationContainer.set(TestClass as any, TEST_VALUE)
    assert.equal(informationContainer.get(TestClass as any), TEST_VALUE)
  })

  const TEST_KEY = 'test_key'
  it('sets and gets properly with strings', () => {
    assert.equal(informationContainer.getByName(TEST_KEY), null)
    informationContainer.setByName(TEST_KEY, TEST_VALUE)
    assert.equal(informationContainer.getByName(TEST_KEY), TEST_VALUE)
  })
})
