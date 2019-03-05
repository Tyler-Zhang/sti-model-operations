import { ClassMetadataStore } from './ClassMetadataStore'

interface IOperationMetadataStoreInitOnClassOpts {
  name?: string
  pathPrefix?: Symbol[]
  operationName?: string
}

export class OperationMetadataStore extends ClassMetadataStore {
  constructor(private typePath: Array<string | Symbol>, private operationName: string) {
    super()
  }

  public getTypePath() {
    return this.typePath
  }

  public getOperationName() {
    return this.operationName
  }

  /**
   * Init the store onto a klass
   */
  static constructSelf(
    klass: any,
    modelPath: Array<string | Symbol>,
    { name = klass.name, operationName = name }: IOperationMetadataStoreInitOnClassOpts = {}
  ) {
    return new OperationMetadataStore([operationName, ...modelPath], operationName)
  }
}
