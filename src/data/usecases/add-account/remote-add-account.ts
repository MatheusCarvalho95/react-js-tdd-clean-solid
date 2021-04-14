import { AddAccount } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http/";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly HttpClient: HttpClient<RemoteAddAccount.Model>,
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.HttpClient.request({
      url: this.url,
      body: params,
      method: "post",
    });
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.forbiden:
        throw new EmailInUseError();
      case HttpStatusCode.ok:
        return httpResponse.data;
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model;
}
