import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { UnexpectedError } from "@/domain/errors";

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async loadAll(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        break;
    }
  }
}
