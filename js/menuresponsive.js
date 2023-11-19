document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.menu');
  const inputMenu = document.querySelector('.input-menu');
  const menuContainer = document.getElementById('menu');
  
  // Función para restablecer el menú a su estado inicial
  function resetMenu() {
    inputMenu.checked = false;
    menuContainer.style.display = 'none';
    menu.classList.remove('mi-animacion');
  }

  // Agrega un evento clic al botón hamburger
  document.getElementById('hamburger').addEventListener('click', function () {
    if (menuContainer.style.display === 'flex') {
      menuContainer.style.display = 'none';
    } else {
      menuContainer.style.display = 'flex';
    }
  });

  // Agregar un evento clic a todos los enlaces del menú
  const enlaces = document.querySelectorAll('#menu a');
  enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', resetMenu);
  });

  // Restablece el menú al cargar la página
  resetMenu();
});
