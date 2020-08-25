import {
	genRandomGuesses,
	genRandomIncorrectAnswer
} from "../data/ThinkingCap";

export function ExamTaker(monteCarloFunc, randGuessFunc, bailFunc,
		procOfElimFunc) {
	// put in this particular exam taker's personal exam-taking style and
	// strategies
	this.monteCarloFunc = monteCarloFunc;
	this.randGuessFunc = randGuessFunc;
	this.bailFunc = bailFunc;
	this.procOfElimFunc = procOfElimFunc;
}

/**
 * The exam taker takes the exam by filling out the provided bubble sheet.
 */
ExamTaker.prototype.takeExam = function(exam, bubbleSheet) {
	const ansPerQuest = exam.getNumAnsPerQuestion();
	for (let questNum = 0; questNum < exam.getNumQuestions(); questNum++) {
		const currQuest = exam.getQuestion(questNum);

		// see if this is a question in which we should simulate the monte
		// carlo situation
		if (this.monteCarloFunc(questNum)) {
			// elimate all answer choices except for the remaining two
			const numAnsToElim = ansPerQuest - 2;
			for (let elimCount = 0; elimCount < numAnsToElim; elimCount++) {
				const elimAnsIndex = genRandomIncorrectAnswer(exam,
						bubbleSheet, questNum);
				bubbleSheet.eliminateAnswer(questNum, elimAnsIndex);
			}

			// check if the "predicted" answer is one of the remaining answer
			// choices
			const randGuess = this.randGuessFunc(questNum);
			if (bubbleSheet.getAnswer(randGuess)) {
				// choose the opposite of the random guess
				for (let ansIndex = 0; ansIndex < ansPerQuest; ansIndex++) {
					if (bubbleSheet.getAnswer(questNum, ansIndex) &&
							ansIndex != randGuess) {
						bubbleSheet.selectAnswer(questNum, ansIndex);
						break;
					}
				}
			} else {
				// FIXME
			}
		} else {
			// FIXME
		}
	}
};
