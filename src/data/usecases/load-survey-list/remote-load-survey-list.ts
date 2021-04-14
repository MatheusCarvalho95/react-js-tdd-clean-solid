import { HttpClient, HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Model[]>,
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });

    const remoteSurveys = httpResponse.data || [];
    switch (httpResponse.statusCode) {
      default:
        if (remoteSurveys) {
          return remoteSurveys.map((item) =>
            Object.assign(item, { date: new Date(item.date) }),
          );
        }
        throw new UnexpectedError();
      case HttpStatusCode.noContent:
        return [];
      case HttpStatusCode.forbiden:
        throw new AccessDeniedError();
      case HttpStatusCode.notFound:
        throw new UnexpectedError();
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
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
