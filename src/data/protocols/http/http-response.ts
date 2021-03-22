export enum HttpStatusCode {
  unathorized = 401,
  noContent = 204,
  badRequest = 400,
  ok = 200,
  notFound = 404,
  serverError = 500,
}

type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export default HttpResponse;
