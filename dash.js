// import { all } from "./app"
let x = document.cookie;
// if (x === 'null')
// window.location = 'http://127.0.0.1:5503/'
let user = document.getElementById("usern");
let level = document.getElementById("level");
let new1 = document.getElementById("new");
let userBtn = document.querySelector(".userBtn");
let greet = document.getElementById("greet");
document.getElementById("con").addEventListener("click", () => {
  window.location = "http://127.0.0.1:5503/play.html";
});
userBtn.addEventListener("click", () => {
  window.location.replace("http://127.0.0.1:5503/profile.html");
});
// hour
// if hour is between 6am and 12am, greet good morning
// eles afternoon

let hour = new Date();
let v = hour.getHours();
console.log(v);
if (v >= 0 && v < 12) greet.innerHTML = "Good Morning";
else if (v >= 12 && v < 16) greet.innerHTML = "Good Afternoon";
else greet.innerHTML = "Good Evening";

let userToken = JSON.parse(document.cookie);
console.log(userToken["user"]);

// greet.innerText = messg
document.getElementById("signout").addEventListener("click", () => {
  // userToken['user'] = null
  console.log(userToken["user"]);
  let cookieHolder = {
    user: "",
    Admin: userToken["Admin"],
  };
  let cookieString = JSON.stringify(cookieHolder);
  document.cookie = cookieString;
  window.location = "http://127.0.0.1:5503/";
});
// let cookieHolder = {
//         'user' : '',
//         'Admin' : userToken['admin'],
//     }
//     let cookieString = JSON.stringify(cookieHolder)
//     document.cookie = cookieString
// console.log(document.cookie);
// function ccc() {
//             if (typeof 1 === 'number')
//             window.location = 'http://127.0.0.1:5503/'
//         }

function get() {
  fetch("http://localhost:5000/dashboard", {
    method: "GET",
    headers: { Authorization: userToken["user"] },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      user.innerHTML = `Hello,` + response["user"];
      level.innerHTML = response["level"];
      new1.innerHTML = response["new words"];
      userBtn.innerHTML = response["user"];
      ExToken = response["message"];
      console.log(ExToken);
      if (ExToken === "Unathorized")
        window.location = "http://127.0.0.1:5503/login.html";
      // document.cookie = null;

      // console.log(user)
    });
}

get();
