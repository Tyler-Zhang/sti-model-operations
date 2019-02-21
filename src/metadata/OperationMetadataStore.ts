import { ClassMetadataStore } from './ClassMetadataStore'

interface IOperationMetadataStoreInitOnClassOpts {
  name?: string
  pathPrefix?: Symbol[]
  operationName?: string
}

export class OperationMetadataStore extends ClassMetadataStore {
  constructor(
    private uniqueId: Symbol,
    private typePath: Array<string | Symbol>,
    private operationName: string
  ) {
    super()
  }

  public getUniqueId() {
    return this.uniqueId
  }

  public getTypePath() {
    return this.typePath
  }

  public getOperationName() {
    return this.operationName
  }

  /**
   * Init the store onto a kalss
   */
  static constructSelf(
    klass: any,
    modelPath: Array<string | Symbol>,
    { name = klass.name, operationName = name }: IOperationMetadataStoreInitOnClassOpts = {}
  ) {
    const classSymbol = Symbol(name)

    return new OperationMetadataStore(classSymbol, [operationName, ...modelPath], operationName)
  }
}
