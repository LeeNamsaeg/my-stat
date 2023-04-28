function checkUserId(){
    userId = document.getElementById("user-id").value;

    if (userId.length < 9 || userId.length > 20)
        console.log("id length issue");
}

function checkUserPw(){
    userPw = document.getElementById("user-pw").value;
    userPwCheck = document.getElementById("user-pw-check").value;

    if (userPw.length < 9 || userPw.length > 20)
        console.log("id length issue");

    if (userPw !== userPwCheck)
        console.log("pw issue");
}

document.getElementById("login-submit").onclick = function () {
    // checkUserId();
    // checkUserPw();

    $.ajax({
        type : 'post',
        url : '/login/submit',
        async : true,
        headers : {
            "Content-Type" : "application/json",
            "X-HTTP-Method-Override" : "POST"
        },
        dataType : 'text',
        data : JSON.stringify({
            "user_id" : document.getElementById("user-id").value,
            "user_pw" : document.getElementById("user-pw").value
        }),
        success : function (result){
            if (result != "ok"){
                warningMessage = "";

                if (result == "cannot find value")
                    warningMessage = "일치하는 계정을 찾을 수 없습니다.";

                document.getElementById("warning-message").innerText = warningMessage;

                return;
            }

            document.getElementById("warning-message").innerText = "";

            window.location.href = "https://www.youtube.com/watch?v=qlAJwvv0ArI&ab_channel=Sou";
        },
        error : function (request, status, error){
            console.log(error)
        }
    });
}