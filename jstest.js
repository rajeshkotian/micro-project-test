function openRules() {
  var rulebook = document.getElementsByClassName("rulepage");
  rulebook[0].style.visibility = "visible";
}
function closeButton() {
  var closebtn = document.getElementsByClassName("rulepage");
  closebtn[0].style.visibility = "hidden";
}

let userScore = 0;
let computerScore = 0;

userScore = localStorage.getItem("userScore")
  ? parseInt(localStorage.getItem("userScore"))
  : 0;
computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;

document.addEventListener("DOMContentLoaded", () => {
  updateScores("", userScore, computerScore);
});

// Define variables to keep track of scores

// Function to pick user's hand and start the game
function pickUserHand(userChoice) {
  // Generate computer's choice randomly
  const computerChoice = generateComputerChoice();

  // Update the images to show user and computer choices
  updateChoices(userChoice, computerChoice);

  // Determine the winner and update scores
  const result = determineWinner(userChoice, computerChoice);
  updateScores(result);
}

// Function to generate computer's choice randomly
function generateComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to update the images to show user and computer choices
function updateChoices(userChoice, computerChoice) {
  const userChoiceImage = document.getElementById(userChoice + "u");
  const computerChoiceImage = document.getElementById(computerChoice + "p");

  var handchoice = document.getElementsByClassName("handchoices");
  handchoice[0].style.display = "none";
  // Hide all images first
  document
    .querySelectorAll(".scissors1 img")
    .forEach((img) => (img.style.display = "none"));
  document
    .querySelectorAll(".paper1 img")
    .forEach((img) => (img.style.display = "none"));

  // Display chosen images
  var youwin = document.getElementsByClassName("youwin");
  youwin[0].style.display = "flex";

  userChoiceImage.style.display = "block";
  computerChoiceImage.style.display = "block";
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "draw";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    return "user";
  } else {
    return "computer";
  }
}

// Function to update scores ,text and button
function updateScores(result, userScoreElement, computerScoreElement) {
  userScoreElement = document.querySelector(".userscore .scrnumber");
  computerScoreElement = document.querySelector(".sysscore .scrnumber");
  const textElement = document.querySelector(".centertext .txt1");
  const textElements = document.querySelector(".centertext .txt2");
  const buttonElement = document.querySelector(".centertext .playagain");
  const next = document.getElementsByClassName("nxt");

  if (result === "user") {
    userScore++;
    textElement.textContent = "YOU WON!";
    textElements.textContent = "AGAINST PC";
    buttonElement.textContent = "PLAY AGAIN";
    next[0].style.display = "block";
    const userChoiceButtons = document.querySelectorAll('.youwin .scissors1 img');
    userChoiceButtons.forEach(button => button.classList.add('pulse'));
 
  } else if (result === "computer") {
    computerScore++;
    textElement.textContent = "YOU LOST!";
    textElements.textContent = "AGAINST PC";
    buttonElement.textContent = "PLAY AGAIN";
    const userChoiceButtons = document.querySelectorAll('.youwin .paper1 img');
    userChoiceButtons.forEach(button => button.classList.add('pulse'));
   
  } else {
    textElement.textContent = "TIEUP";
    textElements.textContent = "";
    buttonElement.textContent = "REPLAY";
  }

  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

// Function to reload the page

function playagain() {
  location.reload();
}

