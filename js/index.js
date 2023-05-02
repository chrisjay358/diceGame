const playerOneEL = document.querySelector(".player--one");
const playerTwoEL = document.querySelector(".player--two");
const totalScoreOne = document.querySelector(".total__one");
const totalScoreTwo = document.querySelector(".total__two");
const randomNumber = {
  num1: "",
  num2: "",
};
const person = {
  name1: "",
  name2: "",
};

function onCLick(e) {
  if (e.target.classList.contains("btn--one")) {
    getRandomNumber("one");
    diceRoll("one");
    disableBtnTillTurn("one");
  } else if (e.target.classList.contains("btn--two")) {
    getRandomNumber("two");
    diceRoll("two");
    disableBtnTillTurn("two");
  } else if (e.target.textContent === "Play Again") {
    location.reload();
  } else {
    getPlayerName();
  }
}

function disableBtnTillTurn(name) {
  const btnOneEL = document.querySelector(".btn--one");
  const btnTwoEL = document.querySelector(".btn--two");

  if (name === "one") {
    if (!btnOneEL.disabled) {
      btnOneEL.disabled = true;
      btnOneEL.textContent = `${person.name2}'s turn`;
      btnOneEL.style.color = "orange";
      btnTwoEL.disabled = false;
      btnTwoEL.textContent = "Your turn";
      btnTwoEL.style.color = "#fff";
    } else if (btnOneEL.disabled && btnTwoEL.textContent !== "Game over") {
      console.log("love");
      btnTwoEL.disabled = false;
      btnTwoEL.style.color = "#fff";
      btnTwoEL.textContent = `Your turn`;
    }
  } else {
    if (!btnTwoEL.disabled) {
      btnTwoEL.disabled = true;
      btnTwoEL.textContent = `${person.name1}'s turn`;
      btnTwoEL.style.color = "orange";
      btnOneEL.disabled = false;
      btnOneEL.textContent = "Your turn";
      btnOneEL.style.color = "#fff";
    } else if (btnTwoEL.disabled && btnOneEL.textContent !== "Game over") {
      console.log("love");
      btnOneEL.disabled = false;
      btnOneEL.style.color = "#fff";
      btnOneEL.textContent = `Your turn`;
    }
  }
}

function getPlayerName() {
  const player1 = prompt("Please enter your name");
  if (player1 === "" || player1 === null) {
    alert("Are you okay or are you whining us?");
    return;
  }

  const player2 = prompt("Please enter your name");
  if (player2 === "" || player2 === null) {
    alert("Are you okay or are you whining us?");
    return;
  }

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (btn.classList.contains("btn--play")) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  playerOneEL.textContent = player1.replace(
    player1[0],
    player1[0].toUpperCase()
  );
  person.name1 = playerOneEL.textContent;
  playerTwoEL.textContent = player2.replace(
    player2[0],
    player2[0].toUpperCase()
  );
  person.name2 = playerTwoEL.textContent;

  createScoreBoard(playerOneEL, playerTwoEL);
}

function createScoreBoard(player1, player2) {
  const article = document.createElement("article");
  article.classList.add("player__stats");
  const table = document.createElement("table");
  const thead = createTableHead(player1, player2);
  const tbody = createTableBody();
  const tfoot = createTableFoot();
  article.appendChild(table);
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(tfoot);
  document.querySelector(".player__content-box").appendChild(article);
}

function createTableHead(name1, name2) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  th1.appendChild(document.createTextNode(name1.textContent));
  th2.appendChild(document.createTextNode(name2.textContent));
  thead.appendChild(tr);
  tr.appendChild(th1);
  tr.appendChild(th2);

  return thead;
}

function createTableBody() {
  const tbody = document.createElement("tbody");

  for (let i = 1; i <= 6; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.appendChild(document.createTextNode("-"));
    td2.appendChild(document.createTextNode("-"));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }

  return tbody;
}

function createTableFoot() {
  const tfoot = document.createElement("tfoot");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  th1.appendChild(document.createTextNode("-"));
  th2.appendChild(document.createTextNode("-"));
  tr.appendChild(th1);
  tr.appendChild(th2);
  tfoot.appendChild(tr);

  return tfoot;
}

function getScore() {
  const arrTr = createTrArr("tbody");
  const result1 = arrTr
    .map((item) => item.childNodes[0])
    .find((item) => item.textContent === "-");
  const result2 = arrTr
    .map((item) => item.childNodes[1])
    .find((item) => item.textContent === "-");

  return [result1, result2];
}

function sumScore() {
  const arrTr = createTrArr("tbody");
  const result1 = arrTr
    .map((item) => +item.childNodes[0].textContent)
    .filter((item) => !isNaN(item))
    .reduce((acc, item) => acc + item, 0);
  const result2 = arrTr
    .map((item) => +item.childNodes[1].textContent)
    .filter((item) => !isNaN(item))
    .reduce((acc, item) => acc + item, 0);

  return [result1, result2];
}

function updateTotalScore() {
  const getTotalScore = sumScore();
  const arrTr = createTrArr("tfoot");
  const result1 = arrTr.map(
    (item) => (item.childNodes[0].textContent = getTotalScore[0])
  );
  const result2 = arrTr.map(
    (item) => (item.childNodes[1].textContent = getTotalScore[1])
  );
}

function updateScoreBoard(num) {
  const getPlayerScore = getScore();
  const result1 = getPlayerScore[0];
  const result2 = getPlayerScore[1];

  if (num === "one") {
    result1.textContent = randomNumber.num1;
  } else {
    result2.textContent = randomNumber.num2;
  }
}

function diceRoll(num) {
  const img = document.querySelector(`.dice__img--${num}`);
  console.log(randomNumber);

  if (num === "one") {
    img.src = `../images/dice${randomNumber.num1}.png`;
    updateScoreBoard(num);
    sumScore();
    updateTotalScore();
    checkScore("one");
  } else {
    img.src = `../images/dice${randomNumber.num2}.png`;
    updateScoreBoard();
    sumScore();
    updateTotalScore();
    checkScore("two");
  }
}

function getRandomNumber(num) {
  if (num === "one") {
    const ranNum1 = Math.floor(Math.random() * 6 + 1);
    randomNumber.num1 = ranNum1;
  } else {
    const ranNum2 = Math.floor(Math.random() * 6 + 1);
    randomNumber.num2 = ranNum2;
  }
}

function checkScore(btn) {
  const arrTr = createTrArr("tbody");
  const result1 = arrTr
    .map((item) => +item.childNodes[0].textContent)
    .every((item) => !isNaN(item));
  const result2 = arrTr
    .map((item) => +item.childNodes[1].textContent)
    .every((item) => !isNaN(item));
  if (result1) {
    resetGame(btn);
  } else if (result2) {
    resetGame(btn);
  }

  console.log(result1);
}

function resetGame(name) {
  const btnOneEL = document.querySelector(".btn--one");
  const btnTwoEL = document.querySelector(".btn--two");

  if (name === "one") {
    btnOneEL.disabled = true;
    btnOneEL.textContent = "Game over";
  } else {
    btnTwoEL.disabled = true;
    btnTwoEL.textContent = "Game over";
  }
  if (
    btnOneEL.textContent === "Game over" &&
    btnTwoEL.textContent === "Game over"
  ) {
    displayWinner();
  }
}

function displayWinner() {
  const arrTr = createTrArr("tfoot");
  const result1 = arrTr.map((item) => +item.childNodes[0].textContent);
  const result2 = arrTr.map((item) => item.childNodes[1].textContent);
  const heading = document.querySelector(".heading");
  const p = document.createElement("p");
  p.classList.add("winner");

  if (+result1 > +result2) {
    p.textContent = `${person.name1} is the winner`;
    heading.insertAdjacentElement("afterend", p);
  } else {
    p.textContent = `${person.name2} is the winner`;
    heading.insertAdjacentElement("afterend", p);
  }

  startAgain();
}

function startAgain() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (btn.classList.contains("btn--play")) {
      btn.style.display = "none";
    }
    if (btn.classList.contains("btn--start")) {
      btn.textContent = "Play Again";
      btn.style.display = "block";
    }
    btn.addEventListener("click", onCLick);
  });
}

function createTrArr(elementName) {
  const element = document.querySelector(elementName);
  const tr = element.querySelectorAll("tr");
  const arrTr = Array.from(tr);
  return arrTr;
}

function init() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (btn.classList.contains("btn--play")) {
      btn.style.display = "none";
    }
    btn.addEventListener("click", onCLick);
  });
}
init();
