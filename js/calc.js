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
	upperScoreKeys.forEach((key) => {
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
	let numberOfPairs = 0;
	let twoPairSum = 0;
	numbers.forEach((number) => {
		if (occurances[number] === 2 || occurances[number] === 3) {
			numberOfPairs++;
			twoPairSum += parseInt(number) * 2;
		}
	});
	if (numberOfPairs === 2) {
		return twoPairSum;
	}
}
function getThreeOfAKind() {
	let sum = 0;
	numbers.forEach((number) => {
		if (occurances[number] >= 3) {
			sum = parseInt(number) * 3;
		}
	});
	return sum;
}
function getFourOfAKind() {
	let sum = 0;
	numbers.forEach((number) => {
		if (occurances[number] >= 4) {
			sum = parseInt(number) * 4;
		}
	});
	return sum;
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
	let sum = 0;
	numbers.forEach((number) => {
		if (occurances[number] === 3) {
			const threeOfAKindSum = parseInt(number) * 3;
			numbers.forEach((number) => {
				if (occurances[number] === 2) {
					sum = threeOfAKindSum + parseInt(number) * 2;
				}
			});
		}
	});
	return sum;
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
	scoreKeys.forEach((score) => {
		grandTotal += currentPlayer.scores[score].value;
	});
	return grandTotal + currentPlayer.bonus.value;
}
