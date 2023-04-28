var trainingVerify = trainingVerify || {};
trainingVerify.trainingVerified;
trainingVerify.trainingVerifyTimer;
trainingVerify.trainingVerifyButton;

var trainingResult = trainingResult || {};
trainingResult.acquiredExp;

function initVariables(){
    trainingVerify.trainingVerified = 1;

    trainingResult.acquiredExp = 0;
}

function createButton(){
    if (trainingVerify.trainingVerified == 0){
        // 3번 정도는 봐주는 것도 고려

        clearInterval(trainingVerify.trainingVerifyTimer);

        trainingVerify.trainingVerifyButton.remove();

        showTrainingResult();

        return;
    }

    trainingVerify.trainingVerifyButton = document.createElement("input");
    trainingVerify.trainingVerifyButton.type = "button";

    trainingVerify.trainingVerifyButton.style.width = "50px";
    trainingVerify.trainingVerifyButton.style.height = "50px";
    trainingVerify.trainingVerifyButton.style.border = "0";
    trainingVerify.trainingVerifyButton.style.borderRadius = "100px";
    trainingVerify.trainingVerifyButton.style.backgroundColor = "rgb(200, 200, 200)";
    trainingVerify.trainingVerifyButton.style.gridRowStart = Math.floor(Math.random() * 11 + 1);
    trainingVerify.trainingVerifyButton.style.gridRowEnd = Math.floor(Math.random() * 11 + 1);
    trainingVerify.trainingVerifyButton.style.gridColumnStart = Math.floor(Math.random() * 11 + 1);
    trainingVerify.trainingVerifyButton.style.gridColumnEnd = Math.floor(Math.random() * 11 + 1);

    trainingVerify.trainingVerifyButton.onclick = function () {
        trainingVerify.trainingVerified = 1;

        trainingResult.acquiredExp += 1;

        trainingVerify.trainingVerifyButton.remove();
    };

    const trainingWindow = document.getElementById("training-window-wrapper");
    trainingWindow.appendChild(trainingVerify.trainingVerifyButton);

    trainingVerify.trainingVerified = 0;
}

function showTrainingResult(){
    document.getElementById("training-window-wrapper").style.display = "none";
    document.getElementById("initial-training-verify-button").style.display = "none";

    document.getElementById("training-result-wrapper").style.display = "block";

    document.getElementById("acquired-exp-text").innerText = `얻은 경험치: ${trainingResult.acquiredExp}`
}

document.getElementById("initial-training-verify-button").onclick = function () {
    initVariables();

    trainingVerify.trainingVerifyTimer = setInterval("createButton()", 1000 * 5);
    // 시간 간격을 커스터마이즈 할 수 있게, 다만 최소 25분 이상

    document.getElementById("initial-training-verify-button").style.display = "none";
};

document.getElementById("select-training-button").onclick = function () {
    document.getElementById("select-training-wrapper").style.display = "none";

    document.getElementById("training-window-wrapper").style.display = "block";
    document.getElementById("initial-training-verify-button").style.display = "block";

    document.getElementById("training-result-wrapper").style.display = "none";
};

document.getElementById("retraining-button").onclick = function () {
    document.getElementById("select-training-wrapper").style.display = "block";

    document.getElementById("training-window-wrapper").style.display = "none";
    document.getElementById("initial-training-verify-button").style.display = "block";

    document.getElementById("training-result-wrapper").style.display = "none";
};