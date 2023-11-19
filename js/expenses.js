const monthlyExpenseForm = document.getElementById("monthly-expense-form");
const monthlyExpenseTable = document.getElementById("monthly-expense-table");
const oneTimeExpenseForm = document.getElementById("one-time-expense-form");
const oneTimeExpenseTable = document.getElementById("one-time-expense-table");

let monthlyExpenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || [];
let oneTimeExpenses = JSON.parse(localStorage.getItem("oneTimeExpenses")) || [];
let  LocalCategory = JSON.parse(localStorage.getItem("trasactionData")) || [];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function addRowToTable(table, rowData) {
  const row = table.insertRow(-1);
  row.insertCell().innerText = rowData.name;
  row.insertCell().innerText = formatCurrency(parseFloat(rowData.amount));
  row.insertCell().innerText = rowData.type;
  row.insertCell().innerText = rowData.pay;
  row.insertCell().innerText = rowData.naturalaze;
  row.insertCell().innerText = rowData.date;

  const colors = {
    "🍔 Comida": "#568C76",
    "🍎 Fruta": "#568C76",
    "🥤 Bebida": "#568C76",
    "🍰 Postre": "#568C76",
    "🥦 Verduras": "#568C76",
    "☕ Café": "#568C76",
    "🚗 Coche": "#2C6DAF",
    "🚌 Bus": "#2C6DAF",
    "✈️ Avión": "#2C6DAF",
    "🎾 Tenis": "#3D6577",
    "👕 Ropa": "#3D6577",
    "💄 Cosméticos": "#3D6577",
    "🎮 Juegos": "#3D6577",
    "⚽ Deportes": "#3D6577",
    "💊 Medicinas": "#27357F",
    "🎉 Fiesta": "#711A83",
    "🛠️ Herramientas": "#938835",
    "😺 Gato": "#864E4E",
    "🐶 Perro": "#864E4E",
    "📒 libretas": "#0B5345",
    "📚 libros": "#0B5345",
    "🖊️ lapicero": "#0B5345",
    
  };
  

  row.cells[2].style.backgroundColor = colors[rowData.type];

  

  const deleteButton = row
    .insertCell()
    .appendChild(document.createElement("button"));
  deleteButton.innerText = "X";
  deleteButton.classList.add("delete-button"); // Añade la clase delete-button
  deleteButton.addEventListener("click", () => {
    row.remove();
    if (table === monthlyExpenseTable) {
      monthlyExpenses = monthlyExpenses.filter(
        (expense) => expense.id !== rowData.id
      );
      localStorage.setItem("monthlyExpenses", JSON.stringify(monthlyExpenses));
    } else {
      oneTimeExpenses = oneTimeExpenses.filter(
        (expense) => expense.id !== rowData.id
      );
      localStorage.setItem("oneTimeExpenses", JSON.stringify(oneTimeExpenses));
    }
  });
}

monthlyExpenses.forEach((expense) =>
  addRowToTable(monthlyExpenseTable, expense)
);
oneTimeExpenses.forEach((expense) =>
  addRowToTable(oneTimeExpenseTable, expense)
);

document.getElementById("ad-button").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("monthly-expense-name").value;
  const amount = document.getElementById("monthly-expense").value;
  const type = document.getElementById("monthly-expense-type").value;
  const pay = document.getElementById("monthly-pay-type").value;
  const naturalaze = document.getElementById("monthly-naturalaze").value;
  const date = document.getElementById("monthly-expense-date").value;

  if (
    name === "" ||
    amount === "" ||
    type === "" ||
    pay === "" ||
    naturalaze === "" ||
    date === ""
  ) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const expenseData = {
    id: Date.now(),
    name,
    amount,
    type,
    pay,
    naturalaze,
    date,
  };

  monthlyExpenses.push(expenseData);
  localStorage.setItem("monthlyExpenses", JSON.stringify(monthlyExpenses));

  document.dispatchEvent(new CustomEvent("monthly-expense-updated"));

  addRowToTable(monthlyExpenseTable, expenseData);

  document.getElementById("monthly-expense-name").value = "";
  document.getElementById("monthly-expense").value = "";
});

document.getElementById("one-time").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("one-time-expense-name").value;
  const amount = document.getElementById("one-time-expense").value;
  const type = document.getElementById("one-time-expense-type").value;
  const pay = document.getElementById("pay-type").value;
  const naturalaze = document.getElementById("one-time-naturalaze").value;
  const date = document.getElementById("one-time-expense-date").value;

  if (
    name === "" ||
    amount === "" ||
    type === "" ||
    pay === "" ||
    naturalaze === "" ||
    date === ""
  ) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const expenseData = {
    id: Date.now(),
    name,
    amount,
    type,
    pay,
    naturalaze,
    date,
  };

  oneTimeExpenses.push(expenseData);
  localStorage.setItem("oneTimeExpenses", JSON.stringify(oneTimeExpenses));

  addRowToTable(oneTimeExpenseTable, expenseData);

  document.getElementById("one-time-expense-name").value = "";
  document.getElementById("one-time-expense").value = "";
});

const expenseTotals = {};

[...monthlyExpenses, ...oneTimeExpenses].forEach((expense) => {
  if (expenseTotals[expense.type]) {
    expenseTotals[expense.type] += parseFloat(expense.amount);
  } else {
    expenseTotals[expense.type] = parseFloat(expense.amount);
  }
});

const ctx = document.getElementById("expenseChart").getContext("2d");

const chartData = {
  labels: Object.keys(expenseTotals),
  datasets: [
    {
      data: Object.values(expenseTotals),
      backgroundColor: [
        "#568C76", // Comida
        "#2C6DAF", // Coche
        "#3D6577", // Tenis
        "#3D6577", //
        "#27357F", // Medicina
        "#711A83", // fiesta
        "#938835", // herramienta
        "#864E4E",

        // Agrega más colores aquí para cada categoría
      ],
    },
  ],
};

new Chart(ctx, {
  type: "doughnut",
  data: chartData,
  options: {
    responsive: false,
    maintainAspectRatio: false,
  },
});

// Obtén la fecha actual en formato 'YYYY-MM-DD'
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
const currentYear = currentDate.getFullYear();

const formattedDate = currentYear + "-" + currentMonth + "-" + currentDay;

// Configura los campos de fecha con la fecha actual
document.getElementById("monthly-expense-date").value = formattedDate;
document.getElementById("one-time-expense-date").value = formattedDate;

function showInput() {
  document.getElementById("input").style.display = "block";
}
function hideInput() {
  document.getElementById("input").style.display = "none";
}



function addCategoryToInput(name) {
  const categorySelectRef = document.getElementById("monthly-expense-type");

  const newCategory = document.createElement("option");
  newCategory.value = name;
  newCategory.textContent = name;
  newCategory .className = 'la-clase';
  categorySelectRef.appendChild(newCategory);
}

function initCategories() {

  const localCategories = JSON.parse(localStorage.getItem("transactionData"));
  for (const category of localCategories) {
    addCategoryToInput(category.categoryName);
  }
}

initCategories();

addCategoryToInput("Otros");



///hace que un valor menenos de 0 sea 0

const monthlyExpenseInput = document.querySelector("#monthly-expense");
const oneTimeExpenseInput = document.querySelector("#one-time-expense");

monthlyExpenseInput.addEventListener("input", (event) => {
  const value = event.target.value;

  if (value < 0) {
    alert("Por favor, coloca números positivos");
    event.target.value = 0;
  }
});

oneTimeExpenseInput.addEventListener("input", (event) => {
  const value = event.target.value;

  if (value < 0) {
    alert("Por favor, coloca números positivos");
    event.target.value = 0;
  }
});
