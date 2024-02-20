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
