const ancho = 800;
const alto = 450;
const recorte_superior = 0.055;
const alumno = "completar con tu nombre";
const autor_obra = "bryan lee o'malley";

const rutas_fondos = [
  "assets/fondos/carrito.jpeg",
  "assets/fondos/escaleras.jpeg",
  "assets/fondos/esquina.jpeg",
  "assets/fondos/tren.jpeg",
  "assets/fondos/trenendojo.jpeg",
  "assets/fondos/calle.jpeg",
  "assets/fondos/alfombra.jpeg",
  "assets/fondos/arribadeltren.jpeg",
  "assets/fondos/bunker.jpeg"
];

let fondos = [];
let fuente_pixel = null;
let pantalla_actual = 0;

const elenco = [
  {
    nombre: "scott",
    ruta: "assets/sprites/scott.png",
    columnas: 4,
    filas: 4,
    fila_quieto: 0,
    fila_caminar: 1,
    fila_investigar: 2,
    fila_accion: 3,
    cuadros_por_fila: 4,
    hoja: null,
    ancho_frame: 0,
    alto_frame: 0,
    frames_quieto: [],
    frames_caminar: [],
    frames_investigar: [],
    frames_accion: []
  },
  {
    nombre: "ramona",
    ruta: "assets/sprites/ramona.png",
    columnas: 4,
    filas: 4,
    fila_quieto: 0,
    fila_caminar: 1,
    fila_investigar: 2,
    fila_accion: 3,
    cuadros_por_fila: 4,
    hoja: null,
    ancho_frame: 0,
    alto_frame: 0,
    frames_quieto: [],
    frames_caminar: [],
    frames_investigar: [],
    frames_accion: []
  },
  {
    nombre: "gideon",
    ruta: "assets/sprites/gideon.png",
    columnas: 4,
    filas: 4,
    fila_quieto: 0,
    fila_caminar: 1,
    fila_investigar: 2,
    fila_accion: 3,
    cuadros_por_fila: 4,
    hoja: null,
    ancho_frame: 0,
    alto_frame: 0,
    frames_quieto: [],
    frames_caminar: [],
    frames_investigar: [],
    frames_accion: []
  },
  {
    nombre: "wallace",
    ruta: "assets/sprites/wallace.png",
    columnas: 4,
    filas: 4,
    fila_quieto: 0,
    fila_caminar: 1,
    fila_investigar: 2,
    fila_accion: 3,
    cuadros_por_fila: 4,
    hoja: null,
    ancho_frame: 0,
    alto_frame: 0,
    frames_quieto: [],
    frames_caminar: [],
    frames_investigar: [],
    frames_accion: []
  }
];

const pantallas = [
  {
    titulo: "",
    texto: [],
    fondo: 5,
    personajes: [
      { id: 0, estado: "quieto", x: 72, y: 125, alto: 120 }
    ],
    botones: [
      { texto: "iniciar caso", destino: 1 },
      { texto: "créditos", destino: 15 }
    ]
  },
  {
    titulo: "1 · el aviso",
    texto: [
      "ramona, reportera de investigación, viajaba en el último tren.",
      "la cámara perdió imagen durante 47 segundos, justo a las 3:16.",
      "nadie figura bajando en las estaciones siguientes."
    ],
    fondo: 3,
    personajes: [
      { id: 0, estado: "investigar", x: 65, y: 132, alto: 105 }
    ],
    botones: [{ texto: "revisar el vagón", destino: 2 }]
  },
  {
    titulo: "2 · el vagón cerrado",
    texto: [
      "scott encuentra un boleto roto, una fibra roja y una taza tibia.",
      "la fibra no pertenece a la ropa de ramona.",
      "¿busca testigos o sigue las huellas hacia el jardín?"
    ],
    fondo: 3,
    pista: "boleto",
    personajes: [
      { id: 0, estado: "investigar", x: 65, y: 132, alto: 105 }
    ],
    botones: [
      { texto: "buscar testigos", destino: 3 },
      { texto: "seguir las huellas", destino: 5 }
    ]
  },
  {
    titulo: "3 · la esquina",
    texto: [
      "una testigo vio a un empleado del tren cruzar la calle con una caja.",
      "miraba hacia atrás cada pocos pasos.",
      "recuerda que se detuvo junto a un carrito de comida."
    ],
    fondo: 2,
    personajes: [
      { id: 0, estado: "quieto", x: 85, y: 132, alto: 105 },
      { id: 3, estado: "quieto", x: 390, y: 132, alto: 100 }
    ],
    botones: [{ texto: "hablar con el vendedor", destino: 4 }]
  },
  {
    titulo: "4 · el carrito",
    texto: [
      "wallace recuerda la caja: tenía una calcomanía del dojo akagi.",
      "alguien pagó dos cafés con una ficha de guardarropa.",
      "el recibo marca las 3:16 y tiene una dirección escrita detrás."
    ],
    fondo: 0,
    pista: "recibo",
    personajes: [
      { id: 0, estado: "investigar", x: 85, y: 132, alto: 105 },
      { id: 3, estado: "quieto", x: 390, y: 132, alto: 100 }
    ],
    botones: [{ texto: "seguir la dirección", destino: 5 }]
  },
  {
    titulo: "5 · las escaleras",
    texto: [
      "en el jardín, scott encuentra barro fresco y una llave pequeña.",
      "la llave tiene grabado el emblema del dojo akagi.",
      "alguien trató de ocultar sus huellas antes de llegar a la calle."
    ],
    fondo: 1,
    pista: "llave",
    personajes: [
      { id: 0, estado: "caminar", x: 85, y: 132, alto: 105 }
    ],
    botones: [{ texto: "ir al dojo", destino: 6 }]
  },
  {
    titulo: "6 · el dojo cerrado",
    texto: [
      "una cámara vieja muestra a gideon hablando con un empleado del tren.",
      "la grabación se corta cuando aparece el uniforme.",
      "scott oye pasos afuera: alguien descubrió la investigación."
    ],
    fondo: 4,
    pista: "fotograma",
    personajes: [
      { id: 0, estado: "investigar", x: 65, y: 132, alto: 105 },
      { id: 2, estado: "quieto", x: 385, y: 132, alto: 105 }
    ],
    botones: [
      { texto: "seguirlo por la calle", destino: 7 },
      { texto: "buscar otra salida", destino: 8 }
    ]
  },
  {
    titulo: "7 · la persecución",
    texto: [
      "el sospechoso cruza la calle nevada y deja caer una tarjeta de gala.",
      "en el reverso hay una hora escrita: 3:21.",
      "la tarjeta señala una entrada de servicio junto a las vías."
    ],
    fondo: 5,
    pista: "pase",
    personajes: [
      { id: 0, estado: "caminar", x: 65, y: 132, alto: 105 },
      { id: 2, estado: "caminar", x: 390, y: 132, alto: 105 }
    ],
    botones: [{ texto: "volver a las vías", destino: 8 }]
  },
  {
    titulo: "8 · sobre el tren",
    texto: [
      "scott encuentra una compuerta de mantenimiento sobre el tren.",
      "detrás hay un túnel oculto y un pase de servicio para la gala.",
      "ramona pudo salir sin usar ninguna estación."
    ],
    fondo: 7,
    pista: "compuerta",
    personajes: [
      { id: 0, estado: "accion", x: 75, y: 132, alto: 105 }
    ],
    botones: [{ texto: "seguir la pista de la gala", destino: 9 }]
  },
  {
    titulo: "9 · la gala",
    texto: [
      "la cámara muestra que gideon salió a las 3:14 y volvió a las 3:21.",
      "estuvo fuera justo durante la desaparición de ramona.",
      "scott sigue la ruta de servicio hasta un búnker."
    ],
    fondo: 6,
    pista: "registro",
    personajes: [
      { id: 0, estado: "investigar", x: 65, y: 132, alto: 105 },
      { id: 2, estado: "quieto", x: 385, y: 132, alto: 105 }
    ],
    botones: [{ texto: "seguirlo al búnker", destino: 10 }]
  },
  {
    titulo: "10 · el búnker",
    texto: [
      "tras una puerta oculta, scott encuentra monitores con cámaras del tren.",
      "ramona está viva; gideon la retuvo porque descubrió sus registros.",
      "el sospechoso escucha pasos y bloquea la salida."
    ],
    fondo: 8,
    pista: "monitor",
    personajes: [
      { id: 0, estado: "accion", x: 55, y: 132, alto: 105 },
      { id: 1, estado: "quieto", x: 295, y: 132, alto: 105 },
      { id: 2, estado: "quieto", x: 430, y: 132, alto: 105 }
    ],
    botones: [{ texto: "enfrentar a gideon", destino: 11 }]
  },
  {
    titulo: "11 · la decisión",
    texto: [
      "scott tiene el boleto, el recibo y la grabación del dojo.",
      "wallace también parece sospechoso, pero no hay pruebas contra él.",
      "ramona pide que no arriesgue a nadie por cerrar el caso rápido."
    ],
    fondo: 8,
    pista: "pruebas",
    personajes: [
      { id: 0, estado: "accion", x: 55, y: 132, alto: 105 },
      { id: 1, estado: "quieto", x: 295, y: 132, alto: 105 },
      { id: 2, estado: "accion", x: 430, y: 132, alto: 105 }
    ],
    botones: [
      { texto: "presentar las pruebas", destino: 12 },
      { texto: "rescatar a ramona", destino: 13 },
      { texto: "acusar a wallace", destino: 14 }
    ]
  },
  {
    titulo: "final 1 · caso cerrado",
    texto: [
      "las pistas prueban que gideon usó el túnel para sacar a ramona del tren.",
      "la policía lo detiene y ramona entrega los registros que descubrió.",
      "el tren vuelve a circular; scott revisa cada cámara."
    ],
    fondo: 8,
    pista: "pruebas",
    personajes: [
      { id: 0, estado: "quieto", x: 55, y: 132, alto: 105 },
      { id: 1, estado: "caminar", x: 295, y: 132, alto: 105 },
      { id: 2, estado: "accion", x: 430, y: 132, alto: 105 }
    ],
    botones: [
      { texto: "volver al menú", destino: 0 },
      { texto: "ver créditos", destino: 15 }
    ]
  },
  {
    titulo: "final 2 · la huida",
    texto: [
      "scott logra sacar a ramona, pero gideon escapa por el túnel.",
      "sin presentar todas las pruebas, el caso queda abierto.",
      "ramona está a salvo; la próxima llamada podría traer otra pista."
    ],
    fondo: 5,
    personajes: [
      { id: 0, estado: "accion", x: 55, y: 132, alto: 105 },
      { id: 1, estado: "caminar", x: 295, y: 132, alto: 105 },
      { id: 2, estado: "caminar", x: 430, y: 132, alto: 105 }
    ],
    botones: [
      { texto: "volver al menú", destino: 0 },
      { texto: "ver créditos", destino: 15 }
    ]
  },
  {
    titulo: "final 3 · la pista falsa",
    texto: [
      "wallace es detenido por el recibo, pero la grabación demuestra su inocencia.",
      "gideon escapa y ramona sigue desaparecida.",
      "scott vuelve al tren: todavía puede revisar el caso."
    ],
    fondo: 3,
    personajes: [
      { id: 0, estado: "quieto", x: 55, y: 132, alto: 105 },
      { id: 2, estado: "caminar", x: 295, y: 132, alto: 105 },
      { id: 3, estado: "quieto", x: 430, y: 132, alto: 100 }
    ],
    botones: [
      { texto: "volver al menú", destino: 0 },
      { texto: "ver créditos", destino: 15 }
    ]
  },
  {
    titulo: "créditos",
    texto: [
      "tp2 · el último tren de las 3:16",
      "alumno/a: " + alumno,
      "obra y personajes: scott pilgrim, de " + autor_obra,
      "fondos y sprites: completar con las fuentes utilizadas."
    ],
    fondo: 6,
    personajes: [
      { id: 0, estado: "caminar", x: 75, y: 132, alto: 105 }
    ],
    botones: [{ texto: "volver al menú", destino: 0 }]
  }
];

function preload() {
  for (let i = 0; i < rutas_fondos.length; i++) {
    let indice = i;

    fondos[i] = loadImage(
      rutas_fondos[i],
      function (imagen) {
        fondos[indice] = imagen;
      },
      function () {
        fondos[indice] = null;
      }
    );
  }

  for (let i = 0; i < elenco.length; i++) {
    let indice = i;

    elenco[i].hoja = loadImage(
      elenco[i].ruta,
      function (imagen) {
        elenco[indice].hoja = imagen;
      },
      function () {
        elenco[indice].hoja = null;
      }
    );
  }

  fuente_pixel = loadFont(
    "assets/fuentes/fuente_pixel.ttf",
    function (fuente) {
      fuente_pixel = fuente;
    },
    function () {
      fuente_pixel = null;
    }
  );
}

function setup() {
  createCanvas(ancho, alto);

  if (fuente_pixel) {
    textFont(fuente_pixel);
  } else {
    textFont("monospace");
  }

  for (let i = 0; i < elenco.length; i++) {
    configurar_frames(elenco[i]);
  }
}

function configurar_frames(personaje) {
  if (!personaje.hoja || personaje.columnas <= 0 || personaje.filas <= 0) {
    return;
  }

  personaje.ancho_frame = floor(personaje.hoja.width / personaje.columnas);
  personaje.alto_frame = floor(personaje.hoja.height / personaje.filas);

  personaje.frames_quieto = crear_frames(
    personaje.hoja,
    personaje.fila_quieto,
    personaje.cuadros_por_fila,
    personaje.ancho_frame,
    personaje.alto_frame
  );

  personaje.frames_caminar = crear_frames(
    personaje.hoja,
    personaje.fila_caminar,
    personaje.cuadros_por_fila,
    personaje.ancho_frame,
    personaje.alto_frame
  );

  personaje.frames_investigar = crear_frames(
    personaje.hoja,
    personaje.fila_investigar,
    personaje.cuadros_por_fila,
    personaje.ancho_frame,
    personaje.alto_frame
  );

  personaje.frames_accion = crear_frames(
    personaje.hoja,
    personaje.fila_accion,
    personaje.cuadros_por_fila,
    personaje.ancho_frame,
    personaje.alto_frame
  );
}

function draw() {
  background(17, 15, 30);

  const escena = pantallas[pantalla_actual];

  if (fondos[escena.fondo]) {
    dibujar_fondo(fondos[escena.fondo]);
  }

  if (pantalla_actual === 0) {
    dibujar_menu();
    return;
  }

  if (escena.personajes) {
    for (let i = 0; i < escena.personajes.length; i++) {
      dibujar_personaje(escena.personajes[i]);
    }
  }

  if (escena.pista) {
    dibujar_pista(escena.pista);
  }

  fill(8, 10, 22, 225);
  rect(14, 246, 772, 188);

  fill(255, 226, 92);
  textAlign(LEFT, TOP);
  textSize(18);
  text(escena.titulo, 28, 258);

  fill(255);
  textSize(12);

  for (let i = 0; i < escena.texto.length; i++) {
    text(escena.texto[i], 28, 289 + i * 18);
  }

  for (let i = 0; i < escena.botones.length; i++) {
    const x = posicion_x_boton(i, escena.botones.length);
    const y = 382;

    fill(8, 8, 16);
    rect(x - 3, y - 3, 250, 46);

    fill(125, 38, 155);
    rect(x, y, 244, 40);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(escena.botones[i].texto, x + 122, y + 20);
  }
}

function dibujar_menu() {
  const escena = pantallas[0];

  for (let i = 0; i < escena.personajes.length; i++) {
    dibujar_personaje(escena.personajes[i]);
  }

  fill(12, 8, 24, 220);
  rect(105, 38, 590, 245);

  fill(50, 220, 230);
  rect(126, 60, 548, 5);

  fill(255, 70, 170);
  rect(126, 255, 548, 5);

  textAlign(CENTER, CENTER);

  fill(255, 225, 75);
  textSize(14);
  text("caso interactivo", 400, 86);

  fill(0);
  textSize(30);
  text("el último tren", 403, 139);

  fill(255);
  text("el último tren", 400, 136);

  fill(50, 220, 230);
  textSize(22);
  text("de las 3:16", 400, 178);

  fill(255);
  textSize(11);
  text("una investigación en toronto", 400, 222);

  for (let i = 0; i < escena.botones.length; i++) {
    const x = posicion_x_boton(i, escena.botones.length);
    const y = 382;

    fill(8, 8, 16);
    rect(x - 3, y - 3, 250, 46);

    if (i === 0) {
      fill(185, 45, 150);
    } else {
      fill(45, 160, 200);
    }

    rect(x, y, 244, 40);

    fill(255);
    textSize(12);
    text(escena.botones[i].texto, x + 122, y + 20);
  }
}

function dibujar_fondo(imagen) {
  let sx = 0;
  let sy = imagen.height * recorte_superior;
  let sw = imagen.width;
  let sh = imagen.height - sy;

  const proporcion_canvas = ancho / alto;
  const proporcion_imagen = sw / sh;

  if (proporcion_imagen > proporcion_canvas) {
    const nuevo_ancho = sh * proporcion_canvas;
    sx = (sw - nuevo_ancho) / 2;
    sw = nuevo_ancho;
  } else {
    const nuevo_alto = sw / proporcion_canvas;
    sy += (sh - nuevo_alto) / 2;
    sh = nuevo_alto;
  }

  image(imagen, 0, 0, ancho, alto, sx, sy, sw, sh);
}

function dibujar_personaje(actor) {
  const personaje = elenco[actor.id];

  if (!personaje) {
    return;
  }

  let frames = personaje.frames_quieto;
  let velocidad = 12;

  switch (actor.estado) {
    case "caminar":
      frames = personaje.frames_caminar;
      velocidad = 6;
      break;

    case "investigar":
      frames = personaje.frames_investigar;
      velocidad = 11;
      break;

    case "accion":
      frames = personaje.frames_accion;
      velocidad = 5;
      break;

    default:
      frames = personaje.frames_quieto;
      velocidad = 12;
      break;
  }

  const frame = frame_actual(frames, velocidad);

  if (frame && personaje.alto_frame > 0) {
    const escala = actor.alto / personaje.alto_frame;
    const ancho_personaje = personaje.ancho_frame * escala;
    image(frame, actor.x, actor.y, ancho_personaje, actor.alto);
  } else {
    let rojo = 65;
    let verde = 130;
    let azul = 210;
    const ancho_personaje = actor.alto * 0.48;

    if (actor.id === 1) {
      rojo = 220;
      verde = 90;
      azul = 170;
    } else if (actor.id === 2) {
      rojo = 190;
      verde = 55;
      azul = 65;
    } else if (actor.id === 3) {
      rojo = 70;
      verde = 190;
      azul = 130;
    }

    fill(rojo, verde, azul);
    rect(actor.x + ancho_personaje * 0.28, actor.y,
         ancho_personaje * 0.44, actor.alto * 0.25);
    rect(actor.x + ancho_personaje * 0.16, actor.y + actor.alto * 0.25,
         ancho_personaje * 0.68, actor.alto * 0.38);
    rect(actor.x + ancho_personaje * 0.2, actor.y + actor.alto * 0.63,
         ancho_personaje * 0.24, actor.alto * 0.37);
    rect(actor.x + ancho_personaje * 0.56, actor.y + actor.alto * 0.63,
         ancho_personaje * 0.24, actor.alto * 0.37);
  }
}

function dibujar_pista(tipo) {
  const x = 565;
  const y = 35;
  const w = 210;
  const h = 190;

  fill(5, 5, 15, 235);
  rect(x - 5, y - 5, w + 10, h + 10);

  fill(231, 220, 184);
  rect(x, y, w, h);

  fill(22, 18, 35);
  textAlign(CENTER, CENTER);
  textSize(9);

  if (tipo === "boleto") {
    fill(250, 235, 180);
    rect(x + 25, y + 50, 160, 65);
    fill(160, 35, 65);
    rect(x + 38, y + 58, 8, 48);
    fill(20, 20, 30);
    text("boleto roto", x + 105, y + 68);
    text("3:16", x + 105, y + 91);
    fill(205, 35, 60);
    rect(x + 65, y + 127, 90, 4);
  } else if (tipo === "recibo") {
    fill(255);
    rect(x + 48, y + 42, 115, 112);
    fill(20);
    text("dos cafés", x + 105, y + 67);
    text("hora: 3:16", x + 105, y + 91);
    fill(180, 35, 60);
    rect(x + 75, y + 112, 60, 22);
    fill(255);
    text("akagi", x + 105, y + 123);
  } else if (tipo === "llave") {
    fill(180, 130, 35);
    rect(x + 55, y + 84, 100, 18);
    rect(x + 45, y + 74, 25, 38);
    fill(231, 220, 184);
    rect(x + 51, y + 81, 13, 24);
    fill(180, 130, 35);
    rect(x + 140, y + 78, 14, 31);
    rect(x + 158, y + 91, 14, 18);
    fill(20);
    text("dojo akagi", x + 105, y + 145);
  } else if (tipo === "fotograma") {
    fill(15, 18, 28);
    rect(x + 20, y + 40, 170, 112);
    fill(50, 220, 230);
    rect(x + 32, y + 52, 145, 5);
    fill(185, 45, 150);
    rect(x + 65, y + 75, 24, 52);
    fill(70, 160, 100);
    rect(x + 112, y + 75, 24, 52);
    fill(255);
    text("gideon + empleado", x + 105, y + 140);
  } else if (tipo === "pase") {
    fill(190, 35, 100);
    rect(x + 38, y + 44, 134, 104);
    fill(255, 220, 75);
    rect(x + 48, y + 54, 114, 5);
    fill(255);
    text("entrada de gala", x + 105, y + 85);
    text("hora: 3:21", x + 105, y + 112);
  } else if (tipo === "compuerta") {
    fill(45, 65, 75);
    rect(x + 28, y + 42, 154, 112);
    fill(10, 12, 20);
    rect(x + 45, y + 57, 120, 80);
    fill(215, 175, 65);
    rect(x + 83, y + 67, 45, 7);
    rect(x + 83, y + 122, 45, 7);
    rect(x + 83, y + 67, 7, 62);
    rect(x + 121, y + 67, 7, 62);
    fill(20);
    text("túnel oculto", x + 105, y + 171);
  } else if (tipo === "registro") {
    fill(15, 18, 28);
    rect(x + 24, y + 42, 162, 112);
    fill(50, 220, 230);
    rect(x + 39, y + 62, 130, 4);
    fill(255);
    text("sale · 3:14", x + 105, y + 87);
    text("vuelve · 3:21", x + 105, y + 116);
    fill(185, 45, 150);
    rect(x + 39, y + 137, 130, 4);
  } else if (tipo === "monitor") {
    fill(15, 18, 28);
    rect(x + 20, y + 35, 170, 120);
    fill(50, 220, 230);
    rect(x + 32, y + 48, 65, 45);
    fill(185, 45, 150);
    rect(x + 112, y + 48, 65, 45);
    fill(240, 230, 180);
    rect(x + 55, y + 105, 105, 5);
    fill(255);
    text("ramona está viva", x + 105, y + 136);
  } else if (tipo === "pruebas") {
    fill(250, 235, 180);
    rect(x + 22, y + 50, 48, 75);
    fill(180, 35, 60);
    rect(x + 30, y + 65, 7, 44);
    fill(255);
    rect(x + 80, y + 50, 48, 75);
    fill(20);
    text("3:16", x + 104, y + 80);
    fill(185, 45, 150);
    rect(x + 138, y + 50, 48, 75);
    fill(255);
    text("pruebas", x + 105, y + 157);
  }
}

function crear_frames(hoja, fila, cantidad, ancho_frame, alto_frame) {
  let frames = [];

  if (!hoja || fila < 0 || fila >= floor(hoja.height / alto_frame)) {
    return frames;
  }

  for (let i = 0; i < cantidad; i++) {
    const x = floor(i * ancho_frame);
    const y = floor(fila * alto_frame);
    frames[i] = hoja.get(
      x,
      y,
      floor(ancho_frame),
      floor(alto_frame)
    );
  }

  return frames;
}

function frame_actual(frames, velocidad) {
  if (!frames || frames.length === 0) {
    return null;
  }

  const indice = floor(frameCount / velocidad) % frames.length;
  return frames[indice];
}

function posicion_x_boton(indice, cantidad) {
  const ancho_boton = 244;
  const espacio = 12;
  const ancho_total = cantidad * ancho_boton + (cantidad - 1) * espacio;
  const inicio = (ancho - ancho_total) / 2;

  return inicio + indice * (ancho_boton + espacio);
}

function mousePressed() {
  const escena = pantallas[pantalla_actual];

  for (let i = 0; i < escena.botones.length; i++) {
    const x = posicion_x_boton(i, escena.botones.length);
    const y = 382;

    if (
      mouseX >= x &&
      mouseX <= x + 244 &&
      mouseY >= y &&
      mouseY <= y + 40
    ) {
      cambiar_pantalla(escena.botones[i].destino);
    }
  }
}

function cambiar_pantalla(destino) {
  pantalla_actual = destino;
}
