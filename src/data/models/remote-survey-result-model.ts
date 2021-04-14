export type RemoteSurveyResultModel = {
  question: string;
  date: string;
  answers: RemoteSurveyResultAnswer[];
};

export type RemoteSurveyResultAnswer = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};
