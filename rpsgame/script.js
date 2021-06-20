

const winSound = new Audio("sounds/win.wav");
const lossSound = new Audio("sounds/loss.wav");
const tieSound = new Audio("sounds/tie.wav");


rpsGame = (yourChoice) => {
  console.log(yourChoice.id);
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randomToRpsInt());
  console.log(botChoice);
  results = decideWinner(humanChoice, botChoice); // [1,0],[0.5,0.5],[0,1]
  message = finalMessage(results); // {'message': "You Won", 'color':'green'} | You tied | , returns objects
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
};

randomToRpsInt = () => {
  return Math.floor(Math.random() * 3);
};

numberToChoice = (number) => {
  return ["rock", "paper", "scissors"][number];
};

decideWinner = (yourChoice, botChoice) => {
  let rpsDatabase = {
    rock: { rock: 0.5, paper: 0, scissors: 1 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { rock: 0, paper: 1, scissors: 0.5 },
  };
  let yourScore = rpsDatabase[yourChoice][botChoice];
  let botScore = rpsDatabase[botChoice][yourChoice];

  return [yourScore, botScore];
};

finalMessage = ([yourScore, botScore]) => {
  if (yourScore === 0) {
    lossSound.play();
    return { message: "You Lost", color: "red" };
    
  } else if (yourScore === 0.5) {
    tieSound.play();
    return { message: "You Tied", color: "yellow" };
  } else {
    winSound.play();
    return { message: "You Won", color: "Green" };    
  }
};

rpsFrontEnd = (humanChoiceImage, botChoiceImage, finalMessage) => {
  let imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //remove all images from div
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src ='" +
    imageDatabase[humanChoiceImage] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    ";font-size:60px;padding:30px;'>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src ='" +
    imageDatabase[botChoiceImage] +
    "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
};


resetProgram =()=>{
  document.getElementById("flex-box-rps-div").innerHTML=""; 
  document.getElementById("flex-box-rps-div").innerHTML+="<img id='rock' src='images/rock.jpg' ='' height='150' width='150' onclick='rpsGame(this)' />";
  document.getElementById("flex-box-rps-div").innerHTML+="<img id='paper'  src='images/paper.jpg'  alt=''  height='150'  width='150'  onclick='rpsGame(this)'/>";
  document.getElementById("flex-box-rps-div").innerHTML+=  "<img  id='scissors'  src='images/scissors.jpg'  alt=''  height='150'width='150'onclick='rpsGame(this)'/>";
};