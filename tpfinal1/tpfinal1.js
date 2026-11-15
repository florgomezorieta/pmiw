//https://youtu.be/E-WbFBDjYrY (video yt)

let fondo = [];
let detectiveSprites = [];
let personajesDibujo = [];
let suspensoLoop;

let pantallaActual = -1;
let nroSprite = 0;
let tiempoSprite = 0;
let posXDetective = -100;

let texto = [
  "En el Museo del puerto desaparecio el Diamante Aurora. La detective Rios llega antes del cierre.",
  "El vidrio esta intacto. Bajo el pedestal hay polvo plateado y una marca casi invisible.",
  "Lino, el guardia, jura que nadie salio. Recuerda un ascensor a medianoche y cafe  tibio.",
  "En el despacho aparece una copia del registro: alguien subió al archivo a las 23:17.",
  "Las huellas mojadas terminan junto a la sala de restauración.",
  "Lino entrega un recibo de cafe de las 23:17, justo cuando dice que estaba en la entrada.",
  "El archivo muestra una llave duplicada a nombre de la dirección del museo.",
  "El laboratorio confirma que el polvo plateado viene del marco de restauracion.",
  "Tras un cuadro encuentras un hueco reciente y una ficha de acceso al subsuelo.",
  "Vera admite que restauro el marco. El director le pidio dejar abierto el sótano.",
  "Lino confiesa que salio a fumar. Vio una sombra cruzar hacia el ascensor.",
  "Salvatierra niega todo: dice que el museo tiene docenas de llaves.",
  "En el sotano hay una caja vacia con el sello del director. El rastro sigue bajo la calle.",
  "En el muelle, Vera aparece con el diamante. Dice que Salvatierra la obligó a preparar una copia.",
  "Salvatierra corre al túnel con el diamante. Ya tienes la llave, la ficha y el registro.",
  "FINAL 1 — Acusación apresurada: Vera queda detenida sin pruebas suficientes. Salvatierra escapa con el diamante.",
  "FINAL 2 — Caso resuelto: cruzas las pruebas, detienes a Salvatierra y recuperas el Diamante Aurora.",
  "FINAL 3 — Huida en la niebla: persigues a Salvatierra sin asegurar las pruebas. Se pierde entre los barcos."
];

let personaje = [
  "Detective Rios",
  "Lino, guardia",
  "Vera, restauradora",
  "Salvatierra, director",
  "Caso cerrado"
];

let personajePorPantalla = [
  0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 3, 0, 2, 3, 4, 4, 4
];

let seleccionUno = [
  "Examinar la vitrina",
  "Revisar el despacho",
  "Seguir hacia el pasillo",
  "Consultar el archivo",
  "Buscar en el archivo",
  "Comparar el recibo con el registro",
  "Revisar la sala de restauración",
  "Interrogar a Vera",
  "Interrogar a Vera",
  "Hablar con Salvatierra",
  "Hablar con Salvatierra",
  "Registrar el despacho",
  "Seguir el rastro al muelle",
  "Acusar a Vera ahora",
  "Detener a Salvatierra con las pruebas",
  "Volver al inicio",
  "Volver al inicio",
  "Volver al inicio"
];

let seleccionDos = [
  "Hablar con el guardia",
  "Seguir las huellas",
  "Preguntar por el recibo",
  "Ir al laboratorio",
  "Entrar al taller",
  "Buscar en el taller",
  "Interrogar a Vera",
  "Volver a hablar con Lino",
  "Volver a hablar con Lino",
  "Buscar en el sotano",
  "Seguir las huellas",
  "Bajar al túnel",
  "Volver a confrontar al director",
  "Seguir a Salvatierra al tunel",
  "Perseguirlo sin pedir apoyo",
  "Ver creditos",
  "Ver creditos",
  "Ver creditos"
];

let destinoUno = [1, 3, 4, 6, 6, 7, 8, 9, 9, 11, 11, 12, 13, 15, 16, 0, 0, 0];
let destinoDos = [2, 4, 5, 7, 8, 8, 9, 10, 10, 12, 13, 14, 14, 14, 17, 18, 18, 18];

let nombreAutora = "Florencia Gomez Orieta";

function preload() {
  for (let i = 0; i < 19; i++) {
    fondo.push(loadImage("data/escena" + i + ".png"));
  }

  for (let i = 0; i < 4; i++) {
    detectiveSprites.push(loadImage("data/detective" + i + ".png"));
  }

  personajesDibujo.push(loadImage("data/detective0.png"));
  personajesDibujo.push(loadImage("data/lino.png"));
  personajesDibujo.push(loadImage("data/vera.png"));
  personajesDibujo.push(loadImage("data/salvatierra.png"));
  personajesDibujo.push(loadImage("data/detective0.png"));

  suspensoLoop = loadSound("data/suspenso.wav");
}

function setup() {
  createCanvas(800, 450);
  colorMode(HSB, 100, 100, 100, 100);
  textFont("Courier Prime");
  textSize(16);
  textWrap(WORD);
}

function draw() {
  background(65, 35, 18);

  if (pantallaActual == -1) {
    dibujarMenuInicio();
    return;
  }

  if (pantallaActual == 18) {
    dibujarCreditos();
    return;
  }

  image(fondo[pantallaActual], 0, 0);
  dibujarEncabezado();
  dibujarCajaDeTexto(personaje[personajePorPantalla[pantallaActual]]);

  if (suspensoLoop && suspensoLoop.isPlaying()) {
    let volumen = map(mouseX, 0, width, 0, 0.45);
    suspensoLoop.setVolume(volumen);
  }
}

function dibujarMenuInicio() {
  image(fondo[0], 0, 0);

  push();
  fill(0, 0, 0, 65);
  rect(0, 0, 800, 450);

  stroke(12, 45, 92);
  fill(65, 55, 11, 95);
  rect(130, 45, 540, 360, 12);

  fill(12, 35, 96);
  textAlign(CENTER);
  textSize(20);
  text("AVENTURA GRÁFICA POLICIAL", 400, 105);

  fill(0, 0, 100);
  textSize(34);
  text("EL CASO DEL", 400, 165);
  text("DIAMANTE AURORA", 400, 210);
  pop();

  dibujarBotonMenu("JUGAR", 245);
  dibujarBotonMenu("CRÉDITOS", 315);
}

function dibujarBotonMenu(rotulo, posY) {
  let estaSobre = mouseX > 300 && mouseX < 500 &&
    mouseY > posY && mouseY < posY + 50;

  push();
  stroke(12, 45, 92);

  if (estaSobre) {
    fill(45, 64, 42);
  } else {
    fill(65, 35, 22);
  }

  rect(300, posY, 200, 50, 8);
  fill(0, 0, 100);
  textAlign(CENTER);
  textSize(18);
  text(rotulo, 400, posY + 32);
  pop();
}

function dibujarEncabezado() {
  push();
  stroke(65, 45, 12);
  fill(65, 45, 12, 88);
  rect(18, 16, 440, 42, 5);
  fill(12, 35, 96);
  textSize(17);
  text("ARCHIVO N.º 17 / MUSEO DEL PUERTO", 32, 43);
  pop();
}

function dibujarCajaDeTexto(nombre) {
  push();
  stroke(12, 45, 92);
  fill(65, 55, 11, 94);
  rect(20, 265, 760, 175, 10);

  fill(12, 35, 98);
  textSize(16);
  text(nombre, 42, 291);

  fill(0, 0, 100);
  textSize(15);
  text(texto[pantallaActual], 42, 312, 600, 42);

  dibujarOpcion(seleccionUno[pantallaActual], 348);
  dibujarOpcion(seleccionDos[pantallaActual], 394);

  image(personajesDibujo[personajePorPantalla[pantallaActual]], 680, 300, 70, 115);
  pop();
}

function dibujarOpcion(rotulo, posY) {
  let estaSobre = mouseX > 38 && mouseX < 658 &&
    mouseY > posY && mouseY < posY + 34;

  push();
  stroke(12, 45, 92);

  if (estaSobre) {
    fill(45, 64, 42);
  } else {
    fill(65, 35, 22);
  }

  rect(38, posY, 620, 34, 5);
  fill(0, 0, 100);
  textSize(14);
  text(rotulo, 53, posY + 22);
  pop();
}

function mousePressed() {
  if (pantallaActual == -1) {
    if (mouseX > 300 && mouseX < 500 && mouseY > 245 && mouseY < 295) {
      pantallaActual = 0;
    }

    if (mouseX > 300 && mouseX < 500 && mouseY > 315 && mouseY < 365) {
      pantallaActual = 18;
      posXDetective = -100;
      nroSprite = 0;
      tiempoSprite = 0;
    }

    return;
  }

  if (pantallaActual == 18) {
    if (mouseY > 375) {
      volverAlInicio();
    }
    return;
  }

  if (mouseX > 38 && mouseX < 658 && mouseY > 348 && mouseY < 382) {
    avanzarHistoria(destinoUno[pantallaActual]);
  } else if (mouseX > 38 && mouseX < 658 && mouseY > 394 && mouseY < 428) {
    avanzarHistoria(destinoDos[pantallaActual]);
  }
}

function avanzarHistoria(destino) {
  if (destino == 0) {
    volverAlInicio();
  } else {
    pantallaActual = destino;

    if (pantallaActual == 18) {
      posXDetective = -100;
      nroSprite = 0;
      tiempoSprite = 0;
    }
  }
}

function volverAlInicio() {
  pantallaActual = -1;
  posXDetective = -100;
  nroSprite = 0;
  tiempoSprite = 0;
}

function keyPressed() {
  if (key == "l") {
    if (suspensoLoop && !suspensoLoop.isPlaying()) {
      suspensoLoop.loop();
    }
  }

  if (key == "p") {
    if (suspensoLoop && suspensoLoop.isPlaying()) {
      suspensoLoop.pause();
    }
  }

  if (key == "s") {
    if (suspensoLoop) {
      suspensoLoop.stop();
    }
  }
}

function dibujarCreditos() {
  image(fondo[18], 0, 0);
  controlDeTiempoDeSprites();

  push();
  stroke(65, 55, 10);
  fill(65, 55, 10, 90);
  rect(185, 55, 580, 250, 8);

  fill(12, 35, 98);
  textAlign(CENTER);
  textSize(28);
  text("CRÉDITOS", 475, 100);

  fill(0, 0, 100);
  textSize(17);
  text("Creado porr", 475, 153);
  text(nombreAutora, 475, 184);
  text("El caso del Diamante Aurora", 475, 222);

  stroke(12, 45, 92);
  fill(65, 35, 22);
  rect(295, 385, 360, 40, 5);

  fill(0, 0, 100);
  textSize(15);
  text("Volver al inicio", 475, 411);
  pop();

  image(detectiveSprites[nroSprite], posXDetective, 285);
  posXDetective++;

  if (posXDetective > 820) {
    posXDetective = -100;
  }
}

function controlDeTiempoDeSprites() {
  tiempoSprite++;

  if (tiempoSprite > 10) {
    nroSprite++;
    tiempoSprite = 0;
  }

  if (nroSprite > 3) {
    nroSprite = 0;
  }
}
