// ------------------------------------
// ESTADOS DE LA ANIMACIÓN
// ------------------------------------

const CAMINANDO = 0;
const PERSECUCION = 1;
const FONDO_DETENIDO = 2;
const LOGO_FINAL = 3;

let estado = CAMINANDO;

// ------------------------------------
// IMÁGENES
// ------------------------------------

let fondo;
let mercader;

let framesGolfista = [];
let framesOjo = [];

let logo;
let fuenteTerraria;

// ------------------------------------
// TIEMPO
// ------------------------------------

let inicioAnimacion;
let inicioEstado;

// ------------------------------------
// FONDO
// ------------------------------------

let posicionFondo = 0;

// ------------------------------------
// POSICIONES
// ------------------------------------

let xMercader = 160;
let xGolfista = 310;

let yMercader = 455;
let yGolfista = 455;

// ------------------------------------
// VELOCIDADES
// ------------------------------------

let velocidadGolfista = 150;
let velocidadOjo = 120;

// ------------------------------------
// TAMAÑOS
// ------------------------------------

let tamanioMercader = 110;
let tamanioGolfista = 110;
let tamanioOjo = 140;

// ------------------------------------
// CARGA DE IMÁGENES
// ------------------------------------

function preload() {
  // Fondo del bioma
  fondo = loadImage("fondo.jpg");

  // Mercader
  mercader = loadImage("mercader_1.png");

  // Frames del Golfista
  for (let i = 0; i < 6; i++) {
    framesGolfista[i] = loadImage(
      "golfista_" + (i + 1) + ".png"
    );
  }

  // Frames del Ojo
  for (let i = 0; i < 3; i++) {
    framesOjo[i] = loadImage(
      "ojo_" + (i + 1) + ".png"
    );
  }

  // Logo y fuente
  logo = loadImage("logo.png");
  fuenteTerraria = loadFont("Terraria.TTF");
}

// ------------------------------------
// CONFIGURACIÓN
// ------------------------------------

function setup() {
  createCanvas(800, 600);

  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(fuenteTerraria);

  inicioAnimacion = millis();
  inicioEstado = millis();
}

// ------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------

function draw() {
  let tiempoEstado = millis() - inicioEstado;
  let tiempoTotal = millis() - inicioAnimacion;

  // El fondo se mueve durante la caminata
  // y durante la persecución.
  if (
    estado == CAMINANDO ||
    estado == PERSECUCION
  ) {
    dibujarFondo(tiempoTotal, true);
  } else {
    // En este momento el fondo queda detenido.
    dibujarFondo(tiempoTotal, false);
  }

  if (estado == CAMINANDO) {
    // ------------------------------------
    // ESTADO 0:
    // LOS PERSONAJES CAMINAN
    // ------------------------------------

    let porcentaje = tiempoEstado / 7000;

    xMercader = map(
      porcentaje,
      0,
      1,
      120,
      700
    );

    xGolfista = map(
      porcentaje,
      0,
      1,
      260,
      650
    );

    // El Mercader usa una sola imagen.
    dibujarImagenDerecha(
      mercader,
      xMercader,
      yMercader,
      tamanioMercader
    );

    // El Golfista usa sus frames 1 a 5.
    // El frame 0 es su posición quieta.
    dibujarAnimacion(
      framesGolfista,
      xGolfista,
      yGolfista,
      velocidadGolfista,
      tamanioGolfista,
      1,
      5
    );

    if (terminoTiempo(tiempoEstado, 7000)) {
      cambiarEstado(PERSECUCION);
    }
  } else if (estado == PERSECUCION) {
    // ------------------------------------
    // ESTADO 1:
    // PERSECUCIÓN DEL OJO
    // ------------------------------------

    let porcentaje = tiempoEstado / 8000;

    xMercader = map(
      porcentaje,
      0,
      1,
      700,
      230
    );

    xGolfista = map(
      porcentaje,
      0,
      1,
      650,
      120
    );

    dibujarImagenDerecha(
      mercader,
      xMercader,
      yMercader,
      tamanioMercader
    );

    dibujarAnimacion(
      framesGolfista,
      xGolfista,
      yGolfista,
      velocidadGolfista,
      tamanioGolfista,
      1,
      5
    );

    // El Ojo vuela por encima del suelo.
    let xOjo = map(
      porcentaje,
      0,
      1,
      780,
      430
    );

    dibujarOjo(
      framesOjo,
      xOjo,
      180,
      velocidadOjo,
      tamanioOjo
    );

    if (terminoTiempo(tiempoEstado, 8000)) {
      cambiarEstado(FONDO_DETENIDO);
    }
  } else if (estado == FONDO_DETENIDO) {
    // ------------------------------------
    // ESTADO 2:
    // EL FONDO SE DETIENE
    // LOS PERSONAJES SIGUEN DE LARGO
    // ------------------------------------

    // El fondo ya no se mueve porque se llamó
    // a dibujarFondo() con false.

    xMercader = 230 + tiempoEstado * 0.25;
    xGolfista = 120 + tiempoEstado * 0.28;

    dibujarImagenDerecha(
      mercader,
      xMercader,
      yMercader,
      tamanioMercader
    );

    dibujarAnimacion(
      framesGolfista,
      xGolfista,
      yGolfista,
      velocidadGolfista,
      tamanioGolfista,
      1,
      5
    );

    // Cuando los personajes ya pasaron de largo,
    // aparece el logo.
    if (terminoTiempo(tiempoEstado, 3500)) {
      cambiarEstado(LOGO_FINAL);
    }
  } else if (estado == LOGO_FINAL) {
    // ------------------------------------
    // ESTADO 3:
    // BAJA EL LOGO Y APARECE REINICIAR
    // ------------------------------------

    let posicionLogo = -100 + tiempoEstado * 0.25;

    if (posicionLogo > 250) {
      posicionLogo = 250;
    }

    image(
      logo,
      400,
      posicionLogo,
      420,
      150
    );

    textFont(fuenteTerraria);
    textSize(26);
    fill(255);

    text(
      "ESCAPE COMPLETADO",
      400,
      400
    );

    dibujarBotonReiniciar();
  }
}

// ------------------------------------
// FONDO EN MOVIMIENTO
// ------------------------------------

function dibujarFondo(tiempo, seMueve) {
  if (seMueve) {
    // El fondo se repite en bucle.
    posicionFondo = -((tiempo * 0.08) % 800);
  }

  // Primera copia del fondo
  image(
    fondo,
    posicionFondo + 400,
    300,
    800,
    600
  );

  // Segunda copia del fondo
  image(
    fondo,
    posicionFondo + 1200,
    300,
    800,
    600
  );
}

// ------------------------------------
// DIBUJA EL MERCADER MIRANDO
// HACIA LA DERECHA
// ------------------------------------

function dibujarImagenDerecha(
  imagen,
  x,
  y,
  tamanio
) {
  push();

  translate(x, y);

  // La imagen original mira hacia la izquierda.
  // Se invierte horizontalmente para mirar a la derecha.
  scale(-1, 1);

  image(
    imagen,
    0,
    0,
    tamanio,
    tamanio
  );

  pop();
}

// ------------------------------------
// DIBUJA LOS FRAMES DEL GOLFISTA
// ------------------------------------

function dibujarAnimacion(
  frames,
  x,
  y,
  velocidad,
  tamanio,
  primerFrame,
  cantidadFrames
) {
  let numeroFrame = obtenerFrame(
    cantidadFrames,
    velocidad,
    primerFrame
  );

  push();

  translate(x, y);

  // El Golfista también mira hacia la derecha.
  scale(-1, 1);

  image(
    frames[numeroFrame],
    0,
    0,
    tamanio,
    tamanio
  );

  pop();
}

// ------------------------------------
// DIBUJA LOS FRAMES DEL OJO
// ------------------------------------

function dibujarOjo(
  frames,
  x,
  y,
  velocidad,
  tamanio
) {
  let numeroFrame = obtenerFrame(
    3,
    velocidad,
    0
  );

  push();

  translate(x, y);

  // El Ojo originalmente mira hacia abajo.
  // Esta rotación hace que mire hacia la derecha.
  rotate(-HALF_PI);

  image(
    frames[numeroFrame],
    0,
    0,
    tamanio,
    tamanio
  );

  pop();
}

// ------------------------------------
// OBTIENE EL FRAME ACTUAL
// ------------------------------------

function obtenerFrame(
  cantidadFrames,
  velocidad,
  primerFrame
) {
  let tiempo = millis() - inicioAnimacion;

  let numero = floor(
    tiempo / velocidad
  );

  return primerFrame + numero % cantidadFrames;
}

// ------------------------------------
// CAMBIA DE ESTADO
// ------------------------------------

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  inicioEstado = millis();
}

// ------------------------------------
// VERIFICA SI TERMINÓ UN TIEMPO
// ------------------------------------

function terminoTiempo(
  tiempoActual,
  tiempoLimite
) {
  return tiempoActual >= tiempoLimite;
}

// ------------------------------------
// BOTÓN DE REINICIO
// ------------------------------------

function dibujarBotonReiniciar() {
  fill(90, 35, 45);
  stroke(255);

  rect(
    630,
    520,
    170,
    50
  );

  noStroke();
  fill(255);

  textFont(fuenteTerraria);
  textSize(22);

  text(
    "REINICIAR",
    715,
    545
  );
}

// ------------------------------------
// REINICIA TODA LA ANIMACIÓN
// ------------------------------------

function mousePressed() {
  if (
    estado == LOGO_FINAL &&
    mouseX >= 630 &&
    mouseX <= 800 &&
    mouseY >= 520 &&
    mouseY <= 570
  ) {
    estado = CAMINANDO;

    inicioAnimacion = millis();
    inicioEstado = millis();

    posicionFondo = 0;

    xMercader = 160;
    xGolfista = 310;
  }
}
