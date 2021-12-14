function getOccurances() {
	return diceValues.reduce(
		(acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
		{}
	);
}

function getOnes() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 1) {
			sum += value;
		}
	});
	return sum;
}
function getTwos() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 2) {
			sum += value;
		}
	});
	return sum;
}
function getThrees() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 3) {
			sum += value;
		}
	});
	return sum;
}
function getFours() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 4) {
			sum += value;
		}
	});
	return sum;
}
function getFives() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 5) {
			sum += value;
		}
	});
	return sum;
}
function getSixes() {
	let sum = 0;
	diceValues.forEach((value) => {
		if (value === 6) {
			sum += value;
		}
	});
	return sum;
}
function getUpperTotal() {
	let upperTotal = 0;
	lowerScoreKeys.forEach((key) => {
		upperTotal += currentPlayer.scores[key].value;
	});
	return upperTotal;
}
function getBonus() {
	if (currentPlayer.upperTotal.value >= 63) {
		return 50;
	}
	return 0;
}
function getPair() {
	const foundPairSums = [];
	for (let i = 0; i < diceValues.length; i++) {
		for (let j = 0; j < diceValues.length; j++) {
			if (i !== j) {
				if (diceValues[i] === diceValues[j]) {
					foundPairSums.push(diceValues[i] + diceValues[j]);
				}
			}
		}
	}
	return foundPairSums.sort((a, b) => a - b)[foundPairSums.length - 1];
}
function getTwoPair() {
	const occurances = getOccurances();
	let numberOfPairs = 0;
	let sum = 0;
	for (const number in occurances) {
		if (occurances[number] === 2 || occurances[number] === 3) {
			numberOfPairs++;
			sum += parseInt(number) * 2;
		} else if (occurances[number] >= 4) {
			return parseInt(number) * 4;
		}
	}
	if (numberOfPairs === 2) {
		return sum;
	}
	return 0;
}
function getThreeOfAKind() {
	const occurances = getOccurances();
	for (const number in occurances) {
		if (occurances[number] >= 3) {
			return parseInt(number) * 3;
		}
	}
	return 0;
}
function getFourOfAKind() {
	const occurances = getOccurances();
	for (const number in occurances) {
		if (occurances[number] >= 4) {
			return parseInt(number) * 4;
		}
	}
	return 0;
}
function getSmallStraight() {
	const smallStraight = [1, 2, 3, 4, 5];
	for (let i = 0; i < diceValues.length; i++) {
		if (diceValues[i] !== smallStraight[i]) {
			return 0;
		}
	}
	return 15;
}
function getLargeStraight() {
	const largeStraight = [2, 3, 4, 5, 6];
	for (let i = 0; i < diceValues.length; i++) {
		if (diceValues[i] !== largeStraight[i]) {
			return 0;
		}
	}
	return 20;
}
function getFullHouse() {
	const occurances = getOccurances();
	for (const number in occurances) {
		if (occurances[number] === 3) {
			const threeOfAKindSum = parseInt(number) * 3;
			for (const number in occurances) {
				if (occurances[number] === 2) {
					return threeOfAKindSum + parseInt(number) * 2;
				}
			}
		} else if (occurances[number] === 5) {
			return parseInt(number) * 5;
		}
	}
	return 0;
}
function getChance() {
	let sum = 0;
	diceValues.forEach((value) => {
		sum += value;
	});
	return sum;
}
function getYatzy() {
	for (let i = 1; i < diceValues.length; i++) {
		if (diceValues[0] !== diceValues[i]) {
			return 0;
		}
	}
	return 50;
}
function getGrandTotal() {
	let grandTotal = 0;
	for (const score in currentPlayer.scores) {
		grandTotal += currentPlayer.scores[score].value;
	}
	return grandTotal + currentPlayer.bonus.value;
}
