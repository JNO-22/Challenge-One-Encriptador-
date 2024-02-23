const btns = document.getElementsByClassName("botones");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", getText);
}

function getText() {
  const pattern = /^[a-z\s]+$/;
  var text = document.getElementById("mensaje").value;
  var output = document.getElementById("window-output-text");
  if (pattern.test(text) || this.id == "boton-copiar") {
    switch (this.id) {
      case "btn-encriptar":
        output.innerText = "";
        encriptarTexto(text);
        break;
      case "btn-desencriptar":
        output.innerText = "";
        desencriptarTexto(text);
        break;

      case "boton-copiar":
        copiar();
        break;
    }
  } else {
    alerta("Solo se aceptan letras minusculas");
  }
}

function alerta(aviso) {
  document.getElementById("cat").classList.add("active-animation");
  document.getElementById("alerta").style.display = "flex";
  document.getElementById("window-alert-text").innerText = aviso;  
  document.getElementById("boton-alert").onclick = () => {
    document.getElementById("alerta").style.display = "none";
  };
}

function encriptarTexto(text) {
  document.getElementById("window-output-text").style.display = "block";
  const result = text
    .replaceAll("e", "enter")
    .replaceAll("i", "imes")
    .replaceAll("a", "ai")
    .replaceAll("o", "ober")
    .replaceAll("u", "ufat");
  mostrarMSJ(result);
}

function desencriptarTexto(text) {
  document.getElementById("window-output-text").style.display = "block";
  // separe "ai" de los demas porque colisiona con "imes" al empezar con "i"
  let result = text.replaceAll("ai", "a");
  result = result
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  mostrarMSJ(result);
}

function mostrarMSJ(textoResultante) {
  const output = document.getElementById("window-output-text");
  escribirMSJ(output, textoResultante, 0, 50);
  document.getElementById("boton-copiar").style.display = "block";
  for (const box of document.getElementsByClassName("window-output-warning")) {
    box.style.display = "none";
  }
  document.getElementById("mensaje").value = "";
}

function escribirMSJ(target, mensaje, index, intervalo) {
  if (index < mensaje.length && mensaje.length < 50) {
    target.innerHTML += mensaje.charAt(index);
    index++;
    setTimeout(escribirMSJ, intervalo, target, mensaje, index, intervalo);
  } else {
    target.innerHTML = mensaje;
  }
}

function copiar() {
  navigator.clipboard
    .writeText(document.getElementById("window-output-text").innerText)
    .then(() => {
      document.getElementById("warning-titulo").innerText = "Copiado";
      document.getElementById("warning-texto").innerText = "Ingrese otro texto para continuar";
  document.getElementById("boton-copiar").style.display = "none";
      ocultarMSJ();
    });
}

function ocultarMSJ() {
  document.getElementById("window-output-text").style.display = "none";
  for (const box of document.getElementsByClassName("window-output-warning")) {
    box.style.display = "block";
  }
}


var object = document.querySelector("#myWindow"),initX,initY,firstX,firstY;

// addevenlistener de todos los elementos de la clase
  object.addEventListener("mousedown",iniciarMovimiento,false);

// iniciarMovimiento para todos los elementos en un escritorio
function iniciarMovimiento(e){
console.log(e);
 e.preventDefault();
 initX = this.offsetLeft;
 initY = this.offsetTop;
 firstX = e.pageX;
 firstY = e.pageY;

 this.addEventListener("mousemove",continuarMovimiento,false );

 window.addEventListener("mouseup",finMovimiento , false);
}

//termina el movimiento eliminando el evento
function finMovimiento () {
  this.style.zIndex = "1";
  object.removeEventListener("mousemove",continuarMovimiento,false );
}

//continua el movimiento determinando la nueva posicion
function continuarMovimiento(e) {
  // Calcula los bordes de la ventana
  const maxX = window.innerWidth - this.offsetWidth;
  const maxY = window.innerHeight - this.offsetHeight;

  //Calcula la nueva posicion del elemento respecto al mouse
  let newX = initX + e.pageX - firstX;
  let newY = initY + e.pageY - firstY;

  // Limita la nueva posicion dentro de los bordes
  newX = Math.min(Math.max(0, newX), maxX);
  newY = Math.min(Math.max(0, newY), maxY);

  // Actualiza la nueva posicion
  this.style.left = newX + "px";
  this.style.top = newY + "px";
}


