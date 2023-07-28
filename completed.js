// let accessToken = JSON.parse(document.cookie);
// console.log(accessToken);
function checkCookie() {
  if (accessToken["user"] !== "") window.location.replace("/dashboard.html");
  // console.log('Red');
}
// checkCookie();

// let next = document.getElementById("next");
// let dash = document.getElementById("dash");

// next.addEventListener("click", () => {
//   window.location = "http://127.0.0.1:5503/play.html";
// });

// dash.addEventListener("click", () => {
//   window.location = "http://127.0.0.1:5503/dashboard.html";
// });

// function stopWatch {

// }

let display = document.querySelector(".num");
let show = 0;
let Iv = document.querySelector("#btn");
Iv.onclick = () => {
  show += 1;
  display.innerHTML = show;
};
// if (display.innerHTML === 0) ? "Zero" : show;
