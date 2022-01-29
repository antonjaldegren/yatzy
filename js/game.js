function rollDice() {
	rollDiceButton.setAttribute("disabled", true);
	if (rollsLeft === 3)
		currentPlayer.playerCell.classList.remove("before-roll");
	resetChosenScore();
	for (let i = 0; i < diceArray.length; i++) {
		if (!diceArray[i].hold) {
			diceArray[i].value = Math.floor(Math.random() * 6) + 1;
			const diceElement = document.querySelector(`.dice${i}`);
			diceElement.setAttribute(
				"src",
				`./img/dice${diceArray[i].value}.svg`
			);
			diceElement.classList.remove("rotate");
			void diceElement.offsetWidth;
			diceElement.classList.add("rotate");
		}
	}
	diceValues = diceArray.map((dice) => dice.value).sort((a, b) => a - b);
	occurances = getOccurances();
	numbers = Object.keys(occurances);
	rollsLeft--;
	rollsLeftSpan.textContent = rollsLeft;
	if (rollsLeft > 0) {
		setTimeout(() => {
			rollDiceButton.removeAttribute("disabled");
		}, 700);
	} else {
		diceImgs.forEach((diceImg) => diceImg.classList.add("in-active"));
		resetDiceHold();
	}
}

function resetDice() {
	resetDiceHold();
	rollDiceButton.removeAttribute("disabled");
	diceImgs.forEach((diceImg) => diceImg.classList.remove("in-active"));
	rollsLeft = 3;
	rollsLeftSpan.textContent = rollsLeft;
}

function resetDiceHold() {
	diceArray.forEach((dice) => (dice.hold = false));
	diceImgs.forEach((diceImg) => {
		diceImg.classList.replace("hold", "un-hold");
		// diceImg.classList.remove("hold");
		// diceImg.classList.add("un-hold");
	});
}

function activatePossibleChoices() {
	for (const score in currentPlayer.scores) {
		const element = currentPlayer.scores[score].element;
		const currentValue = currentPlayer.scores[score].getScore();
		if (currentPlayer.scores[score].value === null) {
			element.classList.add("active");
			if (currentValue > 0) {
				element.classList.remove("no-points");
				element.textContent = currentValue;
			} else {
				element.classList.add("no-points");
				element.textContent = "—";
			}
		}
	}
}

function resetCurrentPlayerColumn() {
	document.querySelectorAll(`.${currentPlayer.name}`).forEach((row) => {
		row.classList.remove("active", "no-points", "chosen");
	});
	for (const score in currentPlayer.scores) {
		if (currentPlayer.scores[score].value === null) {
			currentPlayer.scores[score].element.textContent = "";
		}
	}
}

function toggleCurrentPlayer() {
	currentPlayer.playerCell.classList.remove("current-player", "before-roll");
	if (currentPlayer === player1) {
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}
	currentPlayer.playerCell.classList.add("current-player", "before-roll");
}

function resetChosenScore() {
	document
		.querySelectorAll(`.${currentPlayer.name}`)
		.forEach((element) => element.classList.remove("chosen"));
	doneButton.setAttribute("disabled", true);
}

function getChosenScoreKey(element) {
	const classes = element.classList.value;
	return classes.split(" ")[1];
}

function setScoreValues() {
	//Chosen score
	currentPlayer.scores[chosenScoreKey].value =
		currentPlayer.scores[chosenScoreKey].getScore();
	if (currentPlayer.scores[chosenScoreKey].value > 0) {
		currentPlayer.scores[chosenScoreKey].element.textContent =
			currentPlayer.scores[chosenScoreKey].value;
	} else {
		currentPlayer.scores[chosenScoreKey].element.textContent = "—";
	}
	//Upper total
	if (currentPlayer.upperTotal.getScore() > 0) {
		currentPlayer.upperTotal.value = currentPlayer.upperTotal.getScore();
		currentPlayer.upperTotal.element.textContent =
			currentPlayer.upperTotal.value;
	}
	//Bonus
	if (currentPlayer.bonus.getScore() === 50) {
		currentPlayer.bonus.value = currentPlayer.bonus.getScore();
		currentPlayer.bonus.element.textContent = currentPlayer.bonus.value;
	}
	//Grand total
	if (currentPlayer.grandTotal.getScore() > 0) {
		currentPlayer.grandTotal.value = currentPlayer.grandTotal.getScore();
		currentPlayer.grandTotal.element.textContent =
			currentPlayer.grandTotal.value;
	}
}
