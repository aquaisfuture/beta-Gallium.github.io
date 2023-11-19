const CategoryForm = document.getElementById("category-form")

CategoryForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let categoryFormData = new FormData (CategoryForm);``
    let trasationObj = convertFormDataToTransactionObj(categoryFormData)
    saveTransactionObj(trasationObj) 
    insertRowInTrasnscionTable(trasationObj)
    CategoryForm.reset();
    })

addEventListener("DOMContentLoaded", function(event){
   let trasaccionObjArr = JSON.parse(localStorage.getItem("transactionData"))
   trasaccionObjArr.forEach(
    function(arrayElement) {
        insertRowInTrasnscionTable(arrayElement)
        console.log("se inserta el documento")
            }
        )
    }
)

function getNewTransactionId(){
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId;

}

    
function convertFormDataToTransactionObj (categoryFormData){
   let categoryName  = categoryFormData.get("categoryName");
   let categoryColor  = categoryFormData.get("categoryColor");
   let trasactionId = getNewTransactionId();
    return {
        "categoryName" : categoryName,
        "categoryColor" : categoryColor,
        "trasactionId" : trasactionId

    }
 }  

 /* es la que inserta las cosas */
function insertRowInTrasnscionTable(trasationObj){
    let trasationTableRef = document.getElementById("category-id");
    let newTrasationTableRowRef = trasationTableRef.insertRow(-1);

    newTrasationTableRowRef.setAttribute("data-trasaction-Id", trasationObj["trasactionId"])

    let newTypeCellRef = newTrasationTableRowRef.insertCell(0);
    newTypeCellRef.textContent = trasationObj["categoryName"];
    newTypeCellRef.style.backgroundColor = trasationObj["categoryColor"];

    let newDeleteCell = newTrasationTableRowRef.insertCell(1);
    let deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "eliminar"
    newDeleteCell.appendChild(deleteButton)


    deleteButton.addEventListener("click", (event) => {
        let tranaccionRow = event.target.parentNode.parentNode;
        let trasactionId = tranaccionRow.getAttribute("data-trasaction-Id");
        tranaccionRow.remove();
        console.log()
        deleteTransactionObj(trasactionId);
    
    })
}

// le paso como parametro el id de la transaccion que quiero eliminar
function deleteTransactionObj (trasactionId) {
    //obtengo lo que hay en mi base de datos 
    let trasaccionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    //busco el indice / la posicion de la tranaccion que quiero eliminar
    let trasaccionIndexInArray = trasaccionObjArr.findIndex(elemment => elemment.trasactionId === trasactionId)
    //Elimino el elemento de esa posicion
    trasaccionObjArr.splice(trasaccionIndexInArray, 1);
    //convierto nuevamente a json en local storage
    let trasationArrayJSON = JSON.stringify(trasaccionObjArr);
    //guardo mi formulario de trasaccion en foprmulario JSON en el  local storage
    localStorage.setItem("transactionData" , trasationArrayJSON)
}


function saveTransactionObj(trasationObj) {

    let myTransactionArray  = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(trasationObj)
    //convierto array a Json en el local storaje 
    let trasationArrayJSON = JSON.stringify(myTransactionArray);
    //guardo mi formulario de trasaccion en foprmulario JSON en el  local storage
    localStorage.setItem("transactionData" , trasationArrayJSON )
}