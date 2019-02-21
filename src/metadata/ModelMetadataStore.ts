import { ClassMetadataStore } from './ClassMetadataStore'

interface IModelMetadataStoreInitOnClassOpts {
  name?: string
  pathPrefix?: Symbol[]
}

export class ModelMetadataStore extends ClassMetadataStore {
  constructor(private uniqueId: Symbol, private typePath: Symbol[]) {
    super()
  }

  public getUniqueId() {
    return this.uniqueId
  }

  public getTypePath() {
    return this.typePath
  }

  /**
   * Init the store onto a kalss
   */
  static constructSelf(
    klass: any,
    { name = klass.name, pathPrefix = [] }: IModelMetadataStoreInitOnClassOpts = {}
  ) {
    const classSymbol = Symbol(name)
    return new ModelMetadataStore(classSymbol, [...pathPrefix, classSymbol])
  }
}
