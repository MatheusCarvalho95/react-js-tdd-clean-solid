import { Authentication } from "@/domain/usecases/authentication/authentication";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http/";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors/";
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly HttpClient: HttpClient<RemoteAuthentication.Model>,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.HttpClient.request({
      url: this.url,
      body: params,
      method: "post",
    });
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        return httpResponse.data;
    }
  }
}
export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
