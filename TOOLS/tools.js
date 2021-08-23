"use strict";
const toolSelect = document.querySelectorAll(".btn");
///////here tBtns includes key name which is present in classlist of tools we are using and values which is classlist of selection button///////
const tBtns = {
  calculator: "btn--1",
  primeChecker: "btn--2",
  LengthAndVolume: "btn--3",
  numConversion: "btn--4",
};

for (let tools of toolSelect) {
  tools.addEventListener("click", function () {
    ////here first we are going to check whether word "hidden" is present or not in every dic class of tools if not then add one//////////
    for (let btnKeys of Object.keys(tBtns)) {
      let checkClass = document.getElementsByClassName(`${btnKeys}`)[0];
      if (checkClass.classList.contains("hidden")) {
        continue;
      } else {
        checkClass.classList.add("hidden");
      }
    }
    //////then when click command is received word "hidden" is removed;
    let tBtn = tools.getAttribute("class");
    for (let [key, value] of Object.entries(tBtns)) {
      if (tBtn.includes(value)) {
        let unHide = document.getElementsByClassName(`${key}`)[0];
        unHide.classList.remove("hidden");
      }
    }
  });
}
/////////////////////////////////////////////////////////// NUMBER CONVERSION/////////////////////////////////////////////////////
const optSelect = document.getElementById("NC-options");
const convertInto = document.getElementById("convertInto");
const ncBtn = document.querySelector(".NC-btn");
const ncBox1 = document.querySelector(".box-1");
const ncBox2 = document.querySelector(".box-2");
ncBtn.addEventListener("click", function () {
  const selectedItem = optSelect.options[optSelect.selectedIndex].text;
  if (selectedItem === "Binary") {
    convertInto.textContent = "Decimal value is";
    const biNum = ncBox1.value.split("").reverse();
    let sum = 0;
    for (let [key, value] of biNum.entries()) {
      sum = sum + 2 ** key * value;
    }
    ncBox2.textContent = sum;
  } else {
    convertInto.textContent = "Binary value is";
    let deNum = Number(ncBox1.value);
    let arr = [];
    while (deNum !== 0) {
      arr.push(Math.trunc(deNum % 2));
      deNum = Math.trunc(deNum / 2);
    }
    ncBox2.textContent = `${arr.reverse().join("")}`.padStart(4, 0);
  }
});
///////////////////////////////////////////////////////////PRIME NUMBER CHECKER////////////////////////////////////////////////////////
const textbox = document.getElementsByClassName("textbox");
const pncBtn = document.getElementsByClassName("PNC-btn");
const ansDisplay1 = document.getElementById("ansDisplay1");
pncBtn[0].addEventListener("click", function () {
  const val = Number(textbox[0].value);
  function operation(value) {
    for (let i = 2; i <= value + 10; i++) {
      if (value % i === 0) {
        if (value / i === 1) {
          ansDisplay1.textContent = "Yes, it is a Prime Number";
        } else {
          ansDisplay1.textContent = "No, it is not a Prime Number";
          break;
        }
      } else {
        continue;
      }
    }
  }
  val ? operation(val) : (ansDisplay1.textContent = "Please enter a Number");
});
////////////////////////////////////////////////////////LENGTH AND VOLUME CONVERSION///////////////////////////////////////////////////
const select = document.getElementsByClassName("select")[0];
///we took [0] because we get html collection and the element in 0th position
const lenbtn = document.getElementById("len");
const volbtn = document.getElementById("vol");
const checker = document.getElementsByClassName("checker")[0];
const unit = document.getElementsByClassName("unit");
const lvEnter = document.getElementsByClassName("enter")[0];
const backBt = document.getElementsByClassName("back")[0];
const unitData = {
  lenUnit: ["cm", "km", "m"],
  volUnit: ["L", "ml", NaN],
};
//////this function will insert html data inside the parent name "checker"///////////
const inputs = function (type) {
  ////for input 1////
  const input1 = document.createElement("div");
  input1.classList.add("input-1");
  input1.innerHTML = ` <input class="textbox1" id="get" type="text" placeholder="0" required />
   <select class="unit" id="length-1">
     <option value="${type[0]}">${type[0]}</option>
     <option value="${type[1]}">${type[1]}</option>
     <option value="${type[2]}">${type[2]}</option>
   </select>`;
  /////for input 2/////
  const input2 = document.createElement("div");
  input2.classList.add("input-2");
  input2.innerHTML = ` <input class="textbox1" id="put" type="text" placeholder="0" disabled/>
   <select class="unit" id="length-2">
     <option value="${type[0]}">${type[0]}</option>
     <option value="${type[1]}">${type[1]}</option>
     <option value="${type[2]}">${type[2]}</option>
   </select>`;
  ///this will insert element inside parent name 'checker'//////
  checker.prepend(input2);
  checker.prepend(input1);
  ////this will go back to the selection page/////////
  backBt.addEventListener("click", function () {
    input1.remove();
    input2.remove();
    select.classList.remove("hidden");
    checker.classList.add("hidden");
  });
};
lenbtn.addEventListener("click", function () {
  select.classList.toggle("hidden");
  checker.classList.toggle("hidden");
  const [len1] = [unitData.lenUnit];
  inputs(len1);
});
volbtn.addEventListener("click", function () {
  select.classList.toggle("hidden");
  checker.classList.toggle("hidden");
  const [vol1] = [unitData.volUnit];
  inputs(vol1);
});

lvEnter.addEventListener("click", function () {
  let ut1 = unit[0].options[unit[0].selectedIndex].text;
  let ut2 = unit[1].options[unit[1].selectedIndex].text;
  const get = document.getElementById("get");
  const put = document.getElementById("put");
  let lengdata = 0;
  let voldata = 0;
  ///////////////////////FOR LENGTH ///////////////////////////
  if (ut1 === "km" || ut1 === "cm" || ut1 === "ml") {
    const data1 = {
      cm: 1,
      m: 100,
      km: 100000,
    };
    if (
      (ut1 === "cm" && ut2 === "cm") ||
      (ut1 === "m" && ut2 === "cm") ||
      (ut1 === "km" && ut2 === "cm")
    ) {
      lengdata = get.value * (data1[ut1] * data1[ut2]);
      put.value = `${lengdata}`;
    } else if (ut1 === ut2) {
      put.value = get.value;
    } else {
      lengdata = get.value * (data1[ut1] / data1[ut2]);
      put.value = `${lengdata}`;
    }
  } else {
    const data2 = {
      ml: 1,
      L: 1000,
    };
    if (ut1 === "L" && ut2 === "ml") {
      voldata = get.value * (data2[ut1] * data2[ut2]);
      put.value = `${voldata}`;
    } else if (ut1 === ut2) {
      put.value = get.value;
    } else {
      voldata = get.value * (data2[ut1] / data2[ut2]);
      put.value = `${voldata}`;
    }
  }
});
/////////////////////////taking inputs from buttons//////////////
const nBtns = document.getElementsByClassName("Nbtns");

for (const btn of nBtns) {
  btn.addEventListener("click", function () {
    let arr1 = [];
    // let temp = "";
    const get = document.getElementById("get");
    arr1.push(btn.textContent);
    let temp = get.value;
    // console.log(arr1[0]);
    get.value = Number(temp + arr1[0]);
  });
}
///////////////////////deleting number/////////////////////////////
const delete1 = document.getElementsByClassName("delete1")[0];
delete1.addEventListener("click", function () {
  const get = document.getElementById("get");
  let data3 = get.value.split("");
  data3.splice(-1);
  get.value = Number(data3.join(""));
});

//////////////////////////////////////////////////////CALCULATOR PART////////////////////////////////////////////////////////////////
const calcDisplay = document.getElementsByClassName("calcDisplay")[0];
const numBtn = document.getElementsByClassName("calcbtn");
const oprBtns = document.getElementsByClassName("oprbtn");
const delete2 = document.getElementsByClassName("delete")[0];
let tempResult1 = [];
let tempResult2 = [];
let result = 0;

/////////////////////////////this will take the input with the help of button's textcontent/////////////////////////////
for (let btn of numBtn) {
  btn.addEventListener("click", function () {
    tempResult1.push(btn.textContent);
    calcDisplay.textContent = `${tempResult1.join("")}`;
    console.log(tempResult1);
  });
}

//////////////////this will delete the last element from tempResult1 which holds number digit by digit///////////////////////////
delete2.addEventListener("click", function () {
  if (tempResult1.length === 1) {
    calcDisplay.textContent = "0";
    tempResult1 = ["0"];
  } else {
    tempResult1.pop();
    calcDisplay.textContent = `${tempResult1.join("")}`;
    console.log(tempResult1);
  }
});

//////////////////////this will manage every operation in calculator////////////////////////////////////////

for (let oBtn of oprBtns) {
  const mainPro = function (res) {
    console.log(res);
    tempResult2.length = 0;
    tempResult1.length = 0;
    tempResult2.push(`${res}`);
    tempResult2.push(oBtn.textContent);
    console.log(tempResult2);
    calcDisplay.textContent = `${tempResult2.join("")}`;
  };
  ////////////////////////operation held on basis of button's textcontent which was clicked//////////////////////
  oBtn.addEventListener("click", function () {
    //////this will take all the data from tempResult1 and put together in tempResult2 making it as a complete number//////////
    tempResult2.push(tempResult1.join(""));

    //////this will look for sign we need ////////////////////
    if (oBtn.textContent !== "=" && oBtn.textContent !== "clr") {
      ////////this will allow only 3 value inside tempresult2 including sign///////
      if (tempResult2.length < 3) {
        tempResult2.push(oBtn.textContent);
        tempResult1.length = 0;
        calcDisplay.textContent = `${tempResult2.join("")}`;
      } else {
        if (tempResult2[1] === "+") {
          result = Number(tempResult2[0]) + Number(tempResult2[2]);
          mainPro(result);
        } else if (tempResult2[1] === "-") {
          result = Number(tempResult2[0]) - Number(tempResult2[2]);
          mainPro(result);
        } else if (tempResult2[1] === "*") {
          result = Number(tempResult2[0]) * Number(tempResult2[2]);
          mainPro(result);
        } else if (tempResult2[1] === "÷") {
          result = Number(tempResult2[0]) / Number(tempResult2[2]);
          mainPro(result);
        }
      }
    } else if (oBtn.textContent === "=") {
      let tempdata3 = [...tempResult2];
      if (tempdata3[1] === "+") {
        result = Number(tempdata3[0]) + Number(tempdata3[2]);
      } else if (tempdata3[1] === "-") {
        result = Number(tempdata3[0]) - Number(tempdata3[2]);
      } else if (tempdata3[1] === "*") {
        result = Number(tempdata3[0]) * Number(tempdata3[2]);
      } else if (tempdata3[1] === "÷") {
        result = Number(tempdata3[0]) / Number(tempdata3[2]);
      }
      calcDisplay.textContent = `${result}`;
      tempResult1 = [];
      tempResult2 = [];
    } else {
      ///////////this will work when clear button is clicked////////
      tempResult1 = [];
      tempResult2 = [];
      calcDisplay.textContent = "0";
    }
  });
}
