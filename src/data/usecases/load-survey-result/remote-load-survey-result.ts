import { HttpClient, HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyResult } from "@/domain/usecases";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>,
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
    });
    const remoteSurveyResult = httpResponse.data;
    switch (httpResponse.statusCode) {
      default:
        if (remoteSurveyResult) {
          return Object.assign({}, remoteSurveyResult, {
            date: new Date(remoteSurveyResult.date),
          });
        }
        throw new UnexpectedError();

      case HttpStatusCode.forbiden:
        throw new AccessDeniedError();
      case HttpStatusCode.notFound:
        throw new UnexpectedError();
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
  };
}
