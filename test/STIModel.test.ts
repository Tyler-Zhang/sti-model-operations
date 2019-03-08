import { STIModel, buildSTIModel } from '../src/sti-model-operations'
import * as assert from 'assert'

@STIModel()
class ModelA {
  public attributeA!: number
}

@STIModel()
class ModelA2 extends ModelA {
  public attributeB!: number
}

@STIModel()
class ModelA3 extends ModelA2 {
  public attributeC!: number
}

function className(instance: any): String {
  return instance.constructor.name
}

describe('buildSTIModel', () => {
  it('builds the correct model given paths', () => {
    assert.strictEqual(
      className(buildSTIModel(['ModelA', 'ModelA2', 'ModelA3'], { attributeC: 10 })),
      'ModelA3'
    )

    assert.strictEqual(
      className(buildSTIModel(['ModelA', 'ModelA2'], { attributeB: 10 })),
      'ModelA2'
    )

    assert.strictEqual(className(buildSTIModel(['ModelA'], { attributeC: 10 })), 'ModelA')
  })

  it('builds the correct model given a class', () => {
    assert.strictEqual(className(buildSTIModel(ModelA3, { attributeC: 10 })), 'ModelA3')
  })
})
