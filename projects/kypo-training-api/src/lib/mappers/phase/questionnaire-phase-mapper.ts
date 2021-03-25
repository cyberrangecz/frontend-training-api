import { QuestionnairePhaseDTO } from '../../dto/phase/questionnaire-phase/questionnaire-phase-dto';
import {
  AbstractPhaseTypeEnum,
  AdaptiveQuestion,
  Choice,
  PhaseRelation,
  QuestionnairePhase,
  QuestionnaireTypeEnum,
  QuestionTypeEnum,
} from '@muni-kypo-crp/training-model';
import { PhaseRelationDTO } from '../../dto/phase/questionnaire-phase/phase-relation-dto';
import { QuestionDTO } from '../../dto/phase/questionnaire-phase/question-dto';
import { ChoiceDTO } from '../../dto/phase/questionnaire-phase/choice-dto';
import { QuestionnairePhaseUpdateDTO } from '../../dto/phase/questionnaire-phase/questionnaire-phase-update-dto';

export class QuestionnairePhaseMapper {
  static fromDTO(dto: QuestionnairePhaseDTO): QuestionnairePhase {
    const result = new QuestionnairePhase();
    result.type = AbstractPhaseTypeEnum.Questionnaire;
    switch (dto.questionnaire_type) {
      case 'ADAPTIVE': {
        result.questionnaireType = QuestionnaireTypeEnum.Adaptive;
        break;
      }
      case 'GENERAL': {
        result.questionnaireType = QuestionnaireTypeEnum.General;
        break;
      }
    }
    if (dto.questions === undefined || dto.questions === null) {
      result.questions = [];
    } else {
      result.questions = this.mapQuestionsFromDTO(dto.questions).sort((a, b) => a.order - b.order);
    }
    if (dto.phase_relations === undefined || dto.phase_relations === null) {
      result.phaseRelations = [];
    } else {
      result.phaseRelations = this.mapPhasesRelationsFromDTO(dto.phase_relations).sort((a, b) => a.order - b.order);
    }
    return result;
  }

  private static mapPhasesRelationsFromDTO(relations: PhaseRelationDTO[]): PhaseRelation[] {
    const result = [];
    relations.forEach((relationDto) => {
      const relation = new PhaseRelation();
      relation.id = relationDto.id;
      relation.order = relationDto.order;
      relation.successRate = relationDto.success_rate;
      relation.phaseId = relationDto.phase_id;
      relation.questionIds = relationDto.question_ids;
      result.push(relation);
    });
    return result;
  }

  private static mapQuestionsFromDTO(questions: QuestionDTO[]): AdaptiveQuestion[] {
    const result = [];
    questions.forEach((questionDTO) => {
      const question = new AdaptiveQuestion();
      question.id = questionDTO.id;
      question.order = questionDTO.order;
      question.text = questionDTO.text;
      question.choices = this.mapChoicesFromDTO(questionDTO.choices).sort((a, b) => a.order - b.order);
      switch (questionDTO.question_type) {
        case 'FFQ': {
          question.questionType = QuestionTypeEnum.FFQ;
          break;
        }
        case 'MCQ': {
          question.questionType = QuestionTypeEnum.MCQ;
          break;
        }
        case 'RFQ': {
          question.questionType = QuestionTypeEnum.RFQ;
          break;
        }
      }
      result.push(question);
    });
    return result;
  }

  private static mapChoicesFromDTO(choices: ChoiceDTO[]): Choice[] {
    const result = [];
    choices.forEach((choiceDto) => {
      const choice = new Choice();
      choice.id = choiceDto.id;
      choice.order = choiceDto.order;
      choice.text = choiceDto.text;
      choice.correct = choiceDto.correct;
      result.push(choice);
    });
    return result;
  }

  static mapQuestionnaireToUpdateDTO(questionnaire: QuestionnairePhase): QuestionnairePhaseUpdateDTO {
    const questionnaireDto = new QuestionnairePhaseUpdateDTO();
    questionnaireDto.title = questionnaire.title;
    questionnaireDto.questions = this.mapQuestionsToDTO(questionnaire.questions);
    questionnaireDto.phase_relations = this.mapPhaseRelationsToDTO(questionnaire.phaseRelations);
    return questionnaireDto;
  }

  private static mapPhaseRelationsToDTO(relations: PhaseRelation[]): PhaseRelationDTO[] {
    const result = [];
    relations.forEach((relation) => {
      const dto = new PhaseRelationDTO();
      dto.id = relation.id;
      dto.order = relation.order;
      dto.phase_id = relation.phaseId;
      dto.success_rate = relation.successRate;
      dto.question_ids = relation.questionIds;
      result.push(dto);
    });
    return result;
  }

  private static mapQuestionsToDTO(questions: AdaptiveQuestion[]): QuestionDTO[] {
    const result = [];
    questions.forEach((question) => {
      const dto = new QuestionDTO();
      dto.id = question.id;
      dto.order = question.order;
      dto.text = question.text;
      dto.choices = this.mapChoicesToDTO(question.choices, question.questionType);
      switch (question.questionType) {
        case QuestionTypeEnum.FFQ: {
          dto.question_type = QuestionDTO.QuestionTypeEnum.FFQ;
          break;
        }
        case QuestionTypeEnum.MCQ: {
          dto.question_type = QuestionDTO.QuestionTypeEnum.MCQ;
          break;
        }
        case QuestionTypeEnum.RFQ: {
          dto.question_type = QuestionDTO.QuestionTypeEnum.RFQ;
          break;
        }
      }
      result.push(dto);
    });
    return result;
  }

  private static mapChoicesToDTO(choices: Choice[], questionType: QuestionTypeEnum): ChoiceDTO[] {
    const result = [];
    choices.forEach((choice) => {
      const dto = new ChoiceDTO();
      dto.id = choice.id;
      dto.order = choice.order;
      dto.text = choice.text;
      if (questionType === QuestionTypeEnum.FFQ) {
        dto.correct = true;
      } else {
        dto.correct = choice.correct;
      }
      result.push(dto);
    });
    return result;
  }
}
