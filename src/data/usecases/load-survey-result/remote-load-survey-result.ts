import { HttpGetClient, HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { LoadSurveyResult } from "@/domain/usecases";

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>,
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
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
