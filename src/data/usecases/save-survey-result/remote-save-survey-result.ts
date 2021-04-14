import { RemoteSurveyResultModel } from "@/data/models";
import { HttpClient, HttpStatusCode } from "@/data/protocols";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { SaveSurveyResult } from "@/domain/usecases/save-survey-result";

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>,
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: params,
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

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}
