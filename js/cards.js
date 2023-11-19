const fechaCorteInput = document.getElementById('fecha-corte-time');
const fechaPagoInput = document.getElementById('fecha-pago-time');

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
const currentYear = currentDate.getFullYear();

const fechaActual = currentYear + '-' + currentMonth + '-' + currentDay;

const ultimaFechaRegistrada = localStorage.getItem('ultimaFechaRegistrada');
fechaCorteInput.value = ultimaFechaRegistrada || fechaActual.toISOString().split('T')[0];

const fechaPagoRegistrada = localStorage.getItem('ultimaFechaPagoRegistrada');
fechaPagoInput.value = fechaPagoRegistrada || fechaActual.toISOString().split('T')[0];

// Get the cutoff date
const fechaCorte = fechaCorteInput.value;

// If the cutoff date is equal to the current date, add one month
if (fechaCorte === fechaActual) {
  const fechaCorteDate = new Date(fechaCorte);
  fechaCorteDate.setMonth(fechaCorteDate.getMonth() + 1);
  fechaCorteInput.value = fechaCorteDate.toISOString().split('T')[0];
  alert ("la fecha de corte se actualizo, da click registrar para confirmar");
}

// Get the payment date
const fechaPago = fechaPagoInput.value;

// If the payment date is equal to the current date, add one month
if (fechaPago === fechaActual) {
  const fechaPagoDate = new Date(fechaPago);
  fechaPagoDate.setMonth(fechaPagoDate.getMonth() + 1);
  fechaPagoInput.value = fechaPagoDate.toISOString().split('T')[0];
  alert ("la fecha de pago se actualizo, da click en registrar para confirmar");
}

document.getElementById('btn-registrar').addEventListener('click', () => {
  const fechaCorte = fechaCorteInput.value;
  const fechaPago = fechaPagoInput.value;

  if (fechaCorte < fechaActual){
    alert("La fecha de corte no puede ser anterior a la fecha actual preciona registrar para confirmar");
    return;
  }

  if (fechaPago < fechaActual){
    alert("La fecha de corte no puede ser anterior a la fecha actual preciona registrar para confirmar");
    return;
  }

  localStorage.setItem('ultimaFechaRegistrada', fechaCorte);
  localStorage.setItem('ultimaFechaPagoRegistrada', fechaPago);

  updateBarWidth();
});


// Función para obtener el ancho de la barra de progreso
function getBarWidth(barra) {
  return barra.clientWidth;
}

// Función para establecer el ancho de la barra de progreso
function setBarWidth(barra, ancho) {
  barra.style.width = ancho + '%';
}

// Función para actualizar el ancho de la barra de progreso
function updateBarWidth() {
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener el mes actual
  const mesActual = fechaActual.getMonth();

  // Obtener el día actual
  const diaActual = fechaActual.getDate();

  // Obtener el número de días del mes
  const diasMes = new Date(fechaActual.getFullYear(), mesActual + 1, 0).getDate();

  // Obtener la fecha de corte
  const fechaCorte = document.getElementById('fecha-corte-time').value;
  const fechaPago = document.getElementById('fecha-pago-time').value;

  // Obtener el número de días transcurridos desde la fecha de corte
  const diasTranscurridosCorte = Math.abs(new Date().getTime() - new Date(fechaCorte).getTime()) / (1000 * 60 * 60 * 24);
  const diasTranscurridosPago = Math.abs(new Date().getTime() - new Date(fechaPago).getTime()) / (1000 * 60 * 60 * 24);

  // Obtener el porcentaje de la barra de progreso
  const porcentajeCorte = 100 - diasTranscurridosCorte / diasMes * 100;
  const porcentajePago = 100 - diasTranscurridosPago / diasMes * 100;

  // Establecer el ancho de la barra de progreso
  setBarWidth(document.getElementById('myBar-time-cut'), porcentajeCorte);
  setBarWidth(document.getElementById('myBar-time-pay'), porcentajePago);

  // Actualizar el contenido del elemento con ID 'label-cut'
  document.getElementById('label-cut').textContent = `${porcentajeCorte.toFixed(2)}%`;
  document.getElementById('label-pay').textContent = `${porcentajePago.toFixed(2)}%`;
}

// Agregar un evento de carga a la página
window.addEventListener('load', updateBarWidth);

document.getElementById('btn-registrar').addEventListener('click', updateBarWidth);


