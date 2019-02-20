export interface Class {
  new (...any: any[]): any
  name: string
  __proto__: Class
}
