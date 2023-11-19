// Define una función que carga la página `www.lll.com` como la página de inicio.
function setHomePage() {
  // Asigna la URL `www.lll.com` a la ventana actual.
  window.location.assign("www.galliumfintech.com");
}

// Llama a la función `setHomePage()` cuando el usuario hace clic en el botón.
document.querySelector("button").addEventListener("click", setHomePage);