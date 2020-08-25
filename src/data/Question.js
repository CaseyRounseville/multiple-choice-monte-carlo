/**
 * Create a question object, which stores the number of answer choices, and
 * which one is the correct answer choice.
 */
export function Question(numAnswers, correctAnswer) {
	this.numAnswers = numAnswers;
	this.correctAnswer = correctAnswer;
}

/**
 * Return the number of answer choices in this question.
 */
Question.prototype.getNumAnswers = function() {
	return this.numAnswers;
};

/**
 * Return the correct answer for this question.
 */
Question.prototype.getCorrectAnswer = function() {
	return this.correctAnswer;
};
