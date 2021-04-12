import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { UnexpectedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>,
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.noContent:
        return [];
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model;
}
