let x = document.cookie;
// if (x === 'null')
//     window.location = 'http://127.0.0.1:5503/'
let level = document.getElementById("level");
let new1 = document.getElementById("new1");
let qst = document.getElementById("qst");
let display = document.getElementById("dis");
let submit = document.getElementById("submit");
let ans = document.getElementById("ans");
let fwords = document.getElementById("Fwords");
let rwords = document.getElementById("Rwords");
let list = document.getElementById("list");
let dis = document.getElementById("ans1a");
let reset = document.getElementById("reset");
let reset1 = document.getElementById("reset1");
let main = document.querySelector("main");
let pause = document.querySelector("#pause");
let dis2 = document.getElementById("ans2a");
let checkError = document.querySelector(".message");
let pop = document.getElementById("pop");
let body = document.querySelector("body");
let ansBlock = [];
let userToken = JSON.parse(document.cookie);
if (userToken["user"] === "") window.location = "/index.html";

function get() {
  fetch("http://localhost:5000/game", {
    method: "GET",
    headers: { Authorization: userToken["user"] },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      level.innerHTML = response["level"];
      new1.innerHTML = response["new_words"];
      qst.innerHTML = response["question"];
      let showBtt = "";
      key1 = response["question"];
      for (let i = 0; i < key1.length; i++)
        if (i % 2 === 0) showBtt += `<button class="btt">${key1[i]}</button>`;
      main.innerHTML = showBtt;
      let bb1 = Array.from(document.querySelectorAll(".btt"));
      bb1.map((bb1) => {
        bb1.addEventListener("click", () => {
          dis.innerText += bb1.innerText;
        });
      });
      rwords.innerHTML = response["number of words remaining"];
      fwords.innerHTML = response["number of new words found"];
      // list.innerHTML = response['list']

      let showBox = "";
      let list1 = response["list"];
      for (let i = 0; i < list1.length; i++)
        showBox += `<div class="showBox">${list1[i]}</div>`;
      list.innerHTML = showBox;
      // console.log(user)
    });
}
get();
// function triggerPost() {
//     post();

// }
body.addEventListener("click", () => {});
pause.addEventListener("click", () => {
  pop.style.display = "flex";
});
reset.addEventListener("click", () => {
  dis.innerText = "";
});
reset1.addEventListener("click", () => {
  dis.innerText = dis.innerText.slice(0, -1);
});

function aaa() {
  checkError.style.display = "none";
  // pop.style.display ='none'
}
// aaa();
submit.addEventListener("click", post1);
function post1() {
  // dis2.innerText = dis.innerText

  const check = { word: dis.innerText };
  // console.log(dis.innerText)
  fetch("http://localhost:5000/game", {
    method: "POST",
    headers: {
      Authorization: userToken["user"],
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify(check),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("nom");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      rwords.innerHTML = jsonResponse["number of words remaining"];
      fwords.innerHTML = jsonResponse["number of new words found"];
      const checkCompleted = jsonResponse["completed"];
      // list.innerHTML = jsonResponse['list']
      let showBox = "";
      let list1 = jsonResponse["list"];
      if (list1 === null) return;
      for (let i = 0; i < list1.length; i++)
        showBox += `<div class="showBox">${list1[i]}</div>`;
      list.innerHTML = showBox;
      const message = jsonResponse["message"];
      checkError.innerHTML = message;
      if (checkCompleted !== null) document.addEventListener("click", aaa);
      function showErro() {
        checkError.style.display = "";
      }
      showErro();
      if (message === `try again`) dis.innerText = "";

      if (message === "Congratulations, level completed")
        window.location.replace("/completed.html");

      if (message === "correct") dis.innerText = "";

      if (
        message ===
        `this new word has been found before, try again, you have found ${fwords.innerHTML} new words`
      )
        // alert(fwords.innerHTML)
        dis.innerText = "";
      else if ((message === dis.innerText, "has been added before, try again"))
        dis.innerText = "";
      // if (message === 'correct')
      //     alert('Correct') , dis.innerText = ''
    })
    .catch((err) => console.error(err));
}
let dashPlay = document.querySelector("#ppp");
let dashDash = document.querySelector("#ddd");
dashPlay.addEventListener("click", () => {
  pop.style.display = "none";
});
dashDash.addEventListener("click", () => {
  window.location.replace("/dashboard.html");
});
