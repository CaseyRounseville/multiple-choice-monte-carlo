/**
 * A constructor for a score object, to represent the results of someone's
 * exam.
 *
 * Parameters:
 * numQuestions -- The total number of questions on the exam.
 * numCorrect -- The total number of questions correct.
 * numMonteCarloAttempts -- The number of times a situation was encountered
 * where two answer choices are left, and we must choose one.
 * numMonteCarloNonBails -- The number of times the randomly "predicted" answer
 * was not already crossed out.
 * numMonteCarloCorrect -- The number of monte carlo questions correct.
 */
export function Score(numQuestions, numCorrect, numMonteCarloAttempts,
		numMonteCarloNonBails, numMonteCarloCorrect,
		numMonteCarloNonBailsCorrect) {
	this.numQuestions = numQuestions;
	this.numCorrect = numCorrect;
	this.numMonteCarloAttempts = numMonteCarloAttempts;
	this.numMonteCarloNonBails = numMonteCarloNonBails;
	this.numMonteCarloCorrect = numMonteCarloCorrect;
	this.numMonteCarloNonBailsCorrect = numMonteCarloNonBailsCorrect;
}

/**
 * Return the number of questions that were on the exam.
 */
Score.prototype.getNumQuestions = function() {
	return this.numQuestions;
};

/**
 * Return the number of questions answered correctly.
 */
Score.prototype.getNumCorrect = function() {
	return this.numCorrect;
};

/**
 * Return the number of times the exam taker had the question down to two
 * answer choices left, and could not eliminate either of them.
 */
Score.prototype.getNumMonteCarloAttempts = function() {
	return this.numMonteCarloAttempts;
};

/**
 * Return the number of times the random "predicted" answer was not already
 * eliminated.
 */
Score.prototype.getNumMonteCarloNonBails = function() {
	return this.numMonteCarloNonBails;
};

/**
 * Return the number of questions correct that were in the monte carlo
 * situation, in which there were two answer choices left. Note that this
 * includes the cases where the "predicted" answer was already eliminated, and
 * the exam taker really was left with a 50/50 chance.
 */
Score.prototype.getNumMonteCarloCorrect = function() {
	return this.numMonteCarloCorrect;
};

/**
 * Return the number of non-bail monte carlo questions that were answered
 * correctly.
 */
Score.prototype.getNumMonteCarloNonBailsCorrect = function() {
	return this.numMonteCarloNonBailsCorrect;
};

/**
 * Return the percentage, between 0 and 1, of total answers correct. This is
 * the overall score on the exam.
 */
Score.prototype.getPercentCorrect = function() {
	return this.getNumCorrect() / this.getNumQuestions();
};

/**
 * Return the percentage, between 0 and 1, of monte carlo questions correct.
 * Note that this includes the cases in which the "predicted" answer was
 * already eliminated.
 */
Score.prototype.getPercentMonteCarloCorrect = function() {
	return this.getNumMonteCarloCorrect() / this.getNumMonteCarlo;
};

/**
 * Return the percentage, between 0 and 1, of monte carlo questions in which
 * the "predicted" answer was not already crossed out(so we could choose the
 * opposite of the "predicted" answer).
 */
Score.prototype.getPercentMonteCarloNonBail = function() {
	return this.getNumMonteCarloNonBails() / this.getNumMonteCarloAttempts();
};

/**
 * Return the percentage, between 0 and 1, of non-bail monte carlo questions
 * correct. Note that this does not include cases where the "predicted" answer
 * was already eliminated. This will be the main area of interest to see if
 * this method of guessing improves the test taker's odds to above 50/50.
 */
Score.prototype.getPercentMonteCarloNonBailCorrect = function() {
	return this.getNumMonteCarloNonBailsCorrect() /
			this.getNumMonteCarloNonBails();
};
