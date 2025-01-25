let usrseq = [];
let gameseq = [];

let started = false;
let level = 0;

let btns = ["box1", "box2", "box3", "box4"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started via keyboard.");
    started = true;
    levalup();
  }
});

// Add Start Game Button Functionality
document.getElementById("startButton").addEventListener("click", function () {
  if (!started) {
    console.log("Game started via Start Button.");
    started = true;
    levalup();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levalup() {
  usrseq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randomidx = Math.floor(Math.random() * 4);
  let randomcolor = btns[randomidx];
  let randombtn = document.querySelector(`.${randomcolor}`);
  gameseq.push(randomcolor);
  console.log(gameseq);
  gameflash(randombtn);
}

function checkAns(idx) {
  if (usrseq[idx] === gameseq[idx]) {
    if (usrseq.length == gameseq.length) {
      setTimeout(levalup, 1000);
    }
  } else {
    h2.innerHTML = `--- Game Over --- <br>your score was <b>${level}</b><br> press any key to start .`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

function btnpress() {
  let btn = this;
  userflash(btn);

  usercolor = btn.getAttribute("id");
  usrseq.push(usercolor);

  checkAns(usrseq.length - 1);
}

let allbtns = document.querySelectorAll(".box1, .box2, .box3, .box4");
for (btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameseq = [];
  usrseq = [];
  level = 0;
}
