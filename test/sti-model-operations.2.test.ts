import * as assert from 'assert'
import { STIBaseOperation, STIModel, STIOperation } from '../src/sti-model-operations'

@STIModel()
class ModelA {}

@STIModel()
class ModelA2 extends ModelA {}

@STIModel()
class ModelA3 extends ModelA2 {}

let $model = () => new ModelA3()

@STIOperation(ModelA)
class OperationA extends STIBaseOperation {
  public run() {
    return 'a'
  }

  static getModel() {
    return $model()
  }
}

@STIOperation(ModelA3)
class OperationA3 extends OperationA {
  public run() {
    return 'a3'
  }
}

describe('sti-mode-operations', () => {
  describe('when there is a hierarchy', () => {
    describe('when returning the most subclassed model', () => {
      beforeEach(() => {
        $model = () => new ModelA3()
      })

      it('calls the correct operation when using the operation itself', () => {
        assert.equal(OperationA3.run(), 'a3')
      })

      it('calls the correct operation when using the parent operation', () => {
        assert.equal(OperationA.run(), 'a3')
      })
    })

    describe('when returning a model that does not have a direct operation', () => {
      beforeEach(() => {
        $model = () => new ModelA2()
      })

      it('calls the next lowest operation', () => {
        assert.equal(OperationA.run(), 'a')
      })

      it('calls the next lowest operation from a higher operation', () => {
        assert.equal(OperationA3.run(), 'a')
      })
    })
  })
})
