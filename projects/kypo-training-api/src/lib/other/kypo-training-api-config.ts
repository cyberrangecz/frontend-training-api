export class KypoTrainingApiConfig {
  trainingBasePath: string;
  adaptiveBasePath: string;

  constructor(trainingBasePath: string, adaptiveBasePath: string) {
    this.trainingBasePath = trainingBasePath;
    this.adaptiveBasePath = adaptiveBasePath;
  }
}
