export class ApiError extends Error {
  status?: number
  cause?: unknown

  constructor(message: string, status?: number, cause?: unknown) {
    super(message)
    this.status = status
    this.cause = cause
  }
}
