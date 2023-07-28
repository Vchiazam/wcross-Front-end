const body = document.querySelector("body"),
  modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});
const uname = document.querySelector(".uname");
const test = document.querySelector(".test");
const id = document.querySelector(".id");
const admin = document.querySelector(".admin");
let x = document.cookie;
let userToken = JSON.parse(document.cookie);
console.log(userToken["Admin"]);
function get() {
  fetch("http://localhost:5000/admin/dashboard", {
    method: "GET",
    headers: { Authorization: userToken["Admin"] },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      const user = response["users"];
      const adminUser = response["admin_user_details"];
      for (let key in user) {
        // let pp = 88
        let showBtt = "";
        let showid = "";
        let countKey = JSON.stringify(key);
        let countUser = JSON.stringify(user[key]);
        let mm = JSON.parse(countUser);
        console.log(typeof mm);
        let finalCount = countKey.length;
        test.innerText = parseInt(finalCount);
        for (let i = 0; i < finalCount; i++)
          (showBtt = `<span class="data-title data names edit">${mm}</span>`),
            (showid = `<span class="d5 edit">${key}</span>`);
        uname.innerHTML += showBtt;
        id.innerHTML += showid;
      }
      // user.innerHTML =`Hello,` + response['user']
      // level.innerHTML = response['level']
      // new1.innerHTML = response['new words']
      // userBtn.innerHTML = response['user']
      // console.log(user)
    });
}

get();
let signOutAdmin = document.getElementById("logout");
signOutAdmin.addEventListener("click", logout);
function logout() {
  console.log(userToken["user"]);
  let cookieHolder = {
    user: userToken["user"],
    Admin: "",
  };
  let cookieString = JSON.stringify(cookieHolder);
  document.cookie = cookieString;
  window.location = "/adminlogin.html";
}
// document.cookie = null, window.location.replace('http://127.0.0.1:5503/adminlogin.html')

// const person = {
//     firstName: 'Victor',
//     lastName: 'Chiazam',
//     get fullName() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     set fullName(value) {
//         if (typeof value != 'string')
//            throw new Error('Value is not a string')
//         const parts = value.split(' ')
//         this.firstName = parts[0]
//         this.lastName = parts[1]
//     }
// }
// try {
//     person.fullName = null;
// }
// catch (e) {
//     alert(e)
// }
// console.log(person)

function sum1(...args) {
  return args.reduce((a, b) => a + b);
}
console.log(sum1[(4, 2, 4, 5)]);

const circle = {
  radius: "tt",
  get area() {
    return "i";
  },
};

circle.radius = 2;
circle.area = "uu";
console.log(circle.area);
