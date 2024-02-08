const btns = document.getElementsByClassName("botones");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", getText);
}

function getText() {
  var text = document.getElementById("mensaje").value;
  if (!new RegExp(/^[a-z\s]+$/i).test(text) && this.id !== "boton-copiar") {
    alert("Ingresa solo letras minusculas");
  } else {
    switch (this.id) {
      case "btn-encriptar":
        encriptarTexto(text);
        break;
      case "btn-desencriptar":
        desencriptarTexto(text);
        break;

      case "boton-copiar":
        copiar();
        break;
    }
  }
}

function encriptarTexto(text) {
  document.getElementById("window-output-text").innerText = "";
  const result = text
    .replaceAll("e", "enter")
    .replaceAll("i", "imes")
    .replaceAll("a", "ai")
    .replaceAll("o", "ober")
    .replaceAll("u", "ufat");
  mostrarMSJ(result);
}

function desencriptarTexto(text) {
  document.getElementById("window-output-text").innerText = "";
  const result = text
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ai", "a")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  mostrarMSJ(result);
}

function mostrarMSJ(textoResultante) {
  const output = document.getElementById("window-output-text");
  escribirMSJ(output, textoResultante, 0, 50);
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
      alert("Copiado: " + document.getElementById("window-output-text").innerText);
      ocultarMSJ();
    });
}

function ocultarMSJ() {
  document.getElementById("window-output-text").innerText = "";
  for (const box of document.getElementsByClassName("window-output-warning")) {
    box.style.display = "block";
  }
}
