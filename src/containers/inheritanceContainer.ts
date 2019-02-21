const VALUE_SYM = Symbol('value')

interface IInheritanceContainerNode<Val> {
  [VALUE_SYM]?: Val

  // Could also be a symbol
  [key: string]: IInheritanceContainerNode<Val>
}

export class InheritanceContainer<Val> {
  private store: IInheritanceContainerNode<Val> = {}

  public set(path: Array<string | Symbol>, val: Val) {
    this.ensureNodeAtPath(path)

    const block = this.getBlockAtPath(path)
    block![VALUE_SYM] = val
  }

  public get(path: Array<string | Symbol>) {
    const block = this.getBlockAtPath(path)
    return block === null ? null : block[VALUE_SYM]
  }

  public getDeepest(path: Array<string | Symbol>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (currNode[pathPart as any]) {
        currNode = currNode[pathPart as any]
      } else {
        break
      }
    }

    return currNode[VALUE_SYM]
  }

  private getBlockAtPath(path: Array<string | Symbol>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (!currNode[pathPart as any]) {
        return null
      }
      currNode = currNode[pathPart as any]
    }
    return currNode
  }

  private ensureNodeAtPath(path: Array<string | Symbol>) {
    let currNode = this.store

    for (const pathPart of path) {
      if (!currNode[pathPart as any]) {
        currNode[pathPart as any] = {}
      }
      currNode = currNode[pathPart as any]
    }
  }
}
