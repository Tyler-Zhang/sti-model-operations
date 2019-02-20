const VALUE_SYM = Symbol('value')

interface IInheritanceContainerNode<Val> {
  [VALUE_SYM]?: Val
  [key: string]: IInheritanceContainerNode<Val>
}

export class InheritanceContainer<Val> {
  private store: IInheritanceContainerNode<Val> = {}

  public set(path: Array<string>, val: Val) {
    this.ensureNodeAtPath(path)

    const block = this.getBlockAtPath(path)
    block![VALUE_SYM] = val
  }

  public get(path: Array<string>) {
    const block = this.getBlockAtPath(path)
    return block == null ? null : block[VALUE_SYM]
  }

  public getDeepest(path: Array<string>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (currNode[pathPart]) {
        currNode = currNode[pathPart]
      } else {
        break
      }
    }

    return currNode[VALUE_SYM]
  }

  private getBlockAtPath(path: Array<string>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (!currNode[pathPart]) {
        return null
      }
      currNode = currNode[pathPart]
    }
    return currNode
  }

  private ensureNodeAtPath(path: Array<string>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (!currNode[pathPart]) {
        currNode[pathPart] = {}
      }
      currNode = currNode[pathPart]
    }
  }
}
