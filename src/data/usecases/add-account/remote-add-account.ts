import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http/";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient<AccountModel>,
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.forbiden:
        throw new EmailInUseError();
      case HttpStatusCode.ok:
        return httpResponse.body;
    }
  }
}
