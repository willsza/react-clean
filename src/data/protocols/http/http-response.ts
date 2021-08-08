export enum HttpStatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode,
  body?: T
}