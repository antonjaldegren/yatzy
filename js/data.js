const headerParagraph = document.querySelector("header p");
const scoreRows = document.querySelectorAll(".score-row");
const nextRoundButton = document.querySelector(".next-round");
const rollDiceButton = document.querySelector(".roll-dice");
const diceImgs = document.querySelectorAll(".dice-container img");
const upperScoreKeys = ["ones", "twos", "threes", "fours", "fives", "sixes"];
const scoreKeys = [
	"ones",
	"twos",
	"threes",
	"fours",
	"fives",
	"sixes",
	"pair",
	"twoPair",
	"threeOfAKind",
	"fourOfAKind",
	"smallStraight",
	"largeStraight",
	"fullHouse",
	"chance",
	"yatzy",
];

let diceArray = [
	{ value: null, hold: false },
	{ value: null, hold: false },
	{ value: null, hold: false },
	{ value: null, hold: false },
	{ value: null, hold: false },
];

let roundsLeft = 30;
let rollsLeft = 3;
let diceValues = [];
let occurances = {};
let numbers = [];
let currentPlayer;
let chosenScoreKey = "";
