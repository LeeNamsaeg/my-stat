let currentTrainingType;
let trainingVerifyTimer; // 트레이닝 인증 버튼이 일정한 텀을 투고 나오기 위한 타이머
let isTrainingVerified;

let expIncreaseInfo = {
  "국어" : ["언어지능", 1.0],
  "수학" : ["논리지능", 1.0],
  "영어" : ["언어지능", 1.0],
  "과학" : ["논리지능", 1.0],
  "사회" : ["역사지능", 1.0],
  "역사" : ["역사지능", 1.0],
  "유산소" : ["심폐지구력", 1.0, "근력", 0.5, "근지구력", 0.5],
  "무산소" : ["근력", 1.0, "근지구력", 0.5],
};
let acquiredExps = {
  "언어지능" : 0,
  "논리지능" : 0,
  "역사지능" : 0,
  "심폐지구력" : 0,
  "근력" : 0,
  "근지구력" : 0,
};

function initVariables() {
  isTrainingVerified = true;

  for (exp in acquiredExps){
    acquiredExps[exp] = 0;
  }
}

function createVerifyButton() {
  if (isTrainingVerified == false) {
    trainingVerifyButton.remove();

    clearInterval(trainingVerifyTimer);

    showTrainingResult();

    return;
  }

  let randomGridRow = Math.floor(Math.random() * 11 + 1);
  let randomGridColumn = Math.floor(Math.random() * 11 + 1);

  trainingVerifyButton = document.createElement("input");
  trainingVerifyButton.type = "button";

  if (screen.width <= 400) {
    trainingVerifyButton.style.width = "40px";
    trainingVerifyButton.style.height = "40px";
  } else {
    trainingVerifyButton.style.width = "50px";
    trainingVerifyButton.style.height = "50px";
  }
  trainingVerifyButton.style.border = "0";
  trainingVerifyButton.style.borderRadius = "100px";
  trainingVerifyButton.style.margin = "auto auto";
  trainingVerifyButton.style.backgroundColor = "rgb(200, 200, 200)";
  trainingVerifyButton.style.gridRowStart = `${randomGridRow}`;
  trainingVerifyButton.style.gridRowEnd = `${randomGridRow}`;
  trainingVerifyButton.style.gridColumnStart = `${randomGridColumn}`;
  trainingVerifyButton.style.gridColumnEnd = `${randomGridColumn}`;

  document
    .getElementById("training-verify-grid")
    .appendChild(trainingVerifyButton);

  isTrainingVerified = false;

  trainingVerifyButton.onclick = function () {
    isTrainingVerified = true;

    for (i = 0; i < expIncreaseInfo[`${currentTrainingType}`].length; i += 2){
      acquiredExps[expIncreaseInfo[`${currentTrainingType}`][i]] += expIncreaseInfo[`${currentTrainingType}`][i + 1];
    }

    trainingVerifyButton.remove();
  };
}

function showTrainingResult() {
  document.getElementById("training-verify-window-wrapper").style.display =
    "none";

  document.getElementById("training-result-wrapper").style.display = "block";

  let acquiredExpInfo = "";
  for (acquiredExp in acquiredExps){
    acquiredExpInfo += `\n${acquiredExp} : ${acquiredExps[acquiredExp]}`
  }

  document.getElementById(
    "acquired-exp-text"
  ).innerText = `얻은 경험치: ${acquiredExpInfo}`;
}

// 트레이닝 시작
document.getElementById("select-training-type-button").onclick = function () {
  currentTrainingType = document.getElementById("select-training-type").value;

  document.getElementById("select-training-type-wrapper").style.display =
    "none";

  document.getElementById("training-verify-window-wrapper").style.display =
    "block";
  document.getElementById("initial-training-verify-button").style.display =
    "block";
};

document.getElementById("initial-training-verify-button").onclick =
  function () {
    initVariables();

    // 시간 간격을 커스터마이즈 할 수 있게, 다만 최소 25분 이상, settimeout 쓸까 고민
    trainingVerifyTimer = setInterval("createVerifyButton()", 1000 * 5);

    document.getElementById("initial-training-verify-button").style.display =
      "none";
  };

// 리트레이닝 버튼
document.getElementById("retraining-button").onclick = function () {
  document.getElementById("select-training-type-wrapper").style.display =
    "block";

  document.getElementById("training-result-wrapper").style.display = "none";
};
