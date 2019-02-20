import assert from 'assert'
import { plainToClass } from 'class-transformer'
import { InheritanceContainer } from './inheritanceContainer'
import { ModelInformationContainer } from './informationContainer'
import { Class } from './class'

export interface IModelOptionalArgs {
  name?: string
}

interface IModelInformation {
  path: string[]
}

export const modelContainer = new InheritanceContainer<Class>()
export const modelInformationContainer = new ModelInformationContainer<IModelInformation>()

/**
 * Tag a class as a model so that it can be bound to operations
 * @param klass class that is being tagged
 */
export function STIModel<C extends Class>({ name }: IModelOptionalArgs = {}) {
  return (klass: C) => {
    const className = name || klass.name
    assert(className, 'Name must be defined on the class or passed in')
    assert(
      !modelInformationContainer.get(klass),
      'A model with the same name was already registered'
    )

    const parentClass: Class = Object.getPrototypeOf(klass)

    let classPath: string[]

    // Parent class is not registered so this is a new top level class
    if (parentClass.name == '' || !modelInformationContainer.get(parentClass)) {
      classPath = [className]
    } else {
      classPath = [...modelInformationContainer.get(parentClass)!.path, className]
    }

    modelInformationContainer.set(klass, {
      path: classPath
    })

    // Register model with container
    modelContainer.set(classPath, klass)

    return klass
  }
}

/**
 * The class that each model should
 */
export class STIBaseModel {
  public static getClassName(_plainObject: any): string | null {
    return null
  }

  public static build<T extends { getAppropriateClass(obj: any): any }>(
    this: T,
    plainObject: any
  ): T {
    const appropriateClass = this.getAppropriateClass(plainObject)
    return (plainToClass(appropriateClass, plainObject) as any) as T
  }

  public static getAppropriateClass(plainObject: any) {
    const className = this.getClassName(plainObject)
    if (!className) {
      return this
    }
    const classPath = modelInformationContainer.getByName(className)

    assert(classPath, 'The model is not registered')
    return modelContainer.get(classPath!.path)
  }
}
