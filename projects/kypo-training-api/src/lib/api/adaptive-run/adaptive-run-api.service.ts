import { PaginatedResource, RequestedPagination, SentinelFilter } from '@sentinel/common';
import { Observable } from 'rxjs';
import {
  AccessedTrainingRun,
  AccessTrainingRunInfo,
  AnswerCheck,
  Phase,
  QuestionAnswer,
  TrainingRun,
} from '@muni-kypo-crp/training-model';

export abstract class AdaptiveRunApi {
  abstract getAll(
    pagination: RequestedPagination,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingRun>>;
  abstract get(id: number): Observable<TrainingRun>;
  abstract getAccessed(pagination: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun>>;
  abstract delete(trainingRunId: number, force?: boolean): Observable<any>;
  abstract deleteMultiple(trainingRunIds: number[], force?: boolean): Observable<any>;
  abstract access(token: string): Observable<AccessTrainingRunInfo>;
  abstract resume(trainingRunId: number): Observable<AccessTrainingRunInfo>;
  abstract nextPhase(trainingRunId: number): Observable<Phase>;
  abstract isCorrectAnswer(trainingRunId: number, answer: string): Observable<AnswerCheck>;
  abstract takeSolution(trainingRunId: number): Observable<string>;
  abstract evaluateQuestionnaire(trainingRunId: number, questionAnswers: QuestionAnswer[]): Observable<any>;
  abstract finish(trainingRunId: number): Observable<any>;
  abstract archive(trainingRunId: number): Observable<any>;
}
