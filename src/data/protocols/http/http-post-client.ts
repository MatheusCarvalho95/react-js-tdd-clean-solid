export type HttpPostParams = {
  url: string;
};
export default interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}
