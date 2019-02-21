import * as assert from 'assert'
import { STIBaseOperation, STIModel, STIOperation } from '../src/sti-model-operations'

/**
 * Setup the model operation relationships
 */
@STIModel()
class ModelA {}

@STIModel()
class ModelB {}

@STIOperation(ModelA)
class OperationA extends STIBaseOperation {
  public run() {
    return 'a'
  }

  static getModel() {
    return new ModelA()
  }
}

@STIOperation(ModelB)
class OperationB extends STIBaseOperation {
  public run(a: number) {
    return 'b'
  }

  static getModel() {
    return new ModelB()
  }
}

describe('sti-model-operations', () => {
  describe('when there are only top-level operations', () => {
    it('calls itself', async () => {
      assert.equal(OperationA.run(), 'a')
      assert.equal(OperationB.run(), 'b')
    })
  })
})
