import {
  Authentication,
  AuthenticationParams,
} from "@/domain/usecases/authentication/authentication";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http/";
import {} from "@/data/protocols/http/http-response";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors/";
import { AccountModel } from "@/domain/models/";
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient<AccountModel>,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        return httpResponse.body;
    }
  }
}
