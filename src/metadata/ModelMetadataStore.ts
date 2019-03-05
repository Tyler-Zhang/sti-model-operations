import { ClassMetadataStore } from './ClassMetadataStore'

interface IModelMetadataStoreInitOnClassOpts {
  name?: string
  pathPrefix?: string[]
}

export class ModelMetadataStore extends ClassMetadataStore {
  constructor(private typePath: string[]) {
    super()
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
    return new ModelMetadataStore([...pathPrefix, name])
  }
}
