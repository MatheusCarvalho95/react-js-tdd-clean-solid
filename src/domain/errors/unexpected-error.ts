export class UnexpectedError extends Error {
  constructor() {
    super("Ops! Algo errado aconteceu, tente novamente.");
    this.name = "UnexpectedError";
  }
}
