document.addEventListener("DOMContentLoaded", function () {
  // Obtén referencias a los elementos HTML relevantes
  const wishTable = document.getElementById("wish-table");
  const wishNameInput = document.getElementById("wish-name-input");
  const wishPriceInput = document.getElementById("wish-price-input");
  const wishUrlInput = document.getElementById("wish-url-input");
  const wishSelectInput = document.getElementById("wish-select-input");
  const wishAddButton = document.getElementById("wish-add-button");

  // Cargar datos desde el almacenamiento local
  const savedWishes = JSON.parse(localStorage.getItem("wishes")) || [];

  function saveWishes() {
    localStorage.setItem("wishes", JSON.stringify(savedWishes));
  }

  function loadWishes() {
    savedWishes.forEach((wish) => {
      const newRow = wishTable.insertRow(-1);
      const nameCell = newRow.insertCell(0);
      nameCell.innerText = wish.name;

      const priceCell = newRow.insertCell(1);
      priceCell.innerText = wish.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

      const urlCell = newRow.insertCell(2);
      urlCell.innerHTML = `<a href="${wish.url}" target="_blank">${wish.url}</a>`;

      const selectCell = newRow.insertCell(3);
      selectCell.innerText = wish.select;

      const addButtonCell = newRow.insertCell(4);
      addButtonCell.innerHTML = `<button class="delete-button">Eliminar</button> <button class="edit-button">Editar</button>`;

//      const sendToExpenses = newRow.insertCell(5);
//      sendToExpenses.innerHTML = `<button class="move-to-expenses"><i class="fa-regular fa-paper-plane"></i></button>`;

      const deleteButton = addButtonCell.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        wishTable.deleteRow(newRow.rowIndex);
        savedWishes.splice(savedWishes.indexOf(wish), 1);
        saveWishes();
      });

      const editButton = addButtonCell.querySelector(".edit-button");
      editButton.addEventListener("click", function () {
        wishNameInput.value = wish.name;
        wishPriceInput.value = wish.price;
        wishUrlInput.value = wish.url;
        wishSelectInput.value = wish.select;
        wishTable.deleteRow(newRow.rowIndex);
        savedWishes.splice(savedWishes.indexOf(wish), 1);
        saveWishes();
      });
    });
  }

  loadWishes();

  wishAddButton.addEventListener("click", function () {
    const name = wishNameInput.value;
    const price = parseFloat(wishPriceInput.value);
    const url = wishUrlInput.value;
    const select = wishSelectInput.value;

    if (!name || isNaN(price) || !url) {
      alert("Por favor, complete todos los campos y asegúrese de que el precio sea un número válido.");
      return;
    }

    const newRow = wishTable.insertRow(-1);

    const nameCell = newRow.insertCell(0);
    nameCell.innerText = name;

    const priceCell = newRow.insertCell(1);
    priceCell.innerText = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const urlCell = newRow.insertCell(2);
    urlCell.innerHTML = `<a href="${url}" target="_blank" style="text-decoration: none;  font-size: 1em;">${url}</a>`;

    const selectCell = newRow.insertCell(3);
    selectCell.innerText = select;

    const addButtonCell = newRow.insertCell(4);
    addButtonCell.innerHTML = `<button class="delete-button">Eliminar</button> <br> <button class="edit-button">Editar</button>`;

    //const sendToExpenses = newRow.insertCell(5);
    //sendToExpenses.innerHTML =`<button class="delete-button"><i class="fa-regular fa-paper-plane"></i></button>`;

    const deleteButton = addButtonCell.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      wishTable.deleteRow(newRow.rowIndex);
      savedWishes.splice(savedWishes.indexOf(wish), 1);
      saveWishes();
    });

    const editButton = addButtonCell.querySelector(".edit-button");
    editButton.addEventListener("click", function () {
      wishNameInput.value = wish.name;
      wishPriceInput.value = wish.price;
      wishUrlInput.value = wish.url;
      wishSelectInput.value = wish.select;
      wishTable.deleteRow(newRow.rowIndex);
      savedWishes.splice(savedWishes.indexOf(wish), 1);
      saveWishes();
    });

    const newWish = { name, price, url, select };
    savedWishes.push(newWish);
    saveWishes();

    wishNameInput.value = "";
    wishPriceInput.value = "";
    wishUrlInput.value = "";
    wishSelectInput.value = "Alto";
  });
});