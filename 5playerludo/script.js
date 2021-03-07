// $stepcount = document.getElementsByClassName("step");
// for (i = 0; i < $stepcount.length; i++) {
//   $stepcount[i].innerHTML = i;
// }

//connecting to classes at html file
let step = document.getElementsByClassName("astep");
let bdice = document.getElementsByClassName("b-dice");
let gdice = document.getElementsByClassName("g-dice");
let rdice = document.getElementsByClassName("r-dice");
let odice = document.getElementsByClassName("o-dice");
let ydice = document.getElementsByClassName("y-dice");

let player = document.getElementsByClassName("player");
let playerroom = document.getElementsByClassName("playerzone");
let playername = document.getElementsByClassName("playername");

// connecting to sounds
let dicesound = document.getElementById("diceSound");
let killedsound = document.getElementById("killedSound");
let winsound = document.getElementById("winSound");
let inoutsound = document.getElementById("inoutSound");
let stepsound = document.getElementById("stepSound");

let b = document.getElementsByClassName("b");
let g = document.getElementsByClassName("g");
let r = document.getElementsByClassName("r");
let o = document.getElementsByClassName("o");
let y = document.getElementsByClassName("y");

bdice[0].style.display = "";
gdice[0].style.display = "none";
rdice[0].style.display = "none";
odice[0].style.display = "none";
ydice[0].style.display = "none";

let pmove;
let moves = [0, 0, 0, 0, 0];

let bw = [-1, -1, -1, -1]; // position of playercoins
let gw = [-1, -1, -1, -1];
let rw = [-1, -1, -1, -1];
let ow = [-1, -1, -1, -1];
let yw = [-1, -1, -1, -1];

let bstate = [0, 0, 0, 0]; // 0 or 1 | moveable or not
let gstate = [0, 0, 0, 0];
let rstate = [0, 0, 0, 0];
let ostate = [0, 0, 0, 0];
let ystate = [0, 0, 0, 0];

let blueway = [
  37,
  38,
  39,
  40,
  41,
  30,
  24,
  18,
  12,
  6,
  0,
  1,
  2,
  8,
  14,
  20,
  26,
  32,
  33,
  27,
  21,
  15,
  9,
  3,
  4,
  5,
  11,
  17,
  23,
  29,
  35,
  42,
  43,
  44,
  45,
  46,
  47,
  59,
  71,
  70,
  69,
  68,
  67,
  66,
  74,
  77,
  80,
  83,
  86,
  89,
  88,
  87,
  84,
  81,
  78,
  75,
  72,
  65,
  64,
  63,
  62,
  61,
  60,
  48,
  49,
  50,
  51,
  52,
  53,
];
let greenway = [
  8,
  14,
  20,
  26,
  32,
  33,
  27,
  21,
  15,
  9,
  3,
  4,
  5,
  11,
  17,
  23,
  29,
  35,
  42,
  43,
  44,
  45,
  46,
  47,
  59,
  71,
  70,
  69,
  68,
  67,
  66,
  74,
  77,
  80,
  83,
  86,
  89,
  88,
  87,
  84,
  81,
  78,
  75,
  72,
  65,
  64,
  63,
  62,
  61,
  60,
  48,
  36,
  37,
  38,
  39,
  40,
  41,
  30,
  24,
  18,
  12,
  6,
  0,
  1,
  7,
  13,
  19,
  25,
  31,
];
let redway = [
  11,
  17,
  23,
  29,
  35,
  42,
  43,
  44,
  45,
  46,
  47,
  59,
  71,
  70,
  69,
  68,
  67,
  66,
  74,
  77,
  80,
  83,
  86,
  89,
  88,
  87,
  84,
  81,
  78,
  75,
  72,
  65,
  64,
  63,
  62,
  61,
  60,
  48,
  36,
  37,
  38,
  39,
  40,
  41,
  30,
  24,
  18,
  12,
  6,
  0,
  1,
  2,
  8,
  14,
  20,
  26,
  32,
  33,
  27,
  21,
  15,
  9,
  3,
  4,
  10,
  16,
  22,
  28,
  34,
];
let orangeway = [
  70,
  69,
  68,
  67,
  66,
  74,
  77,
  80,
  83,
  86,
  89,
  88,
  87,
  84,
  81,
  78,
  75,
  72,
  65,
  64,
  63,
  62,
  61,
  60,
  48,
  36,
  37,
  38,
  39,
  40,
  41,
  30,
  24,
  18,
  12,
  6,
  0,
  1,
  2,
  8,
  14,
  20,
  26,
  32,
  33,
  27,
  21,
  15,
  9,
  3,
  4,
  5,
  11,
  17,
  23,
  29,
  35,
  42,
  43,
  44,
  45,
  46,
  47,
  59,
  58,
  57,
  56,
  55,
  54,
];
let yellowway = [
  84,
  81,
  78,
  75,
  72,
  65,
  64,
  63,
  62,
  61,
  60,
  48,
  36,
  37,
  38,
  39,
  40,
  41,
  30,
  24,
  18,
  12,
  6,
  0,
  1,
  2,
  8,
  14,
  20,
  26,
  32,
  33,
  27,
  21,
  15,
  9,
  3,
  4,
  5,
  11,
  17,
  23,
  29,
  35,
  42,
  43,
  44,
  45,
  46,
  47,
  59,
  71,
  70,
  69,
  68,
  67,
  66,
  74,
  77,
  80,
  83,
  86,
  89,
  88,
  85,
  82,
  79,
  76,
  73,
];

let safestep = [37, 12, 8, 15, 11, 45, 70, 83, 84, 62];

function motionOn(colorNum) {
  if (colorNum == 0) {
    var i;
    for (i = 0; i < 4; i++) {
      b[i].classList.add("animate__animated", "animate__tada");
      //        r[i].classList.remove("animate__animated","animate__tada");
      g[i].classList.remove("animate__animated", "animate__tada");
      r[i].classList.remove("animate__animated", "animate__tada");
      o[i].classList.remove("animate__animated", "animate__tada");
      y[i].classList.remove("animate__animated", "animate__tada");
      b[i].style.zIndex = "+99";
      g[i].style.zIndex = "0";
      r[i].style.zIndex = "0";
      o[i].style.zIndex = "0";
      y[i].style.zIndex = "0";
    }
  } else if (colorNum == 1) {
    var i;
    for (i = 0; i < 4; i++) {
      g[i].classList.add("animate__animated", "animate__tada");
      r[i].classList.remove("animate__animated", "animate__tada");
      o[i].classList.remove("animate__animated", "animate__tada");
      //              g[i].classList.remove("animate__animated","animate__tada");
      y[i].classList.remove("animate__animated", "animate__tada");
      b[i].classList.remove("animate__animated", "animate__tada");

      b[i].style.zIndex = "0";
      g[i].style.zIndex = "+99";
      r[i].style.zIndex = "0";
      o[i].style.zIndex = "0";
      y[i].style.zIndex = "0";
    }
  } else if (colorNum == 2) {
    var i;
    for (i = 0; i < 4; i++) {
      r[i].classList.add("animate__animated", "animate__tada");
      o[i].classList.remove("animate__animated", "animate__tada");
      //              y[i].classList.remove("animate__animated","animate__tada");
      y[i].classList.remove("animate__animated", "animate__tada");
      b[i].classList.remove("animate__animated", "animate__tada");
      g[i].classList.remove("animate__animated", "animate__tada");

      b[i].style.zIndex = "0";
      g[i].style.zIndex = "0";
      r[i].style.zIndex = "+99";
      o[i].style.zIndex = "0";
      y[i].style.zIndex = "0";
    }
  } else if (colorNum == 3) {
    var i;
    for (i = 0; i < 4; i++) {
      o[i].classList.add("animate__animated", "animate__tada");
      y[i].classList.remove("animate__animated", "animate__tada");
      b[i].classList.remove("animate__animated", "animate__tada");
      g[i].classList.remove("animate__animated", "animate__tada");
      r[i].classList.remove("animate__animated", "animate__tada");
      //              b[i].classList.remove("animate__animated","animate__tada");
      b[i].style.zIndex = "0";
      g[i].style.zIndex = "0";
      r[i].style.zIndex = "0";
      o[i].style.zIndex = "+99";
      y[i].style.zIndex = "0";
    }
  } else if (colorNum == 4) {
    var i;
    for (i = 0; i < 4; i++) {
      y[i].classList.add("animate__animated", "animate__tada");
      b[i].classList.remove("animate__animated", "animate__tada");
      g[i].classList.remove("animate__animated", "animate__tada");
      r[i].classList.remove("animate__animated", "animate__tada");
      o[i].classList.remove("animate__animated", "animate__tada");
      b[i].style.zIndex = "0";
      g[i].style.zIndex = "0";
      r[i].style.zIndex = "0";
      o[i].style.zIndex = "0";
      y[i].style.zIndex = "+99";
    }
  } else {
    for (i = 0; i < b.length; i++) {
      r[i].classList.remove("animate__animated", "animate__tada");
      y[i].classList.remove("animate__animated", "animate__tada");
      g[i].classList.remove("animate__animated", "animate__tada");
      b[i].classList.remove("animate__animated", "animate__tada");
      o[i].classList.remove("animate__animated", "animate__tada");
    }
  }
}

function dice(obj, colorNum) {
  dicesound.play();
  let num = Math.floor(Math.random() * 6 + 1);
  //var num = 1;
  pmove = num;
  obj.innerHTML = num;
  moves[colorNum] = num; // to check if the dice is rolled or not before running movefunctions
  motionOn(colorNum);
  diceRotation(colorNum);
}

function kill(playerNum, p) {
  if (p == 0) {
    if (safestep.includes(blueway[bw[playerNum]])) {
      return 0;
    }
    let i;
    for (i = 0; i < 4; i++) {
      var green =
        '<span onclick="movegreen(this,' +
        i +
        ')" class="gp material-icons g" style="z-index: 0;">stars</span>';
      var red =
        '<span onclick="movered(this,' +
        i +
        ')" class="rp material-icons r" style="z-index: 0;">stars</span>';
      var orange =
        '<span onclick="moveorange(this,' +
        i +
        ')" class="op material-icons o" style="z-index: 0;">stars</span>';
      var yellow =
        '<span onclick="moveyellow(this,' +
        i +
        ')" class="yp material-icons y" style="z-index: 0;">stars</span>';

      let check = step[blueway[bw[playerNum]]].innerHTML;
      console.log(check);
      if (check == green) {
        killedsound.play();
        step[blueway[bw[playerNum]]].innerHTML = "";
        console.log("blue cuts green");
        gw[i] = -1;
        gstate[i] = 0;
        player[4 + i].innerHTML = green;
        pmove = 7;
        diceRotation(0);
        return 1427;
      } else if (check == red) {
        killedsound.play();
        step[blueway[bw[playerNum]]].innerHTML = "";
        console.log("blue cuts red");
        rw[i] = -1;
        rstate[i] = 0;
        player[8 + i].innerHTML = red;
        pmove = 7;
        diceRotation(0);
        return 1427;
      } else if (check == orange) {
        killedsound.play();
        step[blueway[bw[playerNum]]].innerHTML = "";
        console.log("blue cuts orange");
        ow[i] = -1;
        ostate[i] = 0;
        player[16 + i].innerHTML = orange;
        pmove = 7;
        diceRotation(0);
        return 1427;
      } else if (check == yellow) {
        killedsound.play();
        step[blueway[bw[playerNum]]].innerHTML = "";
        console.log("blue cuts yellow");
        yw[i] = -1;
        ystate[i] = 0;
        player[12 + i].innerHTML = yellow;
        pmove = 7;
        diceRotation(0);
        return 1427;
      }
    }
  }
  if (p == 1) {
    if (safestep.includes(greenway[gw[playerNum]])) {
      return 0;
    }
    let i;
    for (i = 0; i < 4; i++) {
      var blue =
        '<span onclick="moveblue(this,' +
        i +
        ')" class="bp material-icons b" style="z-index: 0;">stars</span>';
      var red =
        '<span onclick="movered(this,' +
        i +
        ')" class="rp material-icons r" style="z-index: 0;">stars</span>';
      var orange =
        '<span onclick="moveorange(this,' +
        i +
        ')" class="op material-icons o" style="z-index: 0;">stars</span>';
      var yellow =
        '<span onclick="moveyellow(this,' +
        i +
        ')" class="yp material-icons y" style="z-index: 0;">stars</span>';

      let check = step[greenway[gw[playerNum]]].innerHTML;
      console.log(check);
      if (check == red) {
        killedsound.play();
        step[greenway[gw[playerNum]]].innerHTML = "";
        console.log("green cuts red");
        rw[i] = -1;
        rstate[i] = 0;
        player[8 + i].innerHTML = red;
        pmove = 7;
        diceRotation(1);
        return 1427;
      } else if (check == orange) {
        killedsound.play();
        step[greenway[gw[playerNum]]].innerHTML = "";
        console.log("green cuts orange");
        ow[i] = -1;
        ostate[i] = 0;
        player[16 + i].innerHTML = orange;
        pmove = 7;
        diceRotation(1);
        return 1427;
      } else if (check == yellow) {
        killedsound.play();
        step[greenway[gw[playerNum]]].innerHTML = "";
        console.log("green cuts yellow");

        yw[i] = -1;
        ystate[i] = 0;
        player[12 + i].innerHTML = yellow;
        pmove = 7;
        diceRotation(1);
        return 1427;
      } else if (check == blue) {
        killedsound.play();
        step[greenway[gw[playerNum]]].innerHTML = "";
        console.log("green cuts blue");
        bw[i] = -1;
        bstate[i] = 0;
        player[i].innerHTML = blue;
        pmove = 7;
        diceRotation(1);
        return 1427;
      }
    }
  }
  if (p == 2) {
    if (safestep.includes(redway[rw[playerNum]])) {
      return 0;
    }
    let i;
    for (i = 0; i < 4; i++) {
      var blue =
        '<span onclick="moveblue(this,' +
        i +
        ')" class="bp material-icons b" style="z-index: 0;">stars</span>';
      var green =
        '<span onclick="movegreen(this,' +
        i +
        ')" class="gp material-icons g" style="z-index: 0;">stars</span>';
      var orange =
        '<span onclick="moveorange(this,' +
        i +
        ')" class="op material-icons o" style="z-index: 0;">stars</span>';
      var yellow =
        '<span onclick="moveyellow(this,' +
        i +
        ')" class="yp material-icons y" style="z-index: 0;">stars</span>';

      let check = step[redway[rw[playerNum]]].innerHTML;
      console.log(check);
      if (check == orange) {
        killedsound.play();
        step[redway[rw[playerNum]]].innerHTML = "";
        console.log("red cuts orange");
        ow[i] = -1;
        ostate[i] = 0;
        player[16 + i].innerHTML = orange;
        pmove = 7;
        diceRotation(2);
        return 1427;
      } else if (check == yellow) {
        killedsound.play();
        step[redway[rw[playerNum]]].innerHTML = "";
        console.log("red cuts yellow");
        yw[i] = -1;
        ystate[i] = 0;
        player[12 + i].innerHTML = yellow;
        pmove = 7;
        diceRotation(2);
        return 1427;
      } else if (check == blue) {
        killedsound.play();
        step[redway[rw[playerNum]]].innerHTML = "";
        console.log("red cuts blue");
        bw[i] = -1;
        bstate[i] = 0;
        player[i].innerHTML = blue;
        pmove = 7;
        diceRotation(2);
        return 1427;
      } else if (check == green) {
        killedsound.play();
        step[redway[rw[playerNum]]].innerHTML = "";
        console.log("red cuts green");
        gw[i] = -1;
        gstate[i] = 0;
        player[4 + i].innerHTML = green;
        pmove = 7;
        diceRotation(2);
        return 1427;
      }
    }
  }
  if (p == 3) {
    if (safestep.includes(orangeway[ow[playerNum]])) {
      return 0;
    }
    let i;
    for (i = 0; i < 4; i++) {
      var blue =
        '<span onclick="moveblue(this,' +
        i +
        ')" class="bp material-icons b" style="z-index: 0;">stars</span>';
      var green =
        '<span onclick="movegreen(this,' +
        i +
        ')" class="gp material-icons g" style="z-index: 0;">stars</span>';
      var red =
        '<span onclick="movered(this,' +
        i +
        ')" class="rp material-icons r" style="z-index: 0;">stars</span>';
      var yellow =
        '<span onclick="moveyellow(this,' +
        i +
        ')" class="yp material-icons y" style="z-index: 0;">stars</span>';

      let check = step[orangeway[ow[playerNum]]].innerHTML;
      console.log(check);
      if (check == yellow) {
        killedsound.play();
        step[orangeway[ow[playerNum]]].innerHTML = "";
        console.log("orange cuts yellow");
        yw[i] = -1;
        ystate[i] = 0;
        player[12 + i].innerHTML = yellow;
        pmove = 7;
        diceRotation(3);
        return 1427;
      } else if (check == blue) {
        killedsound.play();
        step[orangeway[ow[playerNum]]].innerHTML = "";
        console.log("orange cuts blue");
        bw[i] = -1;
        bstate[i] = 0;
        player[i].innerHTML = blue;
        pmove = 7;
        diceRotation(3);
        return 1427;
      } else if (check == green) {
        killedsound.play();
        step[orangeway[ow[playerNum]]].innerHTML = "";
        console.log("orange cuts green");
        gw[i] = -1;
        gstate[i] = 0;
        player[4 + i].innerHTML = green;
        pmove = 7;
        diceRotation(3);
        return 1427;
      } else if (check == red) {
        killedsound.play();
        step[orangeway[ow[playerNum]]].innerHTML = "";
        console.log("orange cuts red");
        rw[i] = -1;
        rstate[i] = 0;
        player[8 + i].innerHTML = red;
        pmove = 7;
        diceRotation(3);
        return 1427;
      }
    }
  }
  if (p == 4) {
    if (safestep.includes(yellowway[yw[playerNum]])) {
      return 0;
    }
    let i;
    for (i = 0; i < 4; i++) {
      var blue =
        '<span onclick="moveblue(this,' +
        i +
        ')" class="bp material-icons b" style="z-index: 0;">stars</span>';
      var green =
        '<span onclick="movegreen(this,' +
        i +
        ')" class="gp material-icons g" style="z-index: 0;">stars</span>';
      var red =
        '<span onclick="movered(this,' +
        i +
        ')" class="rp material-icons r" style="z-index: 0;">stars</span>';
      var orange =
        '<span onclick="moveorange(this,' +
        i +
        ')" class="op material-icons o" style="z-index: 0;">stars</span>';

      let check = step[yellowway[yw[playerNum]]].innerHTML;
      console.log(check);
      if (check == blue) {
        killedsound.play();
        step[yellowway[yw[playerNum]]].innerHTML = "";
        console.log("yellow cuts blue");
        bw[i] = -1;
        bstate[i] = 0;
        player[i].innerHTML = blue;
        pmove = 7;
        diceRotation(4);
        return 1427;
      } else if (check == green) {
        killedsound.play();
        step[yellowway[yw[playerNum]]].innerHTML = "";
        console.log("yellow cuts green");
        gw[i] = -1;
        gstate[i] = 0;
        player[4 + i].innerHTML = green;
        pmove = 7;
        diceRotation(4);
        return 1427;
      } else if (check == red) {
        killedsound.play();
        step[yellowway[yw[playerNum]]].innerHTML = "";
        console.log("yellow cuts red");
        rw[i] = -1;
        rstate[i] = 0;
        player[8 + i].innerHTML = red;
        pmove = 7;
        diceRotation(4);
        return 1427;
      } else if (check == orange) {
        killedsound.play();
        step[yellowway[yw[playerNum]]].innerHTML = "";
        console.log("yellow cuts orange");
        ow[i] = -1;
        ostate[i] = 0;
        player[16 + i].innerHTML = orange;
        pmove = 7;
        diceRotation(4);
        return 1427;
      }
    }
  }
}
function diceRotation(colorNum) {
  if (colorNum == 0) {
    setTimeout(function () {
      if (pmove == 1 || pmove == 6 || pmove == 7) {
        //checks if num is 1/6 and move player
        return 0;
      }
      if (bstate.includes(1) && moves[0] > 0) {
        // move playercoin with moveFunctions
      } else {
        bdice[0].style.display = "none";
        gdice[0].style.display = "";
      }
    }, 800);
  }
  if (colorNum == 1) {
    setTimeout(function () {
      if (pmove == 1 || pmove == 6 || pmove == 7) {
        //checks if num is 1/6 and move player
        return 0;
      }
      if (gstate.includes(1) && moves[1] > 0) {
        // move playercoin with moveFunctions
      } else {
        gdice[0].style.display = "none";
        rdice[0].style.display = "";
      }
    }, 800);
  }
  if (colorNum == 2) {
    setTimeout(function () {
      if (pmove == 1 || pmove == 6 || pmove == 7) {
        //checks if num is 1/6 and move player
        return 0;
      }
      if (rstate.includes(1) && moves[2] > 0) {
        // move playercoin with moveFunctions
      } else {
        rdice[0].style.display = "none";
        odice[0].style.display = "";
      }
    }, 800);
  }
  if (colorNum == 3) {
    setTimeout(function () {
      if (pmove == 1 || pmove == 6 || pmove == 7) {
        //checks if num is 1/6 and move player
        return 0;
      }
      if (ostate.includes(1) && moves[3] > 0) {
        // move playercoin with moveFunctions
      } else {
        odice[0].style.display = "none";
        ydice[0].style.display = "";
      }
    }, 800);
  }
  if (colorNum == 4) {
    setTimeout(function () {
      if (pmove == 1 || pmove == 6 || pmove == 7) {
        //checks if num is 1/6 and move player
        return 0;
      }
      if (ystate.includes(1) && moves[4] > 0) {
        // move playercoin with moveFunctions
      } else {
        ydice[0].style.display = "none";
        bdice[0].style.display = "";
      }
    }, 800);
  }
}

function moveblue(obj, playerNum) {
  if (moves[0] == 0) {
    //checks if dice is rolled or not
    return 0;
  }
  if (bstate[playerNum] == 1) {
    bw[playerNum] += moves[0];

    //killing part
    kill(playerNum, 0);
    moves[0] = 0;
    if (bw[playerNum] > -1) {
      var prevpl = step[blueway[bw[playerNum]]].innerHTML;
    }
    let i;
    for (i = 0; i < step.length; i++) {
      if (bw[playerNum] == i) {
        stepsound.play();
        step[blueway[bw[playerNum]]].innerHTML =
          "<span onclick='moveblue(this," +
          playerNum +
          ")' class='bp material-icons b'>stars</span>" +
          prevpl;
      } else {
        obj.remove();
      }
    }
  } else {
    if (moves[0] == 1) {
      bstate[playerNum] = 1;
      bw[playerNum] += 1;
      inoutsound.play();
      obj.remove();
      var prevpl = step[blueway[bw[playerNum]]].innerHTML;
      step[blueway[bw[playerNum]]].innerHTML =
        "<span onclick='moveblue(this," +
        playerNum +
        ")' class='bp material-icons b'>stars</span>" +
        prevpl;
      console.log(prevpl);
      moves[0] = 0;
    }
  }
  //activeplayer
  diceRotation(0);
}
function movegreen(obj, playerNum) {
  if (moves[1] == 0) {
    //checks if dice is rolled or not
    return 0;
  }
  if (gstate[playerNum] == 1) {
    gw[playerNum] += moves[1];

    //killing part
    kill(playerNum, 1);

    moves[1] = 0;
    if (gw[playerNum] > -1) {
      var prevpl = step[greenway[gw[playerNum]]].innerHTML;
    }
    let i;
    for (i = 0; i < step.length; i++) {
      if (gw[playerNum] == i) {
        stepsound.play();
        step[greenway[gw[playerNum]]].innerHTML =
          "<span onclick='movegreen(this," +
          playerNum +
          ")' class='gp material-icons g'>stars</span>" +
          prevpl;
      } else {
        obj.remove();
      }
    }
  } else {
    if (moves[1] == 1) {
      gstate[playerNum] = 1;
      gw[playerNum] += 1;
      inoutsound.play();
      obj.remove();
      var prevpl = step[greenway[gw[playerNum]]].innerHTML;
      step[greenway[gw[playerNum]]].innerHTML =
        "<span onclick='movegreen(this," +
        playerNum +
        ")' class='gp material-icons g'>stars</span>" +
        prevpl;
      console.log(prevpl);
      moves[1] = 0;
    }
  }
  //activeplayer
  diceRotation(1);
}
function movered(obj, playerNum) {
  if (moves[2] == 0) {
    //checks if dice is rolled or not
    return 0;
  }
  if (rstate[playerNum] == 1) {
    rw[playerNum] += moves[2];

    //killing part
    kill(playerNum, 2);

    moves[2] = 0;
    if (rw[playerNum] > -1) {
      var prevpl = step[redway[rw[playerNum]]].innerHTML;
    }
    let i;
    for (i = 0; i < step.length; i++) {
      if (rw[playerNum] == i) {
        stepsound.play();
        step[redway[rw[playerNum]]].innerHTML =
          "<span onclick ='movered(this," +
          playerNum +
          ")' class=' rp material-icons r'>stars</span>" +
          prevpl;
      } else {
        obj.remove();
      }
    }
  } else {
    if (moves[2] == 1) {
      rstate[playerNum] = 1;
      rw[playerNum] += 1;
      inoutsound.play();
      obj.remove();
      var prevpl = step[redway[rw[playerNum]]].innerHTML;
      step[redway[rw[playerNum]]].innerHTML =
        "<span onclick='movered(this," +
        playerNum +
        ")' class='rp material-icons r'>stars</span>" +
        prevpl;
      console.log(prevpl);
      moves[2] = 0;
    }
  }
  //activeplayer
  diceRotation(2);
}
function moveorange(obj, playerNum) {
  if (moves[3] == 0) {
    //checks if dice is rolled or not
    return 0;
  }
  if (ostate[playerNum] == 1) {
    ow[playerNum] += moves[3];

    //killing part
    kill(playerNum, 3);
    moves[3] = 0;
    if (ow[playerNum] > -1) {
      var prevpl = step[orangeway[ow[playerNum]]].innerHTML;
    }
    let i;
    for (i = 0; i < step.length; i++) {
      if (ow[playerNum] == i) {
        stepsound.play();
        step[orangeway[ow[playerNum]]].innerHTML =
          "<span onclick ='moveorange(this," +
          playerNum +
          ")' class=' op material-icons o'>stars</span>" +
          prevpl;
      } else {
        obj.remove();
      }
    }
  } else {
    if (moves[3] == 1) {
      ostate[playerNum] = 1;
      ow[playerNum] += 1;
      inoutsound.play();
      obj.remove();
      var prevpl = step[orangeway[ow[playerNum]]].innerHTML;
      step[orangeway[ow[playerNum]]].innerHTML =
        "<span onclick='moveorange(this," +
        playerNum +
        ")' class='op material-icons o'>stars</span>" +
        prevpl;
      moves[3] = 0;
    }
  }
  // changing activeplayer
  diceRotation(3);
}
function moveyellow(obj, playerNum) {
  if (moves[4] == 0) {
    //checks if dice is rolled or not
    return 0;
  }
  if (ystate[playerNum] == 1) {
    yw[playerNum] += moves[4];

    //killing part
    kill(playerNum, 4);
    moves[4] = 0;
    if (yw[playerNum] > -1) {
      var prevpl = step[yellowway[yw[playerNum]]].innerHTML;
    }
    let i;
    for (i = 0; i < step.length; i++) {
      if (yw[playerNum] == i) {
        stepsound.play();
        step[yellowway[yw[playerNum]]].innerHTML =
          "<span onclick ='moveyellow(this," +
          playerNum +
          ")' class=' yp material-icons y'>stars</span>" +
          prevpl;
      } else {
        obj.remove();
      }
    }
  } else {
    if (moves[4] == 1) {
      ystate[playerNum] = 1;
      yw[playerNum] += 1;
      inoutsound.play();
      obj.remove();
      var prevpl = step[yellowway[yw[playerNum]]].innerHTML;
      step[yellowway[yw[playerNum]]].innerHTML =
        "<span onclick='moveyellow(this," +
        playerNum +
        ")' class='yp material-icons y'>stars</span>" +
        prevpl;
      console.log(prevpl);
      moves[4] = 0;
    }
  }
  // changing activeplayer
  diceRotation(4);
}
