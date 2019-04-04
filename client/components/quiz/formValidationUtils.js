export function formValidation(formState) {
  const { question, questionAnswer, answer, hasCorrectAnswer, errorMessage, totalAttempt } = formState.question1;  
  let question1 = {
    question,
    questionAnswer,
    answer,
  };
  //test if input field has value
  if (answer.length === 0) {
    question1 = {
      hasCorrectAnswer: true,
      errorMessage: 'This field must have an answer',
      totalAttempt: totalAttempt + 1
    };
  } else if (question1.answer !== question1.questionAnswer ) {
    question1 = {
      hasCorrectAnswer: true,
      errorMessage: 'This field must have an answer',
      totalAttempt: totalAttempt + 1
    };
  }
}