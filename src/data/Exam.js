import { Question } from "./Question";

/**
 * Create an exam object.
 */
export function Exam(numQuestions, ansPerQuestion) {
	// generate the questions
	this.questions = [];
	for (let currQuestNum = 0; currQuestNum < numQuestions; currQuestNum++) {
		// generate a random answer
		const correctAnswer = Math.floor(Math.random() * ansPerQuestion);
		const question = new Question(ansPerQuestion, correctAnswer);
	}
}

/**
 * Return how many questions are in the exam.
 */
Exam.prototype.getNumQuestions = function() {
	return this.questions.length;
};

/**
 * Return how many answers are there per question.
 */
Exam.prototype.getNumAnsPerQuestion = function() {
	return this.questions[0].getNumAnswers();
};

Exam.prototype.getQuestion = function(questNum) {
	return this.questions[questNum];
};
