// let x = document.cookie
let Edit = document.querySelector(".Edit");
let pp = document.querySelector(".pp");
let usernam = document.querySelector("#usernam");
let play = document.querySelector(".play");
let dash = document.querySelector(".dash");
let username1 = document.querySelector(".usernam");
let username2 = document.querySelector(".usernam1");
let username3 = document.querySelector(".usernam2");
let email1 = document.querySelector(".email1");
let email2 = document.querySelector(".email2");
let phone = document.querySelector(".phone");
let phone2 = document.querySelector(".phone2");
let save = document.getElementById("save");
let Level1 = document.querySelector(".level1");
let new_words = document.querySelector(".new-words");
let picture1 = document.querySelector(".picture1");
let goldPoints = document.querySelector(".Goldpoints");
let resetpin = document.querySelector(".resetpin");
let resetButton = document.querySelector(".resetButton");
const showSucess = document.querySelector(".showSucess");
let profileSideImg = document.querySelector(".image");
let userToken = JSON.parse(document.cookie);
if (userToken["user"] === "") window.location = "/index.html";

Edit.addEventListener("click", () => {
  pp.style.display = "inline";
  profileSideImg.style.display = "none";
});
play.addEventListener("click", () => {
  window.location.replace("/play.html");
});
dash.addEventListener("click", () => {
  window.location.replace("/dashboard.html");
});

function get() {
  fetch("http://localhost:5000/profile", {
    method: "GET",
    headers: { Authorization: userToken["user"] },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      usernam.innerHTML = `Hello,` + response["name"];
      username1.value = response["name"];
      Level1.innerText = response["level"];
      new_words.innerText = response["new_word"];
      goldPoints.innerText = response["new_word"] * 3;
      username2.innerHTML = response["name"];
      username3.innerHTML = response["name"];
      email1.value = response["email"];
      email2.innerHTML = response["email"];
      phone.value = response["phone"];
      phone2.innerHTML = response["phone"];
      console.log(response["reset"]);
      const pinSettingBox = document.querySelector(".box");
      let enterResetPin = response["reset"];
      if (enterResetPin === "active")
        (resetpin.readOnly = true),
          (resetButton.disabled = true),
          (pinSettingBox.style.display = "");

      // new1.innerHTML = response['new words']
      // console.log(user)
    });
}

get();

save.addEventListener("click", post1);
function post1() {
  const save = {
    phone: phone.value,
    email: email1.value,
    picture: picture1.value,
  };
  // console.log(dis.innerText)
  fetch("http://localhost:5000/profile", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify(save),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Someting went wrong please try again");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      showSucess.innerHTML = jsonResponse["mess"];
      if (jsonResponse["mess"] != null)
        document.addEventListener("click", () => {
          showSucess.style.display = "none";
        });
      function showErro() {
        showSucess.style.display = "inline";
      }
      showErro();
    });
}

resetButton.addEventListener("click", () => {
  const resetpin1 = { resetpin: resetpin.value };
  fetch("http://localhost:5000/create/resetpin", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify(resetpin1),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Someting went wrong please try again");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
    });
});
const oldPin = document.querySelector(".oldPin");
const newPin = document.querySelector(".newPin");
const cNewPin = document.querySelector(".cNewPin");
const change = document.querySelector(".change");

change.onclick = function (e) {
  e.preventDefault();
  cNewPin.password = false;
  const pinSetting = {
    formerresetpin: oldPin.value,
    newresetpin: newPin.value,
    cnewresetpin: cNewPin.value,
  };
  fetch("http://localhost:5000/account/resetpin", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify(pinSetting),
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
    });
};

let Delete = document.querySelector(".delete");
const showDelete = document.querySelector(".showDelete");

Delete.onclick = function () {
  showDelete.style.display = "";
};

const deletAccount = document.querySelector("#yes");
const keepAccount = document.querySelector("#no");

keepAccount.onclick = () => {
  showDelete.style.display = "none";
};
let accessToken = JSON.parse(document.cookie);
deletAccount.onclick = () => {
  fetch("http://localhost:5000/account/delete", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
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
      let deleted = jsonResponse["mess"];
      let accessToken = JSON.parse(document.cookie);
      console.log(accessToken);
      if (deleted === "Account succefully deleted") {
      }
      // (accessToken["user"] = null), rr();
      let cookieHolder = {
        user: "",
        Admin: userToken["Admin"],
      };
      let cookieString = JSON.stringify(cookieHolder);
      document.cookie = cookieString;
      window.location = "/index.html";
    });
};

// function rr() {
//   setTimeout(() => {
//     if (document.cookie === "null") window.location = "http://127.0.0.1:5503/";
//   }, 1000);
// }

// admin = {
//     "admin_user_details": {
//         "admin_type": "Superadmin",
//         "curr_admin_email": "danieladmin@gmail.com",
//         "curr_admin_name": "daniel"
//     },
//     "users": {
//         "1": "egg",
//         "2": "reel"
//     }
// }
// let ad = admin['admin_user_details']
// let ab = admin['users']
// console.log(ab[2])
