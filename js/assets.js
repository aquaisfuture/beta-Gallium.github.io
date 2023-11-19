const realStateForm = document.getElementById("real-estate-form");
const realStateTable = document.getElementById("real-estate-table");
const liquidAssetsForm = document.getElementById("liquid-assets-form");
const liquidAssetsTable = document.getElementById("liquid-assets-table");
const personalAssetsForm = document.getElementById("personal-property-form");
const personalAssetsTable = document.getElementById("personal-property-table");
const investmentsForm = document.getElementById("investments-form");
const investmentsTable = document.getElementById("investments-table");

let realState = JSON.parse(localStorage.getItem("realState")) || [];
let liquidAssets = JSON.parse(localStorage.getItem("liquidAssets")) || [];
let personalAssets = JSON.parse(localStorage.getItem("personalAssets")) || [];
let investments = JSON.parse(localStorage.getItem("investments")) || [];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function addRowToTable(table, rowData) {
  const row = table.insertRow(-1);
  row.insertCell(0).innerText = rowData.name;
  row.insertCell(1).innerText = formatCurrency(rowData.value);
  row.insertCell(2).innerText = rowData.date;
  const deleteButton = row.insertCell(3).appendChild(document.createElement("button"));
  deleteButton.classList.add("delete-button"); // Añade la clase delete-button
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => {
    row.remove();
    if (table === realStateTable) {
      realState = realState.filter((asset) => asset.id !== rowData.id);
      localStorage.setItem("realState", JSON.stringify(realState));
    } else if (table === liquidAssetsTable) {
      liquidAssets = liquidAssets.filter((asset) => asset.id !== rowData.id);
      localStorage.setItem("liquidAssets", JSON.stringify(liquidAssets));
    } else if (table === personalAssetsTable) {
      personalAssets = personalAssets.filter((asset) => asset.id !== rowData.id);
      localStorage.setItem("personalAssets", JSON.stringify(personalAssets));
    } else if (table === investmentsTable) {
      investments = investments.filter((asset) => asset.id !== rowData.id);
      localStorage.setItem("investments", JSON.stringify(investments));
    }

    const assetUpdatedEvent = new CustomEvent("asset-updated");
    document.dispatchEvent(assetUpdatedEvent);
  });
}

// Función para cargar y construir las filas de la tabla
function loadAndBuildTable(table, data) {
  for (let i = 0; i < data.length; i++) {
    addRowToTable(table, data[i]);
  }
}

// Cargar y construir las filas de cada tabla al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  loadAndBuildTable(realStateTable, realState);
  loadAndBuildTable(liquidAssetsTable, liquidAssets);
  loadAndBuildTable(personalAssetsTable, personalAssets);
  loadAndBuildTable(investmentsTable, investments);
});

// Resto del código de los eventos para agregar activos
// ... (lo que proporcionaste anteriormente)


// Bienes Raíces
document.getElementById("add-real-estate-button").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("real-estate-name").value;
  const value = document.getElementById("real-estate").value;
  const date = document.getElementById("real-estate-date").value;

  if (name === "" || value === "" || date === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const propertyData = {
    id: Date.now(),
    name,
    value,
    date,
  };

  realState.push(propertyData);
  localStorage.setItem("realState", JSON.stringify(realState));

  addRowToTable(realStateTable, propertyData, realState);

  document.getElementById("real-estate-name").value = "";
  document.getElementById("real-estate").value = "";
  document.getElementById("real-estate-date").value = "";

  const incomeUpdatedEvent = new CustomEvent("asset-updated");
  document.dispatchEvent(assetUpdatedEvent);
});



// Activos Líquidos
document.getElementById("add-liquid-button").addEventListener("click", (e) => {
  e.preventDefault();

  
  const name = document.getElementById("liquid-asset-name").value;
  const value = document.getElementById("liquid-asset").value;
  const date = document.getElementById("liquid-asset-date").value;

  if (name === "" || value === "" || date === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const assetData = {
    id: Date.now(),
    name,
    value,
    date,
  };

  liquidAssets.push(assetData);
  localStorage.setItem("liquidAssets", JSON.stringify(liquidAssets));

  addRowToTable(liquidAssetsTable, assetData, liquidAssets);

  document.getElementById("liquid-asset-name").value = "";
  document.getElementById("liquid-asset").value = "";
  document.getElementById("liquid-asset-date").value = "";

  const incomeUpdatedEvent = new CustomEvent("asset-updated");
  document.dispatchEvent(assetUpdatedEvent);

});



// Propiedad Personal

document.getElementById("add-pp-button").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("personal-property-name").value;
  const value = document.getElementById("personal-property").value;
  const date = document.getElementById("personal-property-date").value;

  if (name === "" || value === "" || date === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const assetData = {
    id: Date.now(),
    name,
    value,
    date,
  };

  personalAssets.push(assetData);
  localStorage.setItem("personalAssets", JSON.stringify(personalAssets));

  addRowToTable(personalAssetsTable, assetData, personalAssets);

  document.getElementById("personal-property-name").value = "";
  document.getElementById("personal-property").value = "";
  document.getElementById("personal-property-date").value = "";

  const incomeUpdatedEvent = new CustomEvent("asset-updated");
  document.dispatchEvent(assetUpdatedEvent);

});



// Inversiones
document.getElementById("add-investments-button").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("investment-name").value;
  const value = document.getElementById("investment").value;
  const date = document.getElementById("investment-date").value;

  if (name === "" || value === "" || date === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const investmentData = {
    id: Date.now(),
    name,
    value,
    date,
  };

  investments.push(investmentData);
  localStorage.setItem("investments", JSON.stringify(investments));

  addRowToTable(investmentsTable, investmentData, investments);

  document.getElementById("investment-name").value = "";
  document.getElementById("investment").value = "";
  document.getElementById("investment-date").value = "";

  const incomeUpdatedEvent = new CustomEvent("asset-updated");
  document.dispatchEvent(assetUpdatedEvent);

});


const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
const currentYear = currentDate.getFullYear();

const formattedDate = currentYear + '-' + currentMonth + '-' + currentDay;

// Update the date fields with the formatted date
document.getElementById("liquid-asset-date").value = formattedDate;
document.getElementById("real-estate-date").value = formattedDate;
document.getElementById("personal-property-date").value = formattedDate;
document.getElementById("investment-date").value = formattedDate;
