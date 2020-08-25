import { Score } from "../data/Score";

export function ExamGrader(exam, bubbleSheet) {
	this.exam = exam;
	this.bubbleSheet = bubbleSheet;
}

/**
 * Returns a score object representing the results from grading the exam.
 */
ExamGrader.prototype.gradeExam = function() {
	// initialize all the stats for the score object
	const numQuestions = this.exam.getNumQuestions();
	let numCorrect = 0;
	let numMonteCarloAttempts = 0;
	let numMonteCarloNonBails = 0;
	let numMonteCarloCorrect = 0;
	let numMonteCarloNonBailsCorrect = 0;

	// grade each question individually, updating the stats as necessary
	for (let questNum = 0; questNum < numQuestions; questNum++) {
		const currQuest = this.exam.getQuestion(questNum);
		const correctAns = currQuest.getCorrectAnswer();
		const selectedAns = this.bubbleSheet.getSelectedAnswer(questNum);
		const monteCarloAttempt =
				this.bubbleSheet.isMonteCarloAttempt(questNum);
		const monteCarloNonBail =
				this.bubbleSheet.isMonteCarloNonBail(questNum);

		// see if this was a monte carlo attempt
		if (monteCarloAttempt) {
			numMonteCarloAttempts++;
		}

		// see if this was a monte carlo non-bail;
		// note that this should only be the case if it was a monte carlo
		// attempt in the first place
		if (monteCarloNonBail) {
			numMonteCarloNonBails++;
		}

		// see if the answer is correct
		if (selectedAns == correctAns) {
			numCorrect++;

			// update the number of monte carlo attempts correct, if necessary
			if (monteCarloAttempt) {
				numMonteCarloCorrect++;
			}

			// update the number of monte carlo non-bails correct, if necessary
			if (monteCarloNonBail) {
				numMonteCarloNonBailsCorrect++;
			}
		}
	}

	return new Score(numQuestions, numCorrect, numMonteCarloAttempts,
			numMonteCarloNonBails, numMonteCarloCorrect,
			numMonteCarloNonBailsCorrect);
};
