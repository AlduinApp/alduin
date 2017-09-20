export default class ExtendableError {
  constructor() {
    this.stack = (new Error()).stack
    this.name = this.constructor.name
  }
}