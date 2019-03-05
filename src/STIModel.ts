import { InheritanceContainer } from './containers/InheritanceContainer'
import { getParentClass } from './classUtils'
import { ModelMetadataStore } from './metadata/ModelMetadataStore'

export const modelContainer = new InheritanceContainer<any>()

/**
 * Tag a class as a model so that it can be bound to operations
 * @param klass class that is being tagged
 */
export function STIModel() {
  return (klass: any) => {
    const parentClass = getParentClass(klass)
    const parentModelMetadataStore = ModelMetadataStore.fromClass(parentClass)

    /**
     * If parentClass already has a info store, it means that it's
     * already registered and we should extend the typepath with
     * the new class
     *
     * If the parentClass is not registered, this is a new to level
     * class
     */
    let classInfoStore: ModelMetadataStore
    if (parentModelMetadataStore) {
      classInfoStore = ModelMetadataStore.initOnClass(klass, {
        pathPrefix: parentModelMetadataStore.getTypePath()
      })
    } else {
      classInfoStore = ModelMetadataStore.initOnClass(klass)
    }

    modelContainer.set(classInfoStore.getTypePath(), klass)
  }
}
