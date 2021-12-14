let currentPlayer = player1;
const headerParagraph = document.querySelector("header p");
const scoreRows = document.querySelectorAll(".score-row");
const nextRoundButton = document.querySelector("#nextRound");
const rollDiceButton = document.querySelector("#rollDice");
const diceImgs = document.querySelectorAll(".dice-container img");
const lowerScoreKeys = ["ones", "twos", "threes", "fours", "fives", "sixes"];
const allScoreKeys = [];

let roundsLeft = 30;
let rollsLeft = 3;
let diceArray = [
	{ value: 0, hold: false },
	{ value: 0, hold: false },
	{ value: 0, hold: false },
	{ value: 0, hold: false },
	{ value: 0, hold: false },
];
let diceValues;

function rollDice() {
	resetChosenScore();
	for (let i = 0; i < diceArray.length; i++) {
		if (!diceArray[i].hold) {
			diceArray[i].value = Math.floor(Math.random() * 6) + 1;
			const diceElement = document.querySelector(`#dice${i}`);
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
	rollsLeft--;
	if (rollsLeft === 0) {
		rollDiceButton.setAttribute("disabled", true);
		diceImgs.forEach((diceImg) => diceImg.classList.add("in-active"));
		resetDiceHold();
	}
}

function resetDice() {
	resetDiceHold();
	rollDiceButton.removeAttribute("disabled");
	diceImgs.forEach((diceImg) => diceImg.classList.remove("in-active"));
	rollsLeft = 3;
}

function resetDiceHold() {
	diceArray.forEach((dice) => (dice.hold = false));
	diceImgs.forEach((diceImg) => {
		diceImg.classList.remove("hold");
		diceImg.classList.add("un-hold");
	});
}

function activatePossibleChoices() {
	for (const score in currentPlayer.scores) {
		const element = document.querySelector(
			`.${score}.${currentPlayer.name}`
		);
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
	if (currentPlayer === player1) {
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}
}

function resetChosenScore() {
	document
		.querySelectorAll(`.${currentPlayer.name}`)
		.forEach((element) => element.classList.remove("chosen"));
	nextRoundButton.setAttribute("disabled", true);
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

//Event listeners
let chosenScoreKey = "";

scoreRows.forEach((row) =>
	row.addEventListener("click", (event) => {
		chosenScoreKey = getChosenScoreKey(event.target);
		if (!event.target.classList.contains("chosen")) {
			resetChosenScore();
			event.target.classList.add("chosen");
			nextRoundButton.removeAttribute("disabled");
		} else {
			resetChosenScore();
		}
	})
);

nextRoundButton.addEventListener("click", () => {
	setScoreValues();
	nextRoundButton.setAttribute("disabled", true);
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
	rollDice();
	activatePossibleChoices();
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
			const diceIndex = parseInt(event.target.id.substring(4));
			diceArray[diceIndex].hold = !diceArray[diceIndex].hold;
		}
	});
});
