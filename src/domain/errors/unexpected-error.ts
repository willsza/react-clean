export class UnexpectedError extends Error {
  constructor() {
    super('Ops! Aconteceu algum erro inesperado. Por favor, tente novamente em alguns minutos.')
    this.name = 'UnexpectedError'
  }
}