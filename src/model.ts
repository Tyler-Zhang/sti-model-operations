import { InheritanceContainer } from './containers/inheritanceContainer'
import { getParentClass } from './classUtils'
import { ClassInfoStore } from './classInfoStore'

export const modelContainer = new InheritanceContainer<any>()

/**
 * Tag a class as a model so that it can be bound to operations
 * @param klass class that is being tagged
 */
export function STIModel() {
  return (klass: any) => {
    const parentClass = getParentClass(klass)
    const parentClassInfoStore = ClassInfoStore.fromClass(parentClass)

    /**
     * If parentClass already has a info store, it means that it's
     * already registered and we should extend the typepath with
     * the new class
     *
     * If the parentClass is not registered, this is a new to level
     * class
     */
    let classInfoStore: ClassInfoStore
    if (parentClassInfoStore) {
      classInfoStore = ClassInfoStore.initOnClass(klass, {
        pathPrefix: parentClassInfoStore.getTypePath()
      })
    } else {
      classInfoStore = ClassInfoStore.initOnClass(klass)
    }

    modelContainer.set(classInfoStore.getTypePath(), klass)
  }
}
