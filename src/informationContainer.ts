import { Class } from './class'

export class ModelInformationContainer<I> {
  private store: Record<string, I> = {}

  public set(klass: Class, info: I) {
    this.store[klass.name] = info
  }

  public get(klass: Class): I | null {
    return this.getByName(klass.name)
  }

  public getByName(name: string): I | null {
    return this.store[name]
  }
}
