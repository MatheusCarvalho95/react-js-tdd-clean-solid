export enum HttpStatusCode {
  unathorized = 401,
  noContent = 204,
}

type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};

export default HttpResponse;
