function Entry(numAnswers) {
	this.answers = [];
	for (let ansNum = 0; ansNum < numAnswers; ansNum++) {
		// all answers start out as true, and to select an answer, just mark
		// all the others false
		this.answers.push(true);
	}

	// keep track if this entry has undergone a monte carlo attempt, and if it
	// is a monte carlo non-bail
	this.monteCarloAttempt = false;
	this.monteCarloNonBail = false;
}

Entry.prototype.getNumAnswers = function() {
	return this.answers.length;
};

Entry.prototype.selectAnswer = function(ansIndex) {
	// mark all answers as false
	for (let ansNum = 0; ansNum < this.answers.length; ansNum++) {
		this.answers[ansNum] = false;
	}

	// mark the selected answer as true
	this.answers[ansIndex] = true;
};

Entry.prototype.eliminateAnswer = function(ansIndex) {
	// mark the specified answer as false
	this.answers[ansIndex] = false;
};

Entry.prototype.getAnswer = function(ansIndex) {
	return this.answers[ansIndex];
};

Entry.prototype.getSelectedAnswer = function() {
	// find the index of the selected answer
	let numSelected = 0;
	let selectedIndex = 0;
	for (let ansIndex = 0; ansIndex < this.answers.length; ansIndex++) {
		if (this.answers[ansIndex]) {
			selectedIndex = ansIndex;
			numSelected++;
		}
	}

	// make sure exactly one answer was selected
	if (numSelected != 1) {
		throw "ERROR: Not exactly one answer selected, instead " + numSelected;
	}

	return selectedIndex;
};

Entry.prototype.isMonteCarloAttempt = function() {
	return this.monteCarloAttempt;
};

Entry.prototype.isMonteCarloNonBail = function() {
	return this.monteCarloNonBail;
};

// FIXME: put in functions for set monte carlo attempt and set monte carlo
// non-bail

export function BubbleSheet(numQuestions, ansPerQuestion) {
	this.entries = [];
	for (let questNum = 0; questNum < numQuestions; questNum++) {
		this.entries.push(new Entry(ansPerQuestion));
	}
}

/**
 * Bubble in an answer on the bubble sheet(which also crosses out all of the
 * other answers).
 */
BubbleSheet.prototype.selectAnswer = function(questNum, ansIndex) {
	this.entries[questNum].selectAnswer(ansIndex);
};

/**
 * Cross out an answer on the bubble sheet.
 */
BubbleSheet.prototype.eliminateAnswer = function(questNum, ansIndex) {
	this.entries[questNum].eliminateAnswer(ansIndex);
};

/**
 * Read whether or not the specified bubble in the entry on the bubble sheet is
 * filled in. Note that this function returns a boolean, and not the correct
 * answer to any question.
 */
BubbleSheet.prototype.getAnswer = function(questNum, ansIndex) {
	return this.entries[questNum].getAnswer(ansIndex);
};

/**
 * Return the selected answer of the specified question. This is which one is
 * bubbled in on the bubble sheet.
 */
BubbleSheet.prototype.getSelectedAnswer = function(questNum) {
	return this.entries[questNum].getSelectedAnswer();
};

BubbleSheet.prototype.isMonteCarloAttempt = function(questNum) {
	return this.entries[questNum].isMonteCarloAttempt();
};

BubbleSheet.prototype.isMonteCarloNonBail = function(questNum) {
	return this.entries[questNum].isMonteCarloNonBail();
};

/**
 * Return whether all answer choices have been eliminated. This is not supposed
 * to happen, and this condition should be treated as an error.
 */
BubbleSheet.prototype.isAllEliminated = function(questNum) {
	// get the entry from this bubble sheet and how many answer choices there
	// are
	const entry = this.entries[questNum];
	const numAns = entry.getNumAnswers();

	// see if at least one answer choice is still available
	for (let ansIndex = 0; ansIndex < numAns; ansIndex++) {
		const stillAvailable = entry.getAnswer(ansIndex);
		if (stillAvailable) {
			return false;
		}
	}

	// all answer choices have been eliminated
	return true;
};
