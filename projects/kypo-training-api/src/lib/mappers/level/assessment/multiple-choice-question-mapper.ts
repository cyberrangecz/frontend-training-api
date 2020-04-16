import { MultipleChoiceQuestion } from 'kypo-training-model';
import { AbstractQuestionDTO } from '../../../dto/level/assessment/abstact-question-dto';
import { McqDTO } from '../../../dto/level/assessment/mcq-choice-dto';
import { MultipleChoiceQuestionAnswerDTO } from '../../../dto/level/assessment/multiple-choice-question-answer-dto';
import {
  MultipleChoiceQuestionCreateDTO,
  MultipleChoiceQuestionCreateDTOClass,
} from '../../../dto/level/assessment/multiple-choice-question-create-dto';

export class MultipleChoiceQuestionMapper {
  static fromDTO(dto): MultipleChoiceQuestion {
    const result = new MultipleChoiceQuestion(dto.text);
    const answers: number[] = [];
    const options: string[] = [];
    dto.choices.filter((choice) => choice.is_correct).forEach((correctChoice) => answers.push(correctChoice.order));
    result.correctAnswersIndices = answers;

    dto.choices.sort((a, b) => a.order - b.order).forEach((choice) => options.push(choice.text));
    result.options = options;
    return result;
  }

  static toAnswersDTO(question: MultipleChoiceQuestion): MultipleChoiceQuestionAnswerDTO {
    const result = new MultipleChoiceQuestionAnswerDTO();
    result.question_order = question.order;
    result.choices = question.usersAnswersIndices;
    return result;
  }

  static toCreateDTO(question: MultipleChoiceQuestion): MultipleChoiceQuestionCreateDTO {
    const questionDTO = new MultipleChoiceQuestionCreateDTOClass();
    questionDTO.question_type = AbstractQuestionDTO.QuestionTypeEnum.MCQ;
    let index = 0;
    const choices: McqDTO[] = [];
    question.options.forEach((option) => {
      const choice = new McqDTO();
      choice.text = option;
      choice.order = index;
      choice.is_correct = question.correctAnswersIndices.includes(index);
      choices.push(choice);
      index++;
    });
    questionDTO.choices = choices;
    return questionDTO;
  }
}
