const btns = document.getElementsByClassName("botones");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", getText);
}

function getText() {
  var text = document.getElementById("mensaje").value;
  if (!new RegExp(/^[a-z,\s]+$/i).test(text) && this.id !== "boton-3") {
    alert("Ingresa solo letras minusculas");
  } else {
    switch (this.id) {
      case "boton-1":
        encriptarTexto(text);
        break;
      case "boton-2":
        desencriptarTexto();
        break;

      case "boton-3":
        copiar();
        break;
    }
  }
}

function encriptarTexto(text) {
  const result = text
    .replaceAll("e", "enter")
    .replaceAll("i", "imes")
    .replaceAll("a", "ai")
    .replaceAll("o", "ober")
    .replaceAll("u", "ufat");
  mostrarMSJ(result);
}

function desencriptarTexto() {
  const text = document.getElementById("mensaje").value;
  const result = text
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ai", "a")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
  mostrarMSJ(result);
}

function mostrarMSJ(texto) {
  spn = document.getElementById("texto");
  txt = document.createTextNode(texto);
  spn.appendChild(txt);
  for (const box of document.getElementsByClassName("muneco")) {
    box.style.display = "none";
  }
  document.getElementById("mensaje").value = "";
}

function copiar() {
  navigator.clipboard.writeText(document.getElementById("texto").innerText).then(() => {
    alert("Copiado: " + document.getElementById("texto").innerText);
    ocultarMSJ();
  });
}

function ocultarMSJ() {
  document.getElementById("texto").innerText = "";
  for (const box of document.getElementsByClassName("muneco")) {
    box.style.display = "block";
  }
}
