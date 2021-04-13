import { HttpGetClientSpy } from "@/data/test";
import faker from "faker";
import { RemoteLoadSurveyResult } from "./load-survey-result";

describe("RemoteLoadSurveyResult", () => {
  test("should call http get client with correct url", async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
