import { ObjectType } from '../common/ObjectType'

type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never

export class ClassMetadataStore {
  static SELF_SYMBOL = Symbol('__sti_class_info_store')

  /**
   * Retrieve itself from a tagged class
   */
  static fromClass<T extends ClassMetadataStore>(this: ObjectType<T>, klass: any): T | undefined {
    if (!klass || !klass[ClassMetadataStore.SELF_SYMBOL]) {
      return
    }
    return klass[ClassMetadataStore.SELF_SYMBOL]
  }

  static fromClassInstance<T extends ClassMetadataStore>(
    this: ObjectType<T>,
    klassInstance: any
  ): T | undefined {
    if (!klassInstance.constructor) {
      return
    }
    return (this as any).fromClass(klassInstance.constructor)
  }

  static initOnClass<T extends ClassMetadataStore>(this: ObjectType<T>, ...args: any[]): T {
    const klass = (args as any)[0]
    const metadataStore = (this as any).constructSelf(...args) as any

    Object.defineProperty(klass, ClassMetadataStore.SELF_SYMBOL, {
      value: metadataStore,
      writable: false
    })

    return metadataStore as T
  }

  static constructSelf(...any: any[]) {
    throw new Error('This method needs to be overrided')
  }
}
