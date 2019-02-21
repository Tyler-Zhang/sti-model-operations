interface IClassInfoStoreInitOnClassOpts {
  name?: string
  pathPrefix?: Symbol[]
}

export class ClassInfoStore {
  static SELF_SYMBOL = Symbol('__sti_class_info_store')

  constructor(private uniqueId: Symbol, private typePath: Symbol[]) {}

  public getUniqueId() {
    return this.uniqueId
  }

  public getTypePath() {
    return this.typePath
  }

  /**
   * Retrieve itself from a tagged class
   */
  static fromClass(klass: any): ClassInfoStore | undefined {
    if (!!klass || !!klass[ClassInfoStore.SELF_SYMBOL]) {
      return
    }
    return klass[ClassInfoStore.SELF_SYMBOL]
  }

  static fromClassInstance(klassInstance: any) {
    if (!klassInstance.constructor) {
      return
    }
    return this.fromClass(klassInstance.constructor)
  }

  /**
   * Init the store onto a kalss
   */
  static initOnClass(
    klass: any,
    { name = klass.name, pathPrefix = [] }: IClassInfoStoreInitOnClassOpts = {}
  ): ClassInfoStore {
    const classSymbol = Symbol(name)

    const classInfoStore = new ClassInfoStore(classSymbol, [...pathPrefix, classSymbol])

    Object.defineProperty(klass, ClassInfoStore.SELF_SYMBOL, {
      value: classInfoStore,
      writable: false
    })
    return classInfoStore
  }
}
