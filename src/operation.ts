import * as assert from 'assert'
import * as util from 'util'
import { InheritanceContainer } from './containers/inheritanceContainer'
import { OperationMetadataStore } from './metadata/OperationMetadataStore'
import { getParentClass } from './classUtils'
import { ModelMetadataStore } from './metadata/ModelMetadataStore'
import { ObjectType } from './common/ObjectType'

const operationContainer = new InheritanceContainer<any>()

export function STIOperation(model: any) {
  return (klass: any) => {
    const modelMetadataStore = ModelMetadataStore.fromClass(model)
    assert.ok(modelMetadataStore, 'Could not find class name of the model')

    const parentClass = getParentClass(klass)
    const parentClassInfo = OperationMetadataStore.fromClass(parentClass)

    let operationMetadataStore: OperationMetadataStore
    if (parentClassInfo) {
      operationMetadataStore = OperationMetadataStore.initOnClass(
        klass,
        modelMetadataStore!.getTypePath(),
        {
          operationName: parentClassInfo.getOperationName()
        }
      )
    } else {
      operationMetadataStore = OperationMetadataStore.initOnClass(
        klass,
        modelMetadataStore!.getTypePath()
      )
    }

    operationContainer.set(operationMetadataStore.getTypePath(), klass)

    return klass
  }
}

export abstract class STIBaseOperation {
  abstract run(...args: any): any

  public static getAppropriateClass(...args: any[]) {
    const model = this.getModel(args)
    assert.ok(model, 'Cannot run operation with no model')

    const modelMetadataStore = ModelMetadataStore.fromClassInstance(model)
    assert.ok(modelMetadataStore, 'The model was not registered')

    const thisOperationMetadataStore = OperationMetadataStore.fromClass(this)
    assert.ok(thisOperationMetadataStore, 'This operation was not registered')

    const classPath = [
      thisOperationMetadataStore!.getOperationName(),
      ...modelMetadataStore!.getTypePath()
    ]

    return operationContainer.getDeepest(classPath)
  }

  public static getModel(..._args: any[]): any {
    return null
  }

  public static build(...args: any[]): any {
    const appropriateClass: any = this.getAppropriateClass(...args) || this
    return new appropriateClass(...args)
  }

  public static run<T extends STIBaseOperation>(this: ObjectType<T>, ...args: any[]) {
    return (this as any).build(...args).run() as ReturnType<T['run']>
  }
}
