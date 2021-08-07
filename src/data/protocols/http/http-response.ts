export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401
}

export interface HttpResponse {
  statusCode: HttpStatusCode,
  body?: any
}