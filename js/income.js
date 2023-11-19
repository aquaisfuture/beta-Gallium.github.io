const monthlyIncomeForm = document.getElementById("monthly-income-form");
const monthlyIncomeTable = document.getElementById("monthly-income-table");
const oneTimeIncomeForm = document.getElementById("one-time-income-form");
const oneTimeIncomeTable = document.getElementById("one-time-income-table");

let monthlyIncomes = JSON.parse(localStorage.getItem("monthlyIncomes")) || [];
let oneTimeIncomes = JSON.parse(localStorage.getItem("oneTimeIncomes")) || [];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function addRowToTable(table, rowData) {
  const row = table.insertRow(-1);
  row.insertCell(0).innerText = rowData.name;
  row.insertCell(1).innerText = formatCurrency(parseFloat(rowData.amount));
  const deleteButton = row.insertCell(2).appendChild(document.createElement("button"));
  deleteButton.classList.add("delete-button"); // Añade la clase delete-button
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => {
    row.remove();
    if (table === monthlyIncomeTable) {
      monthlyIncomes = monthlyIncomes.filter((income) => income.id !== rowData.id);
      localStorage.setItem("monthlyIncomes", JSON.stringify(monthlyIncomes));
    } else {
      oneTimeIncomes = oneTimeIncomes.filter((income) => income.id !== rowData.id);
      localStorage.setItem("oneTimeIncomes", JSON.stringify(oneTimeIncomes));
    }s

    const incomeUpdatedEvent = new CustomEvent("income-updated");
    document.dispatchEvent(incomeUpdatedEvent);
  });
}

monthlyIncomes.forEach((income) => addRowToTable(monthlyIncomeTable, income));
oneTimeIncomes.forEach((income) => addRowToTable(oneTimeIncomeTable, income));

monthlyIncomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("monthly-income-name").value;
  const amount = document.getElementById("monthly-income").value;

  if (name === "" || amount === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const incomeData = {
    id: Date.now(),
    name,
    amount,
  };

  monthlyIncomes.push(incomeData);
  localStorage.setItem("monthlyIncomes", JSON.stringify(monthlyIncomes));

  addRowToTable(monthlyIncomeTable, incomeData);

  document.getElementById("monthly-income-name").value = "";
  document.getElementById("monthly-income").value = "";

  const incomeUpdatedEvent = new CustomEvent("income-updated");
  document.dispatchEvent(incomeUpdatedEvent);
});

document.getElementById("one-time").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("one-time-income-name").value;
  const amount = document.getElementById("one-time-income").value;

  if (name === "" || amount === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const incomeData = {
    id: Date.now(),
    name,
    amount,
  };

  oneTimeIncomes.push(incomeData);
  localStorage.setItem("oneTimeIncomes", JSON.stringify(oneTimeIncomes));

  addRowToTable(oneTimeIncomeTable, incomeData);

  document.getElementById("one-time-income-name").value = "";
  document.getElementById("one-time-income").value = "";

  const incomeUpdatedEvent = new CustomEvent("income-updated");
  document.dispatchEvent(incomeUpdatedEvent);
});

// Agrega un event listener para el botón de agregar ingreso mensual
document.getElementById("ad-button").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("monthly-income-name").value;
  const amount = document.getElementById("monthly-income").value;

  if (name === "" || amount === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const incomeData = {
    id: Date.now(),
    name,
    amount,
  };

  monthlyIncomes.push(incomeData);
  localStorage.setItem("monthlyIncomes", JSON.stringify(monthlyIncomes));

  addRowToTable(monthlyIncomeTable, incomeData);

  document.getElementById("monthly-income-name").value = "";
  document.getElementById("monthly-income").value = "";

  const incomeUpdatedEvent = new CustomEvent("income-updated");
  document.dispatchEvent(incomeUpdatedEvent);
});
