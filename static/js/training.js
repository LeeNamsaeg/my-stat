// js 파일 자체를 변조하는 건 어떻게 막지?

let trainingVerifyTimer;
let isTrainingVerified;

let acquiredExp;

function initVariables(){
    isTrainingVerified = 1;

    acquiredExp = 0;
}

function createVerifyButton(){
    if (isTrainingVerified == 0){
        trainingVerifyButton.remove();

        clearInterval(trainingVerifyTimer);

        showTrainingResult();

        return;
    }

    let randomGridRow = Math.floor(Math.random() * 11 + 1);
    let randomGridColumn = Math.floor(Math.random() * 11 + 1);

    trainingVerifyButton = document.createElement("input");
    trainingVerifyButton.type = "button";

    if (screen.width <= 400){
        trainingVerifyButton.style.width = "40px";
        trainingVerifyButton.style.height = "40px";
    }
    else{
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

    document.getElementById("training-verify-grid").appendChild(trainingVerifyButton);

    isTrainingVerified = 0;

    trainingVerifyButton.onclick = function () {
        isTrainingVerified = 1;

        acquiredExp += 1;

        trainingVerifyButton.remove();
    };
}

function showTrainingResult(){
    document.getElementById("training-verify-window-wrapper").style.display = "none";

    document.getElementById("training-result-wrapper").style.display = "block";

    document.getElementById("acquired-exp-text").innerText = `얻은 경험치: ${acquiredExp}`
}

document.getElementById("select-training-type-button").onclick = function () {
    document.getElementById("select-training-type-wrapper").style.display = "none";

    document.getElementById("training-verify-window-wrapper").style.display = "block";
    document.getElementById("initial-training-verify-button").style.display = "block";
};

document.getElementById("initial-training-verify-button").onclick = function () {
    initVariables();

    trainingVerifyTimer = setInterval("createVerifyButton()", 1000 * 5);
    // 시간 간격을 커스터마이즈 할 수 있게, 다만 최소 25분 이상

    document.getElementById("initial-training-verify-button").style.display = "none";
};

document.getElementById("retraining-button").onclick = function () {
    document.getElementById("select-training-type-wrapper").style.display = "block";

    document.getElementById("training-result-wrapper").style.display = "none";
};