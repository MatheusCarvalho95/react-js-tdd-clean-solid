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
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      default:
        throw new UnexpectedError();
      case HttpStatusCode.ok:
        return remoteSurveys.map((item) =>
          Object.assign(item, { date: new Date(item.date) }),
        );
      case HttpStatusCode.noContent:
        return [];
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnser: boolean;
  };
}
