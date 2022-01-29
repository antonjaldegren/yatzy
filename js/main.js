scoreRows.forEach((row) =>
	row.addEventListener("click", (event) => {
		chosenScoreKey = getChosenScoreKey(event.target);
		if (!event.target.classList.contains("chosen")) {
			resetChosenScore();
			event.target.classList.add("chosen");
			doneButton.removeAttribute("disabled");
		} else {
			resetChosenScore();
		}
	})
);

doneButton.addEventListener("click", () => {
	setScoreValues();
	doneButton.setAttribute("disabled", true);
	roundsLeft--;
	resetCurrentPlayerColumn();
	resetDice();
	if (roundsLeft === 0) {
		rollDiceButton.setAttribute("disabled", true);
		headerParagraph.classList.remove("hide");
		if (player1.grandTotal.value > player2.grandTotal.value) {
			const player1Name =
				document.querySelector(".player1.name").textContent;
			headerParagraph.prepend(`${player1Name} won - `);
		} else if (player2.grandTotal.value > player1.grandTotal.value) {
			const player2Name =
				document.querySelector(".player2.name").textContent;
			headerParagraph.prepend(`${player2Name} won - `);
		} else {
			headerParagraph.prepend("It's a tie - ");
		}
		return;
	}
	toggleCurrentPlayer();
});

rollDiceButton.addEventListener("click", () => {
	rollDice();
	activatePossibleChoices();
});

diceImgs.forEach((diceImg) => {
	diceImg.addEventListener("click", (event) => {
		if (rollsLeft < 3 && rollsLeft > 0) {
			event.target.classList.toggle("hold");
			event.target.classList.toggle("un-hold");
			const diceIndex = parseInt(
				event.target.classList.value.split(" ")[0][4]
			);
			diceArray[diceIndex].hold = !diceArray[diceIndex].hold;
		}
		let numberOfHeldDice = 0;
		diceArray.forEach((dice) => {
			if (dice.hold === true) {
				numberOfHeldDice++;
			}
		});
		if (numberOfHeldDice === 5) {
			rollDiceButton.setAttribute("disabled", true);
		} else {
			rollDiceButton.removeAttribute("disabled");
		}
	});
});

currentPlayer = player1;
