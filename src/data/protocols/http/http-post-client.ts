export type HttpPostParams = {
  url: string;
  body?: object;
};
export default interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}
