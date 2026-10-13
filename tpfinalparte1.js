let rutas_fondos = [
  "data/alfombra.jpeg",
  "data/arribadeltren.jpeg",
  "data/bunker.jpeg",
  "data/calle.jpeg",
  "data/carrito.jpeg",
  "data/escaleras.jpeg",
  "data/esquina.jpeg",
  "data/tren.jpeg",
  "data/trenendojo.jpeg"
];

let fondos = [];
let animaciones = {};
let fuente;
let sonido = null;
let sonido_iniciado = false;
let pantalla = 0;
let pista_seguida = "";
let confia_neil = false;
let evidencia_publica = false;

let escenas = [
  {
    titulo: "el ultimo tren de las 3:16",
    texto: "una investigacion de scott pilgrim",
    fondo: 3,
    personaje: "scott",
    estado: "quieto",
    opciones: [
      { texto: "comenzar investigacion", destino: 1 },
      { texto: "creditos", destino: 19 }
    ]
  },
  {
    titulo: "recibe y revisa el mensaje",
    texto: "ramona dejo un mensaje de voz antes de desaparecer. al final se oye: «el tren se detuvo a las 3:16... alguien abrio la puerta desde arriba».",
    fondo: 6,
    personaje: "scott",
    estado: "quieto",
    pista: "mensaje",
    opciones: [
      { texto: "investigar mensaje", destino: 2 },
      { texto: "investigar lugar", destino: 3 }
    ]
  },
  {
    titulo: "investigar el mensaje",
    texto: "en el vagon 2426, scott encuentra un boleto roto con la hora 3:16. una fibra violeta quedo enganchada en la tapa de mantenimiento.",
    fondo: 7,
    personaje: "scott",
    estado: "investiga",
    pista: "boleto",
    opciones: [
      { texto: "anotar la pista", destino: 4 }
    ]
  },
  {
    titulo: "investigar el lugar",
    texto: "en la esquina nevada hay huellas que salen de la estacion. junto a ellas, una marca de rueda termina cerca del carrito de comida.",
    fondo: 3,
    personaje: "scott",
    estado: "camina",
    pista: "huellas",
    opciones: [
      { texto: "seguir el rastro", destino: 4 }
    ]
  },
  {
    titulo: "primera pista",
    texto: "el boleto roto y las huellas coinciden con el horario del tren. dos rastros se alejan del vagon: una fibra violeta y barro fresco.",
    fondo: 7,
    personaje: "scott",
    estado: "investiga",
    pista: "boleto",
    opciones: [
      { texto: "comparar las pistas", destino: 5 }
    ]
  },
  {
    titulo: "decide que pista seguir",
    texto: "la fibra apunta al antiguo cine. las huellas bajan por las escaleras del parque. scott debe elegir que rastro seguir primero.",
    fondo: 6,
    personaje: "scott",
    estado: "quieto",
    pista: "fibra",
    opciones: [
      { texto: "seguir la fibra roja", destino: 6, efecto: "seguir_fibra" },
      { texto: "seguir las huellas", destino: 7, efecto: "seguir_huellas" }
    ]
  },
  {
    titulo: "el rastro de la fibra",
    texto: "la fibra termina junto a la alfombra del cine. alli hay una credencial rota de neil, el encargado del carrito. la pista parece clara, demasiado clara.",
    fondo: 0,
    personaje: "scott",
    estado: "investiga",
    pista: "gafete",
    opciones: [
      { texto: "seguir la credencial", destino: 8 }
    ]
  },
  {
    titulo: "el rastro de las huellas",
    texto: "las huellas llegan hasta las escaleras. en el barro aparece una ficha del dojo con las iniciales de neil, el encargado del carrito.",
    fondo: 5,
    personaje: "scott",
    estado: "investiga",
    pista: "huellas",
    opciones: [
      { texto: "seguir la ficha", destino: 8 }
    ]
  },
  {
    titulo: "aparece una pista falsa",
    texto: "un recibo marca una entrega de neil a las 3:16. la credencial y la ficha tambien parecen senalarlo. pero el recibo tiene una mancha de aceite sobre la hora.",
    fondo: 4,
    personaje: "neil",
    estado: "quieto",
    pista: "recibo",
    opciones: [
      { texto: "interrogar a neil", destino: 9 }
    ]
  },
  {
    titulo: "interrogatorio",
    texto: "neil espera en el dojo. dice que solo vendio cafe esa noche y que vio a alguien con una caja metalica subir al techo del tren.",
    fondo: 8,
    personaje: "neil",
    estado: "hablando",
    pista: "recibo",
    opciones: [
      { texto: "confiar", destino: 10, efecto: "confiar" },
      { texto: "desconfiar", destino: 11, efecto: "desconfiar" },
      { texto: "volver al inicio", destino: 0 }
    ]
  },
  {
    titulo: "confiar",
    texto: "neil muestra su registro de ventas: el recibo se imprimio antes de la desaparicion. recuerda un broche con el emblema de gideon en la caja metalica.",
    fondo: 8,
    personaje: "neil",
    estado: "hablando",
    pista: "recibo",
    opciones: [
      { texto: "comprobar el techo del tren", destino: 12 }
    ]
  },
  {
    titulo: "desconfiar",
    texto: "scott compara el reloj del dojo con el recibo. el reloj se habia detenido antes de las 3:16. en el reflejo de una camara se ve a alguien subir al techo.",
    fondo: 8,
    personaje: "scott",
    estado: "investiga",
    pista: "camara",
    opciones: [
      { texto: "comprobar el techo del tren", destino: 12 }
    ]
  },
  {
    titulo: "pista verdadera",
    texto: "sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon. la caja paso por alli: neil decia la verdad.",
    fondo: 1,
    personaje: "gideon",
    estado: "camina",
    pista: "llave",
    opciones: [
      { texto: "reunir la evidencia", destino: 13 }
    ]
  },
  {
    titulo: "decide que hacer con la evidencia",
    texto: "la camara del cine capto la caja y el broche. scott puede entregar todas las pruebas ahora o guardarlas para seguir la senal.",
    fondo: 0,
    personaje: "scott",
    estado: "investiga",
    pista: "camara",
    opciones: [
      { texto: "publicar la evidencia", destino: 14, efecto: "publicar" },
      { texto: "guardarla y seguir la senal", destino: 14, efecto: "guardar" }
    ]
  },
  {
    titulo: "descubrimiento del responsable",
    texto: "la senal lleva a scott hasta el bunker. gideon esta alli con ramona y los registros robados. es el responsable de la desaparicion.",
    fondo: 2,
    personaje: "gideon",
    estado: "quieto",
    pista: "pantallas",
    opciones: [
      { texto: "decidir que hacer", destino: 15 }
    ]
  },
  {
    titulo: "decision final",
    texto: "scott tiene poco tiempo. puede presentar las pruebas, rescatar a ramona o insistir en la pista falsa contra neil.",
    fondo: 2,
    personaje: "scott",
    estado: "quieto",
    pista: "pruebas",
    opciones: [
      { texto: "presentar las pruebas", destino: 16 },
      { texto: "rescatar a ramona", destino: 17 },
      { texto: "acusar a neil", destino: 18 }
    ]
  },
  {
    titulo: "final 1: caso cerrado",
    texto: "scott entrega la evidencia completa. la policia detiene a gideon y ramona queda a salvo. el ultimo tren llega a destino.",
    fondo: 2,
    personaje: "ramona",
    estado: "quieta",
    pista: "pruebas",
    opciones: [
      { texto: "reiniciar", destino: 0 },
      { texto: "creditos", destino: 19 }
    ]
  },
  {
    titulo: "final 2: rescate",
    texto: "scott libera a ramona antes de que llegue la policia. escapan juntos, pero gideon desaparece con parte de la evidencia.",
    fondo: 3,
    personaje: "ramona",
    estado: "camina",
    pista: "llave",
    opciones: [
      { texto: "reiniciar", destino: 0 },
      { texto: "creditos", destino: 19 }
    ]
  },
  {
    titulo: "final 3: pista falsa",
    texto: "scott denuncia a neil por el recibo manipulado. gideon escapa y ramona sigue desaparecida. el caso queda mal cerrado.",
    fondo: 4,
    personaje: "gideon",
    estado: "accion",
    pista: "recibo",
    opciones: [
      { texto: "reiniciar", destino: 0 },
      { texto: "creditos", destino: 19 }
    ]
  }
];

function cargar_frames(rutas) {
  let frames = [];
  for (let i = 0; i < rutas.length; i++) {
    frames.push(loadImage(rutas[i]));
  }
  return frames;
}

function preload() {
  for (let i = 0; i < rutas_fondos.length; i++) {
    fondos.push(loadImage(rutas_fondos[i]));
  }

  animaciones = {
    scott: {
      quieto: cargar_frames([
        "data/scottquieto1.png",
        "data/scottquieto2.png",
        "data/scottquieto3.png",
        "data/scottquieto4.png"
      ]),
      camina: cargar_frames([
        "data/scottcamina1.png",
        "data/scottcamina2.png",
        "data/scottcamina3.png",
        "data/scottcamina4.png"
      ]),
      investiga: cargar_frames([
        "data/scottinv1.png",
        "data/scottinv2.png",
        "data/scottinv3.png"
      ])
    },
    gideon: {
      quieto: cargar_frames([
        "data/gideonquieto1.png",
        "data/gideonquieto2.png",
        "data/gideonquieto3.png",
        "data/gideonquieto4.png"
      ]),
      camina: cargar_frames([
        "data/gideoncamina1.png",
        "data/gideoncamina2.png",
        "data/gideoncamina3.png",
        "data/gideoncamina4.png"
      ]),
      accion: cargar_frames([
        "data/gideonaccion1.png",
        "data/gideonaccion2.png",
        "data/gideonaccion3.png",
        "data/gideonaccion4.png"
      ])
    },
    neil: {
      quieto: cargar_frames([
        "data/neilquieto1.png",
        "data/neilquieto2.png",
        "data/neilquieto3.png",
        "data/nielquieto4.png"
      ]),
      hablando: cargar_frames([
        "data/neilhablando1.png",
        "data/neilhablando2.png",
        "data/neilhablando3.png"
      ])
    },
    ramona: {
      quieta: cargar_frames([
        "data/ramonaquieta1.png",
        "data/ramonaquieta2.png",
        "data/ramonaquieta3.png"
      ]),
      camina: cargar_frames([
        "data/ramonacamina1.png",
        "data/ramonacamina2.png",
        "data/ramonacamina3.png",
        "data/ramonacamina4.png",
        "data/ramonacamina5.png",
        "data/ramonacamina6.png"
      ])
    }
  };

  fuente = loadFont("data/Dusty.ttf");

  if (typeof loadSound === "function") {
    sonido = loadSound("data/255895__cgarrido__inverse-echoes.aiff");
  }
}

function setup() {
  createCanvas(800, 450);
  frameRate(30);
  noSmooth();
  textFont(fuente);
}

function obtener_frame(frames, velocidad) {
  let indice = floor(frameCount / velocidad) % frames.length;
  return frames[indice];
}

function dibujar_personaje(personaje, estado, x, y, alto, velocidad) {
  let frames = animaciones[personaje][estado];
  let imagen_actual = obtener_frame(frames, velocidad);
  let ancho = alto * imagen_actual.width / imagen_actual.height;
  imageMode(CENTER);
  image(imagen_actual, x, y, ancho, alto);
}

function dibujar_pista(tipo, x, y) {
  push();
  rectMode(CORNER);
  noStroke();
  fill(12, 13, 29, 235);
  rect(x, y, 94, 92, 7);
  fill(255, 218, 92);
  stroke(255, 218, 92);
  strokeWeight(3);

  if (tipo === "mensaje") {
    noFill();
    rect(x + 28, y + 10, 38, 49, 4);
    line(x + 36, y + 45, x + 58, y + 45);
    ellipse(x + 47, y + 53, 4, 4);
  } else if (tipo === "boleto") {
    noFill();
    rect(x + 15, y + 18, 64, 32, 3);
    line(x + 20, y + 27, x + 46, y + 27);
    line(x + 20, y + 36, x + 39, y + 36);
    fill(255, 218, 92);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text("3:16", x + 62, y + 36);
  } else if (tipo === "huellas") {
    noStroke();
    ellipse(x + 34, y + 28, 14, 22);
    ellipse(x + 53, y + 43, 14, 22);
    ellipse(x + 30, y + 54, 14, 22);
    ellipse(x + 58, y + 20, 14, 22);
  } else if (tipo === "fibra") {
    noFill();
    stroke(255, 52, 141);
    strokeWeight(5);
    bezier(x + 18, y + 52, x + 36, y + 10, x + 56, y + 76, x + 76, y + 29);
  } else if (tipo === "recibo") {
    noFill();
    stroke(255, 218, 92);
    strokeWeight(3);
    rect(x + 25, y + 11, 46, 53);
    line(x + 32, y + 25, x + 64, y + 25);
    line(x + 32, y + 35, x + 62, y + 35);
    line(x + 32, y + 45, x + 55, y + 45);
  } else if (tipo === "gafete") {
    noFill();
    rect(x + 29, y + 17, 38, 42, 4);
    ellipse(x + 48, y + 32, 13, 13);
    line(x + 38, y + 48, x + 58, y + 48);
  } else if (tipo === "llave") {
    noFill();
    ellipse(x + 34, y + 34, 24, 24);
    line(x + 46, y + 42, x + 69, y + 58);
    line(x + 61, y + 52, x + 67, y + 46);
    line(x + 67, y + 58, x + 73, y + 52);
  } else if (tipo === "camara") {
    noFill();
    rect(x + 19, y + 21, 56, 36, 5);
    ellipse(x + 48, y + 39, 19, 19);
    line(x + 31, y + 17, x + 41, y + 17);
  } else if (tipo === "pantallas") {
    noFill();
    rect(x + 15, y + 18, 28, 25, 3);
    rect(x + 50, y + 18, 28, 25, 3);
    rect(x + 32, y + 48, 30, 20, 3);
    line(x + 28, y + 45, x + 28, y + 50);
    line(x + 63, y + 45, x + 63, y + 50);
  } else if (tipo === "pruebas") {
    noFill();
    rect(x + 23, y + 12, 49, 55, 3);
    line(x + 33, y + 27, x + 61, y + 27);
    line(x + 33, y + 38, x + 61, y + 38);
    line(x + 33, y + 49, x + 55, y + 49);
  }

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(tipo, x + 47, y + 79);
  pop();
}

function dibujar_boton(opcion, indice, cantidad) {
  let ancho = (720 - (cantidad - 1) * 12) / cantidad;
  let x = 40 + indice * (ancho + 12);
  let y = 390;

  noStroke();
  if (indice === 0) {
    fill(203, 37, 104);
  } else if (indice === 1) {
    fill(24, 145, 177);
  } else {
    fill(87, 65, 143);
  }

  rect(x, y, ancho, 40, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(opcion.texto, x + 5, y + 3, ancho - 10, 34);
}

function cambiar_pantalla(destino) {
  pantalla = destino;

  if (destino === 0) {
    pista_seguida = "";
    confia_neil = false;
    evidencia_publica = false;
  }
}

function draw() {
  imageMode(CENTER);
  textFont(fuente);
  textAlign(LEFT, TOP);

  if (pantalla === 0) {
    image(fondos[escenas[0].fondo], 400, 225, 800, 450);
    noStroke();
    fill(7, 8, 27, 205);
    rect(0, 0, 800, 450);
    fill(255, 47, 132);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("expediente policial · 03:16", 400, 66);
    fill(255);
    textSize(38);
    text("el ultimo tren", 400, 112);
    fill(73, 226, 237);
    textSize(28);
    text("de las 3:16", 400, 151);

    dibujar_personaje("scott", "quieto", 250, 286, 132, 7);
    dibujar_personaje("gideon", "quieto", 550, 286, 132, 8);

    fill(255);
    textSize(15);
    text("haz clic en una opcion para comenzar", 400, 353);

    for (let i = 0; i < escenas[0].opciones.length; i++) {
      dibujar_boton(escenas[0].opciones[i], i, escenas[0].opciones.length);
    }

    return;
  }

  if (pantalla === 19) {
    image(fondos[0], 400, 225, 800, 450);
    noStroke();
    fill(8, 8, 25, 220);
    rect(0, 0, 800, 450);

    fill(255, 47, 132);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("creditos", 400, 54);

    dibujar_personaje("scott", "camina", 190, 177, 98, 7);
    dibujar_personaje("ramona", "camina", 330, 177, 98, 8);
    dibujar_personaje("gideon", "camina", 470, 177, 98, 8);
    dibujar_personaje("neil", "hablando", 610, 177, 98, 9);

    fill(255);
    textSize(19);
    text("florencia gomez orieta · elena pucheta", 400, 264);
    textSize(17);
    text("comision 2", 400, 294);
    fill(73, 226, 237);
    textSize(15);
    text("basado en scott pilgrim, creado por bryan lee o'malley", 400, 327);

    dibujar_boton({ texto: "volver al menu" }, 0, 1);
    return;
  }

  let escena = escenas[pantalla];
  image(fondos[escena.fondo], 400, 225, 800, 450);

  if (escena.personaje && escena.estado) {
    let x_personaje = 116;
    let y_personaje = 230;
    let alto_personaje = 124;

    if (pantalla === 8 || pantalla === 9 || pantalla === 10) {
      x_personaje = 126;
      y_personaje = 226;
    }

    if (pantalla === 14 || pantalla === 18) {
      x_personaje = 650;
      y_personaje = 224;
      alto_personaje = 140;
    }

    dibujar_personaje(
      escena.personaje,
      escena.estado,
      x_personaje,
      y_personaje,
      alto_personaje,
      7
    );
  }

  if (escena.pista) {
    dibujar_pista(escena.pista, 684, 166);
  }

  noStroke();
  fill(8, 9, 24, 228);
  rect(20, 276, 760, 160, 7);

  fill(255, 47, 132);
  textAlign(LEFT, TOP);
  textSize(21);
  text(escena.titulo, 42, 293, 700, 30);

  let narrativa = escena.texto;

  if (pantalla === 8 && pista_seguida === "fibra") {
    narrativa = "la fibra roja termina junto al carrito. neil tiene una prenda parecida y un recibo marca las 3:16. la pista parece incriminarlo, pero la hora esta manchada.";
  }

  if (pantalla === 8 && pista_seguida === "huellas") {
    narrativa = "las huellas terminan junto al carrito. neil estaba alli a las 3:16 y su ficha quedo en el barro. la pista parece incriminarlo, pero el recibo tiene aceite sobre la hora.";
  }

  if (pantalla === 12 && confia_neil) {
    narrativa = "neil cumplio su palabra. sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon en la caja metalica.";
  }

  if (pantalla === 12 && !confia_neil) {
    narrativa = "la camara confirma que neil no pudo llevar la caja. sobre el tren, scott encuentra la tapa forzada y una marca del broche de gideon.";
  }

  if (pantalla === 14 && evidencia_publica) {
    narrativa = "la evidencia publicada permite rastrear la caja. gideon esta en el bunker con ramona y los registros robados: scott descubre al responsable.";
  }

  if (pantalla === 14 && !evidencia_publica) {
    narrativa = "scott sigue la senal de la camara hasta el bunker. gideon esta alli con ramona y los registros robados: scott descubre al responsable.";
  }

  fill(255);
  textSize(16);
  textLeading(19);
  text(narrativa, 42, 326, 710, 54);

  for (let i = 0; i < escena.opciones.length; i++) {
    dibujar_boton(escena.opciones[i], i, escena.opciones.length);
  }
}

function mousePressed() {
  if (!sonido_iniciado && sonido && sonido.isLoaded()) {
    sonido.loop();
    sonido_iniciado = true;
  }

  let opciones;

  if (pantalla === 19) {
    opciones = [{ texto: "volver al menu", destino: 0 }];
  } else {
    opciones = escenas[pantalla].opciones;
  }

  let ancho = (720 - (opciones.length - 1) * 12) / opciones.length;

  for (let i = 0; i < opciones.length; i++) {
    let x = 40 + i * (ancho + 12);
    let y = 390;

    if (
      mouseX >= x &&
      mouseX <= x + ancho &&
      mouseY >= y &&
      mouseY <= y + 40
    ) {
      let opcion = opciones[i];

      if (opcion.efecto === "seguir_fibra") {
        pista_seguida = "fibra";
      }

      if (opcion.efecto === "seguir_huellas") {
        pista_seguida = "huellas";
      }

      if (opcion.efecto === "confiar") {
        confia_neil = true;
      }

      if (opcion.efecto === "desconfiar") {
        confia_neil = false;
      }

      if (opcion.efecto === "publicar") {
        evidencia_publica = true;
      }

      if (opcion.efecto === "guardar") {
        evidencia_publica = false;
      }

      cambiar_pantalla(opcion.destino);
      return false;
    }
  }
}
