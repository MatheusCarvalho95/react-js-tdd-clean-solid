export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnswers[];
  date: Date;
  didAnser: boolean;
};

export type SurveyAnswers = {
  image?: string;
  answer: string;
};
