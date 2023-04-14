var verify = verify || {};
verify.trainingVerified;
verify.trainingVerifyTimer;
verify.trainingVerifyButton;

var trainingResult = trainingResult || {};
trainingResult.acquiredExp;

function initVariables(){
    verify.trainingVerified = 1;

    trainingResult.acquiredExp = 0;
}

function createButton(){
    if (verify.trainingVerified == 0){
        // 3번 정도는 봐주는 것도 고려

        clearInterval(verify.trainingVerifyTimer);

        verify.trainingVerifyButton.remove();

        showTrainingResult();

        return;
    }

    verify.trainingVerifyButton = document.createElement("input");
    verify.trainingVerifyButton.type = "button";

    verify.trainingVerifyButton.style.width = "50px";
    verify.trainingVerifyButton.style.height = "50px";
    verify.trainingVerifyButton.style.border = "0";
    verify.trainingVerifyButton.style.borderRadius = "100px";
    verify.trainingVerifyButton.style.backgroundColor = "rgb(200, 200, 200)";
    verify.trainingVerifyButton.style.gridRowStart = Math.floor(Math.random() * 11 + 1);
    verify.trainingVerifyButton.style.gridRowEnd = Math.floor(Math.random() * 11 + 1);
    verify.trainingVerifyButton.style.gridColumnStart = Math.floor(Math.random() * 11 + 1);
    verify.trainingVerifyButton.style.gridColumnEnd = Math.floor(Math.random() * 11 + 1);

    verify.trainingVerifyButton.onclick = function () {
        verify.trainingVerified = 1;

        trainingResult.acquiredExp += 1;

        verify.trainingVerifyButton.remove();
    };

    const trainingWindow = document.getElementById("training-window-wrapper");
    trainingWindow.appendChild(verify.trainingVerifyButton);

    verify.trainingVerified = 0;
}

function showTrainingResult(){
    document.getElementById("training-window-wrapper").style.display = "none";
    document.getElementById("initial-training-verify-button").style.display = "none";

    document.getElementById("training-result-wrapper").style.display = "block";

    document.getElementById("acquired-exp-text").innerText = `얻은 경험치: ${trainingResult.acquiredExp}`
}

document.getElementById("initial-training-verify-button").onclick = function () {
    initVariables();

    verify.trainingVerifyTimer = setInterval("createButton()", 1000 * 5);
    // 시간 간격을 커스터마이즈 할 수 있게, 다만 최소 25분 이상

    document.getElementById("initial-training-verify-button").style.display = "none";
};

document.getElementById("retraining-button").onclick = function () {
    document.getElementById("training-window-wrapper").style.display = "grid";
    document.getElementById("initial-training-verify-button").style.display = "block";

    document.getElementById("training-result-wrapper").style.display = "none";
};