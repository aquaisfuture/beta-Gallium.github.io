const recurringDebtForm = document.getElementById("recurring-debt-form");
const recurringDebtTable = document.getElementById("recurring-debt-table");
const oneTimeDebtForm = document.getElementById("one-time-debt-form");
const oneTimeDebtTable = document.getElementById("one-time-debt-table");

let recurringDebts = JSON.parse(localStorage.getItem("recurringDebts")) || [];
let oneTimeDebts = JSON.parse(localStorage.getItem("oneTimeDebts")) || [];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function addRowToTable(table, rowData) {
  const row = table.insertRow(-1);
  row.insertCell().innerText = rowData.name;
  row.insertCell().innerText = formatCurrency(rowData.amount);

  if (table === recurringDebtTable) {
    row.insertCell().innerText = rowData.paymentDate;
  }

 // Suponiendo que 'row' es la fila en la que deseas agregar el select
const selectCell = row.insertCell();
const selectElement = document.createElement("select");
selectElement.id = "estadoPago";

// Opción "Pagado"
const pagadoOption = document.createElement("option");
pagadoOption.value = "pagado";
pagadoOption.innerText = "Pagado";
pagadoOption.style.color = "green";
selectElement.appendChild(pagadoOption);

// Opción "Por pagar"
const porPagarOption = document.createElement("option");
porPagarOption.value = "por_pagar";
porPagarOption.innerText = "Por pagar";
porPagarOption.style.color = "red";
selectElement.appendChild(porPagarOption);

// Agregar el select a la celda de la fila
selectCell.appendChild(selectElement);

  const deleteButton = row.insertCell().appendChild(document.createElement("button"));
  deleteButton.innerText = "X";
  deleteButton.classList.add("delete-button"); // Añade la clase delete-button
  deleteButton.addEventListener("click", () => {
    row.remove();
    if (table === recurringDebtTable) {
      recurringDebts = recurringDebts.filter((debt) => debt.id !== rowData.id);
      localStorage.setItem("recurringDebts", JSON.stringify(recurringDebts));
    } else {
      oneTimeDebts = oneTimeDebts.filter((debt) => debt.id !== rowData.id);
      localStorage.setItem("oneTimeDebts", JSON.stringify(oneTimeDebts));
    }
  });
}

recurringDebts.forEach((debt) => addRowToTable(recurringDebtTable, debt));
oneTimeDebts.forEach((debt) => addRowToTable(oneTimeDebtTable, debt));

document.getElementById("ad-button").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("recurring-debt-name").value;
  const amount = document.getElementById("recurring-debt").value;
  const paymentDate = document.getElementById("recurring-debt-payment-date").value;

  if (name === "" || amount === "" || paymentDate === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const debtData = {
    id: Date.now(),
    name,
    amount,
    paymentDate,
  };

  recurringDebts.push(debtData);
  localStorage.setItem("recurringDebts", JSON.stringify(recurringDebts));

  addRowToTable(recurringDebtTable, debtData);

  document.getElementById("recurring-debt-name").value = "";
  document.getElementById("recurring-debt").value = "";
  document.getElementById("recurring-debt-payment-date").value = "";
});
document.getElementById("one-time-ad-button").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("one-time-debt-name").value;
  const amount = document.getElementById("one-time-debt").value;

  if (name === "" || amount === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const debtData = {
    id: Date.now(),
    name,
    amount,
  };

  oneTimeDebts.push(debtData);
  localStorage.setItem("oneTimeDebts", JSON.stringify(oneTimeDebts));

  addRowToTable(oneTimeDebtTable, debtData);

  document.getElementById("one-time-debt-name").value = "";
  document.getElementById("one-time-debt").value = "";
});

 
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar-time");
    var width = 50;
    var id = setInterval(frame, 50);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
}

document.getElementById("dateInput").addEventListener("focus", function() {
  // Aquí puedes agregar lógica para mostrar un selector de fechas al hacer clic en el campo de entrada
});

