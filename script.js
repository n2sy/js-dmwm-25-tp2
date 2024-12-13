let scores, currentScore, activePlayer;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.querySelector(".dice").hidden = true;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.getElementById("btn-roll-dice").disabled = false;
  document.getElementById("btn-hold").disabled = false;
}

init();
document.getElementById("btn-roll-dice").addEventListener("click", () => {
  let nb = Math.trunc(Math.random() * 6) + 1;
  console.log(nb);
  document.querySelector(".dice").hidden = false;
  document.querySelector(".dice").src = `dice-${nb}.png`;
  if (nb != 1) {
    currentScore += nb;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    switchPlayer();
  }
});

function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  //   if (activePlayer == 0) activePlayer = 1;
  //   else activePlayer = 0;
  //   activePlayer = activePlayer == 0 ? 1 : 0;
  activePlayer = 1 - activePlayer;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

document.getElementById("btn-hold").addEventListener("click", () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document.getElementById("btn-roll-dice").disabled = true;
    document.getElementById("btn-hold").disabled = true;
    document.querySelector(".dice").hidden = true;
  } else switchPlayer();
});

document.getElementById("btn-new-game").addEventListener("click", init);
