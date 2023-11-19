document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById("loader");
    var continueButton = document.getElementById("continue");
    var count = 5; // Contador inicial
  
    var content = document.querySelector(".containt");
  
    // Función para determinar si la carga debe ocurrir
    function shouldShowLoader() {
      return Math.floor(Math.random() * 4) === 0; // 25% de probabilidad
    }
  
    // Muestra el loader con una probabilidad de 25%
    if (shouldShowLoader()) {
      loader.style.display = "block";
  
      function startCountdown() {
        if (loader.style.display !== "block") {
          content.style.display = "block"; // Muestra el contenido
          return;
        }
  
        if (count > 0) {
          continueButton.textContent = count;
          count--;
          setTimeout(startCountdown, 1000); // Llama a la función nuevamente después de 1 segundo
        } else {
          continueButton.textContent = "Continuar";
          continueButton.addEventListener("click", function() {
            var loadAdContainer = document.querySelector(".load-ad-container");
            loadAdContainer.style.display = "none";
  
            content.style.display = "block"; // Muestra el contenido
          });
        }
      }
  
      startCountdown(); // Inicia la cuenta regresiva cuando se carga el documento
    } else {
      // Oculta el contenedor de contenido al cargar la página
      content.style.display = "none";
  
      // Ejecuta la cuenta regresiva aunque no se muestre el loader
      function startCountdown() {
        if (count > 0) {
          continueButton.textContent = count;
          count--;
          setTimeout(startCountdown, 1000); // Llama a la función nuevamente después de 1 segundo
        } else {
          continueButton.textContent = "Continuar";
          continueButton.addEventListener("click", function() {
            var loadAdContainer = document.querySelector(".load-ad-container");
            loadAdContainer.style.display = "none";
  
            content.style.display = "block"; // Muestra el contenido
          });
        }
      }
  
      startCountdown(); // Inicia la cuenta regresiva cuando se carga el documento
    }
  });
  