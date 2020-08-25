/**
 * Generate a random guess for each question in the exam(without reading the
 * questions, of course). Return the guesses as an array of integers, where
 * each integer is a choice of answer to the question of the same index in the
 * exam(the index in the array is the "question number").
 */
export function genRandomGuesses(exam) {
	const guesses = [];
	for (let guessNum = 0; guessNum < numQuestions; guessNum++) {
		// pick a random guess
		const guess = Math.floor(Math.random() * exam.getNumAnsPerQuestion());
		guesses.push(guess);
	}

	return guesses;
}

/**
 * Choose an incorrect answer to the given question. This is intended to be
 * used for purposes of simulating the "process of elimination", in which all
 * but two answer choices will be ruled out. Note that this function does not
 * actually cross out the answer on the bubble sheet, but instead it just
 * returns the index of the generated incorrect answer.
 */
export function genRandomIncorrectAnswer(exam, bubbleSheet, questNum) {
	// make sure there is still at least one answer left, to avoid an infinite
	// loop if there has been a mistake
	if (bubbleSheet.isAllEliminated(questNum)) {
		throw "ERROR: When attempting to generate a random incorrect answer " +
				"for process of elimination, there were no answer choices " +
				"remaining.";
	}

	// get the current exam question
	const currQuest = exam.getQuestion(questNum);

	// start by identifying the correct answer
	const correctAns = currQuest.getCorrectAnswer();
	const numChoices = currQuest.getNumAnswers();

	// keep picking a random answer choice until we get an answer that is not
	// the correct one, and has not already been eliminated
	let choice = correctAns;
	while (choice == correctAns || !bubbleSheet.getAnswer(questNum, choice)) {
		choice = Math.floor(Math.random() * numChoices);
	}

	return choice;
}
