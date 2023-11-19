/*tabla 12 y el grafico*/
const expensesCells = Array.from({ length: 12 }, (_, i) => document.getElementById(`expenses-month-${i + 1}`));
const incomesCells = Array.from({ length: 12 }, (_, i) => document.getElementById(`income-month-${i + 1}`));
const balanceCells = Array.from({ length: 12 }, (_, i) => document.getElementById(`balance-month-${i + 1}`));

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function updateExpensesCells() {
  let monthlyExpenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || [];

  let totalExpense = monthlyExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  expensesCells.forEach(cell => {
    cell.innerText = formatCurrency(totalExpense);
  });
}

function updateIncomeCells() {
  let monthlyIncomes = JSON.parse(localStorage.getItem("monthlyIncomes")) || [];

  let totalIncome = monthlyIncomes.reduce((total, income) => total + parseFloat(income.amount), 0);

  incomesCells.forEach(cell => {
    cell.innerText = formatCurrency(totalIncome);
  });
}

function getLiquidAssetsTotal() {
  const liquidAssets = JSON.parse(localStorage.getItem("liquidAsset")) || [];

  return liquidAssets.reduce((total, asset) => total + parseFloat(asset.amount), 0);
}

function updateBalanceCells() {
  const totalIncome = parseFloat(incomesCells[0].innerText.replace(/[^0-9.-]+/g, ""));
  const totalExpense = parseFloat(expensesCells[0].innerText.replace(/[^0-9.-]+/g, ""));

  let currentLiquidAssets = getLiquidAssetsTotal();

  for (let i = 0; i < balanceCells.length; i++) {
    const balance = (totalIncome - totalExpense) + currentLiquidAssets;
    balanceCells[i].innerText = formatCurrency(balance);
    currentLiquidAssets = balance;
  }
}

function createLineChart(incomes, expenses, balances) {
  const ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 12 }, (_, i) => `Mes ${i + 1}`),
      datasets: [
        {
          label: 'Ingresos',
          data: incomes,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2
        },
        {
          label: 'Gastos',
          data: expenses,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2
        },
        {
          label: 'Balances',
          data: balances,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateAllCells() {
  updateExpensesCells();
  updateIncomeCells();
  updateBalanceCells();

  const incomes = incomesCells.map(cell => parseFloat(cell.innerText.replace(/[^0-9.-]+/g, "")));
  const expenses = expensesCells.map(cell => parseFloat(cell.innerText.replace(/[^0-9.-]+/g, "")));
  const balances = balanceCells.map(cell => parseFloat(cell.innerText.replace(/[^0-9.-]+/g, "")));

  createLineChart(incomes, expenses, balances);
}

// Escuchar el evento personalizado "monthly-expense-updated"
document.addEventListener("monthly-expense-updated", updateAllCells);

// Escuchar el evento personalizado "monthly-income-updated"
document.addEventListener("monthly-income-updated", updateAllCells);

// Escuchar el evento personalizado "liquid-assets-updated"
document.addEventListener("liquid-assets-updated", updateAllCells);

// Actualizar todas las celdas al cargar la página
updateAllCells();







const liquidAssetsForm = document.getElementById("liquid-assets-form");
const liquidAssetsTable = document.getElementById("liquid-assets-table");
const realEstateForm = document.getElementById("real-estate-form");
const realEstateTable = document.getElementById("real-estate-table");
const personalPropertyForm = document.getElementById("personal-property-form");
const personalPropertyTable = document.getElementById("personal-property-table");
const investmentsForm = document.getElementById("investments-form");
const investmentsTable = document.getElementById("investments-table");

const monthlyExpenseForm = document.getElementById("monthly-expense-form");
const monthlyExpenseTable = document.getElementById("monthly-expense-table");
const oneTimeExpenseForm = document.getElementById("one-time-expense-form");
const oneTimeExpenseTable = document.getElementById("one-time-expense-table");

const recurringDebtForm = document.getElementById("recurring-debt-form");
const recurringDebtTable = document.getElementById("recurring-debt-table");
const oneTimeDebtForm = document.getElementById("one-time-debt-form");
const oneTimeDebtTable = document.getElementById("one-time-debt-table");

const monthlyIncomeForm = document.getElementById("monthly-income-form");
const monthlyIncomeTable = document.getElementById("monthly-income-table");
const oneTimeIncomeForm = document.getElementById("one-time-income-form");
const oneTimeIncomeTable = document.getElementById("one-time-income-table");

let liquidAssets = JSON.parse(localStorage.getItem("liquidAssets")) || [];
let realEstate = JSON.parse(localStorage.getItem("realState")) || [];
let personalProperty = JSON.parse(localStorage.getItem("personalAssets")) || [];
let investments = JSON.parse(localStorage.getItem("investments")) || [];
let monthlyExpenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || [];
let oneTimeExpenses = JSON.parse(localStorage.getItem("oneTimeExpenses")) || [];
let recurringDebts = JSON.parse(localStorage.getItem("recurringDebts")) || [];
let oneTimeDebts = JSON.parse(localStorage.getItem("oneTimeDebts")) || [];
let monthlyIncomes = JSON.parse(localStorage.getItem("monthlyIncomes")) || [];
let oneTimeIncomes = JSON.parse(localStorage.getItem("oneTimeIncomes")) || [];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function updateOverviewTable() {
  const totalLiquidAssets = liquidAssets.reduce((total, asset) => total + parseFloat(asset.value), 0);
  const totalRealEstate = realEstate.reduce((total, asset) => total + parseFloat(asset.value), 0);
  const totalPersonalProperty = personalProperty.reduce((total, asset) => total + parseFloat(asset.value), 0);
  const totalInvestments = investments.reduce((total, asset) => total + parseFloat(asset.value), 0);
  
  const totalAssets = totalLiquidAssets + totalRealEstate + totalPersonalProperty + totalInvestments;
  
  const totalRecurringDebts = recurringDebts.reduce((total, debt) => total + parseFloat(debt.amount), 0);
  const totalOneTimeDebts = oneTimeDebts.reduce((total, debt) => total + parseFloat(debt.amount), 0);
  const totalDebts = totalRecurringDebts + totalOneTimeDebts;

  const totalEquity = totalAssets - totalDebts;

  document.getElementById("total-liquid-assets").innerText = formatCurrency(totalLiquidAssets);
  document.getElementById("total-assets").innerText = formatCurrency(totalAssets);
  document.getElementById("total-debts").innerText = formatCurrency(totalDebts);
  document.getElementById("total-equity").innerText = formatCurrency(totalEquity);
}

updateOverviewTable();


function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}


/*! esta es la parte del balance*/
function updateBalances() {
  const monthlyIncomes = JSON.parse(localStorage.getItem("monthlyIncomes")) || [];
  const oneTimeIncomes = JSON.parse(localStorage.getItem("oneTimeIncomes")) || [];
  const monthlyExpenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || [];
  const oneTimeExpenses = JSON.parse(localStorage.getItem("oneTimeExpenses")) || [];

  const sum = (array) => array.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  
  const totalMonthlyIncome = sum(monthlyIncomes);
  const totalMonthlyExpenses = sum(monthlyExpenses);
  const totalOneTimeIncome = sum(oneTimeIncomes);
  const totalOneTimeExpenses = sum(oneTimeExpenses);

  const monthlyBalance = totalMonthlyIncome - totalMonthlyExpenses;
  const annualIncome = (totalMonthlyIncome * 12) + totalOneTimeIncome;
  const annualExpenses = (totalMonthlyExpenses * 12) + totalOneTimeExpenses;
  const annualBalance = annualIncome - annualExpenses;

  document.getElementById("monthly-income").innerText = formatCurrency(totalMonthlyIncome);
  document.getElementById("monthly-expenses").innerText = formatCurrency(totalMonthlyExpenses);
  document.getElementById("monthly-balance").innerText = formatCurrency(monthlyBalance);
  document.getElementById("annual-income").innerText = formatCurrency(annualIncome);
  document.getElementById("annual-expenses").innerText = formatCurrency(annualExpenses);
  document.getElementById("annual-balance").innerText = formatCurrency(annualBalance);
}

updateBalances();


let originalCellValues = {};

const toggleButton = document.getElementById('toggle-numbers');
const toggleIcon = document.getElementById('toggle-icon');

toggleButton.addEventListener('click', () => {
  toggleNumbers();
  if (toggleIcon.classList.contains('fa-eye')) {
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
});



// Extendiendo las celdas a ocultar
const overviewCells = [
  'total-liquid-assets', 'total-assets', 'total-debts', 'total-equity',
  'monthly-income', 'monthly-expenses', 'monthly-balance',
  'annual-income', 'annual-expenses', 'annual-balance'
].map(id => document.getElementById(id));

// Función para alternar la visibilidad de los números
function toggleNumbers() {
  const cells = [...expensesCells, ...incomesCells, ...balanceCells, ...overviewCells];
  cells.forEach(cell => {
    if (cell.innerText === '****') {
      // Restaurar el valor original
      cell.innerText = originalCellValues[cell.id];
    } else {
      // Guardar el valor original y cambiar a '****'
      originalCellValues[cell.id] = cell.innerText;
      cell.innerText = '****';
    }
  });
}


function move() {
  var elem = document.getElementById("myBar");

  // Obtener los valores de ingresos totales y gastos totales del mes
  var totalIncome = parseFloat(document.getElementById("monthly-income").innerText.replace(/[^0-9.-]+/g, ""));
  var totalExpenses = parseFloat(document.getElementById("monthly-expenses").innerText.replace(/[^0-9.-]+/g, ""));

  // Calcular el porcentaje de gastos totales con respecto a los ingresos totales
  var percentage = (totalExpenses / totalIncome) * 100;

  var width = 1;
  var id = setInterval(frame, 1);
  function frame() {
      if (width >= percentage || width >= 100) {
          clearInterval(id);
      } else {
          width++;
          elem.style.width = width + '%';
          document.getElementById("label").innerHTML = width + '%';

          // Cambiar color a amarillo si el porcentaje es mayor al 70% y a rojo si es mayor al 90%
          if (percentage > 90) {
            elem.style.backgroundColor = 'red';
          } else if (percentage > 70) {
            elem.style.backgroundColor = 'yellow';
          }
      }
  }
}

window.onload = function() {
  move();
};
