import { AuthenticationParams } from "@/domain/usecases/authentication";
import HttpPostClient from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import InvalidCredentialsError from "@/domain/errors/invalid-credentials-error";
import UnexpectedError from "@/domain/errors/unexpected-error";
import AccountModel from "@/domain/models/account-model";
export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        break;
    }
  }
}
