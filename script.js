// ref. element in index.html
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dataTransaction = [
  { id: 1, text: "Snack", amount: -50 },
  { id: 2, text: "Food", amount: -2300 },
  { id: 3, text: "Room", amount: -6500 },
  { id: 1, text: "Salary", amount: +35500 },
];

// let transactions = dataTransaction;
let transactions = [];

init = () => {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
};

addDataToList = (transactions) => {
  // <li class='minus'>ค่าซ่อมรถ <span>- 4000</span><button class='delete-btn'>X</button></li>;
  const symbol = transactions.amount < 0 ? "-" : "+";
  const status = transactions.amount < 0 ? "minus" : "plus";
  const item = document.createElement("li");
  const result = formatNumber(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol} ${result}</span><button class="delete-btn" onclick="removeTransaction(${transactions.id})">X</button>`;
  list.appendChild(item);
};

formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

autoID = () => {
  return Math.floor(Math.random() * 1000000);
};

calculateMoney = () => {
  const amounts = transactions.map((transactions) => transactions.amount);

  // คำนวณยอดคงเหลือ
  const total = amounts
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  // คำนวณรายรับ
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  // คำนวณรายจ่าย
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);

  balance.innerText = formatNumber(total);
  money_plus.innerText = formatNumber(income);
  money_minus.innerText = formatNumber(expense);
};

addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please fill data");
  } else {
    const data = {
      id: autoID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
};

removeTransaction = (id) => {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  init();
};

form.addEventListener("submit", addTransaction);
init();
// addDataToList(transaction);
