const uname = document.querySelector("#name");
const next = document.querySelector(".next");
const holdToken = document.querySelector(".holdToken");
const showForm = document.querySelector(".showForm");
const nameForm = document.querySelector(".nameForm");
const showError1 = document.querySelector(".showError1");
const showError2 = document.querySelector(".showError2");
let userToken = JSON.parse(document.cookie);
if (userToken["user"] === "") window.location = "http://127.0.0.1:5503/";

// let x = document.cookie;

next.onclick = () => {
  const checkUser = { name: uname.value };
  fetch("http://localhost:5000/forgotpassword", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(checkUser),
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      // console.log(response)
      showError1.innerText = response["mess"];
      if (response["token"] != undefined)
        (holdToken.value = response["token"]),
          (showForm.style.display = ""),
          (nameForm.style.display = "none");
      if (response["mess"] != null)
        // console.log('hdh')
        document.onclick = () => {
          showError1.style.display = "none";
        };
      function check1() {
        showError1.style.display = "";
      }
      check1();
    });
};
let next2 = document.querySelector(".next2");
let sucess = document.querySelector(".sucess");

next2.onclick = () => {
  let resetPin = document.querySelector(".resetPin");
  let npass = document.querySelector(".npass");
  let cpass = document.querySelector(".cpass");
  token1 = holdToken.value;
  if (resetPin.value === "") showError2.innerText = "Resetpin cant be empty";
  else if (npass.value === "")
    showError2.innerText = "New password cant be empty";
  else if (cpass.value === "")
    showError2.innerText = "Confirm password cant be empty";
  else {
    let url = `http://localhost:5000/forgotpassword/${token1}`;
    const sendValue = {
      resetpin: resetPin.value,
      newpassword: npass.value,
      cnewpassword: cpass.value,
    };
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: userToken["user"],
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(sendValue),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("something went wrong");
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        ss();
        function ss() {
          showError2.innerText = jsonResponse["mess"];
          if (
            jsonResponse["mess"] ===
            "password reset successful, login to continue"
          )
            //  console.log('hdh')
            (showError2.style.background = "rgba(70, 255, 101, 0.76)"),
              setTimeout(() => {
                window.location.replace("http://localhost:5503/login.html");
              }, 2000);
          else if (jsonResponse["mess"] != null)
            // console.log('hdh')
            document.onclick = () => {
              showError2.style.display = "none";
            };
          function check2() {
            showError2.style.display = "";
          }
          check2();
        }
      });
  }
};
