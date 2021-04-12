export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>;
}

export type SurveyAnswers = {
  image?: string;
  answer: string;
};

export namespace LoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    answers: SurveyAnswers[];
    date: Date;
    didAnser: boolean;
  };
}
