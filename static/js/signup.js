function checkUserId() {
  userId = document.getElementById("user-id").value;

  if (userId.length < 9 || userId.length > 20) console.log("id length issue");
}

function checkUserPw() {
  userPw = document.getElementById("user-pw").value;
  userPwCheck = document.getElementById("user-pw-check").value;

  if (userPw.length < 9 || userPw.length > 20) console.log("id length issue");

  if (userPw !== userPwCheck) console.log("pw issue");
}

function checkUserNickName() {}

function checkUserEmail() {}

document.getElementById("signup-submit").onclick = function () {
  // checkUserId();
  // checkUserPw();

  $.ajax({
    type: "post",
    url: "/signup/submit",
    async: true,
    headers: {
      "Content-Type": "application/json",
      "X-HTTP-Method-Override": "POST",
    },
    dataType: "text",
    data: JSON.stringify({
      user_id: document.getElementById("user-id").value,
      user_pw: document.getElementById("user-pw").value,
      user_nickname: document.getElementById("user-nickname").value,
      user_email: document.getElementById("user-email").value,
    }),
    success: function (result) {
      if (result != "ok") {
        warningMessage = "";

        if (result == "duplicated value issue")
          warningMessage = "중복되는 값이 있습니다.";

        document.getElementById("warning-message").innerText = warningMessage;

        return;
      }

      document.getElementById("warning-message").innerText = "";

      window.location.href =
        "https://www.youtube.com/watch?v=qlAJwvv0ArI&ab_channel=Sou";
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};
