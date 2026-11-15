//https://youtu.be/XLeuG7p_PF4 (video yt)

let juego;

let imagenArchivo;
let imagenDetective;
let imagenBandeja;
let imagenesPistas = [];
let imagenesFalsas = [];
let imagenesObstaculos = [];

let musicaSuspenso;
let sonidoRecoleccion;
let sonidoColision;

let nombresPistas = [
  "Recibo de café",
  "Registro de la llave duplicada",
  "Ficha del subsuelo",
  "Polvo plateado",
  "Informe del laboratorio"
];

let nombresPistasCortos = [
  "Recibo",
  "Llave",
  "Subsuelo",
  "Polvo",
  "Informe"
];

let nombresFalsas = [
  "Catálogo viejo",
  "Taza sin recibo",
  "Papel ilegible"
];

function preload() {
  imagenArchivo = loadImage("data/archivo.png");
  imagenDetective = loadImage("data/detective0.png");
  imagenBandeja = loadImage("data/bandeja.png");

  for (let i = 0; i < 5; i++) {
    imagenesPistas.push(loadImage("data/prueba" + i + ".png"));
  }

  for (let i = 0; i < 3; i++) {
    imagenesFalsas.push(loadImage("data/falsa" + i + ".png"));
  }

  for (let i = 0; i < 2; i++) {
    imagenesObstaculos.push(loadImage("data/obstaculo" + i + ".png"));
  }

  musicaSuspenso = loadSound("data/suspenso.wav");
  sonidoRecoleccion = loadSound("data/prueba.wav");
  sonidoColision = loadSound("data/choque.wav");
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.draw();
}

function mousePressed() {
  juego.mousePressed();
}

class DetectiveCanasta {
  constructor() {
    this.x = width / 2;
    this.y = height - 24;
    this.ancho = 120;
    this.alto = 30;
  }

  mover() {
    this.x = mouseX;
    this.x = constrain(this.x, this.ancho / 2, width - this.ancho / 2);
  }

  dibujar() {
    image(imagenDetective, this.x - 27, this.y - 101, 54, 88);
    image(
      imagenBandeja,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }

  colision(objeto) {
    let bordeX = constrain(
      objeto.x,
      this.x - this.ancho / 2,
      this.x + this.ancho / 2
    );
    let bordeY = constrain(
      objeto.y,
      this.y - this.alto / 2,
      this.y + this.alto / 2
    );

    return dist(objeto.x, objeto.y, bordeX, bordeY) < objeto.ancho / 2;
  }
}

class Pista {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.nombre = nombresPistas[tipo];
    this.imagen = imagenesPistas[tipo];
    this.ancho = 34;
    this.alto = 34;
    this.velocidad = random(2, 4);
  }

  mover() {
    this.y += this.velocidad;
  }

  dibujar() {
    image(
      this.imagen,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }

  fueraDePantalla() {
    return this.y > height + this.alto;
  }
}

class PistaFalsa {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.nombre = nombresFalsas[tipo];
    this.imagen = imagenesFalsas[tipo];
    this.ancho = 36;
    this.alto = 36;
    this.velocidad = random(3, 5);
  }

  mover() {
    this.y += this.velocidad;
  }

  dibujar() {
    image(
      this.imagen,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }

  fueraDePantalla() {
    return this.y > height + this.alto;
  }
}

class Obstaculo {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.imagen = imagenesObstaculos[tipo];
    this.ancho = 46;
    this.alto = 46;
    this.velocidad = random(2, 3);
    this.velocidadX = random(1, 2);
    this.direccion = floor(random(0, 2)) * 2 - 1;
  }

  mover() {
    this.x += this.velocidadX * this.direccion;
    this.x = constrain(this.x, this.ancho / 2, width - this.ancho / 2);

    if (this.x <= this.ancho / 2) {
      this.direccion = 1;
    }

    if (this.x >= width - this.ancho / 2) {
      this.direccion = -1;
    }

    this.y += this.velocidad;
  }

  dibujar() {
    image(
      this.imagen,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }

  fueraDePantalla() {
    return this.y > height + this.alto;
  }
}

class Juego {
  constructor() {
    this.estado = "inicio";
    this.detective = new DetectiveCanasta();
    this.pistas = [];
    this.pistasFalsas = [];
    this.obstaculos = [];
    this.pistasReunidas = [false, false, false, false, false];
    this.puntos = 0;
    this.vidas = 3;
    this.tiempo = 45;
    this.frameInicio = 0;
    this.mensaje = "El director está por cerrar el archivo.";
  }

  draw() {
    if (this.estado == "juego") {
      this.actualizar();
    }

    if (this.estado == "inicio") {
      this.dibujarInicio();
    } else if (this.estado == "juego") {
      this.dibujarJuego();
    } else {
      this.dibujarResultado();
    }
  }

  dibujarInicio() {
    image(imagenArchivo, 0, 0, width, height);

    push();
    fill(8, 16, 27, 220);
    rect(52, 20, 696, 360, 10);
    fill(230, 190, 105);
    textFont("Courier Prime");
    textAlign(CENTER);
    textSize(17);
    text("EL CASO DEL DIAMANTE AURORA", width / 2, 55);
    fill(255);
    textSize(27);
    text("RECOLECCIÓN DE PRUEBAS", width / 2, 94);
    textSize(15);
    text(
      "La detective Ríos debe reunir las pruebas antes de que cierre el archivo.",
      width / 2,
      127
    );
    text(
      "Mové la bandeja con el mouse y atrapá las cinco evidencias:",
      width / 2,
      158
    );
    text(
      "recibo de café, llave duplicada, ficha del subsuelo,",
      width / 2,
      183
    );
    text(
      "polvo plateado e informe del laboratorio.",
      width / 2,
      205
    );
    text("Evita las pistas falsas y los obstaculos.", width / 2, 235);
    text("Tenés 3 vidas y 45 segundos.", width / 2, 258);
    text("Por Florencia Gomez Orieta", width / 2, 287);
    fill(125, 84, 43);
    rect(310, 320, 180, 42, 6);
    fill(255);
    textSize(18);
    text("INICIAR", width / 2, 347);
    pop();
  }

  iniciar() {
    this.estado = "juego";
    this.detective = new DetectiveCanasta();
    this.pistas = [];
    this.pistasFalsas = [];
    this.obstaculos = [];
    this.pistasReunidas = [false, false, false, false, false];
    this.puntos = 0;
    this.vidas = 3;
    this.tiempo = 45;
    this.frameInicio = frameCount;
    this.mensaje = "Reuní las cinco pruebas y evitá los objetos incorrectos.";

    if (musicaSuspenso && !musicaSuspenso.isPlaying()) {
      musicaSuspenso.setVolume(0.3);
      musicaSuspenso.loop();
    }
  }

  actualizar() {
    this.tiempo = 45 - floor((frameCount - this.frameInicio) / 60);

    if (this.tiempo <= 0) {
      this.tiempo = 0;
      this.terminar("perder");
      return;
    }

    this.detective.mover();

    if (random(1) < 0.025) {
      this.pistas.push(
        new Pista(random(24, width - 24), -24, floor(random(0, 5)))
      );
    }

    if (random(1) < 0.006) {
      this.pistasFalsas.push(
        new PistaFalsa(random(24, width - 24), -24, floor(random(0, 3)))
      );
    }

    if (random(1) < 0.004) {
      this.obstaculos.push(
        new Obstaculo(random(30, width - 30), -30, floor(random(0, 2)))
      );
    }

    for (let i = this.pistas.length - 1; i >= 0; i--) {
      this.pistas[i].mover();

      if (this.detective.colision(this.pistas[i])) {
        let tipo = this.pistas[i].tipo;

        if (!this.pistasReunidas[tipo]) {
          this.pistasReunidas[tipo] = true;
          this.puntos++;
          this.mensaje = "Prueba reunida: " + this.pistas[i].nombre;
          this.reproducirEfecto(sonidoRecoleccion);
        } else {
          this.mensaje = "Esa prueba ya estaba en la carpeta.";
        }

        this.pistas.splice(i, 1);

        if (this.puntos >= 5) {
          this.terminar("ganar");
          return;
        }
      } else if (this.pistas[i].fueraDePantalla()) {
        this.pistas.splice(i, 1);
      }
    }

    for (let i = this.pistasFalsas.length - 1; i >= 0; i--) {
      this.pistasFalsas[i].mover();

      if (this.detective.colision(this.pistasFalsas[i])) {
        this.vidas--;
        this.mensaje = "Pista falsa: " + this.pistasFalsas[i].nombre;
        this.reproducirEfecto(sonidoColision);
        this.pistasFalsas.splice(i, 1);

        if (this.vidas <= 0) {
          this.terminar("perder");
          return;
        }
      } else if (this.pistasFalsas[i].fueraDePantalla()) {
        this.pistasFalsas.splice(i, 1);
      }
    }

    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      this.obstaculos[i].mover();

      if (this.detective.colision(this.obstaculos[i])) {
        this.vidas--;
        this.mensaje = "La detective choco con un obstáculo.";
        this.reproducirEfecto(sonidoColision);
        this.obstaculos.splice(i, 1);

        if (this.vidas <= 0) {
          this.terminar("perder");
          return;
        }
      } else if (this.obstaculos[i].fueraDePantalla()) {
        this.obstaculos.splice(i, 1);
      }
    }
  }

  dibujarJuego() {
    image(imagenArchivo, 0, 0, width, height);

    for (let i = 0; i < this.pistas.length; i++) {
      this.pistas[i].dibujar();
    }

    for (let i = 0; i < this.pistasFalsas.length; i++) {
      this.pistasFalsas[i].dibujar();
    }

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].dibujar();
    }

    this.detective.dibujar();

    push();
    noStroke();
    fill(8, 16, 27, 225);
    rect(0, 0, width, 98);
    fill(255);
    textAlign(LEFT);
    textSize(16);
    text("PRUEBAS: " + this.puntos + " / 5", 18, 25);
    text("VIDAS: " + this.vidas, 270, 25);
    text("TIEMPO: " + this.tiempo + " s", 440, 25);
    textSize(12);

    for (let i = 0; i < this.pistasReunidas.length; i++) {
      let marca = "[ ] ";

      if (this.pistasReunidas[i]) {
        marca = "[X] ";
      }

      text(marca + nombresPistasCortos[i], 18 + i * 153, 53);
    }

    text(this.mensaje, 18, 80);
    pop();
  }

  dibujarResultado() {
    image(imagenArchivo, 0, 0, width, height);

    push();
    fill(8, 16, 27, 225);
    rect(70, 55, 660, 290, 10);
    textAlign(CENTER);

    if (this.estado == "ganar") {
      fill(231, 194, 112);
      textSize(28);
      text("CASO ENCAMINADO", width / 2, 112);
      fill(255);
      textSize(16);
      text(
        "Rios reunio las cinco pruebas y puede acusar al director.",
        width / 2,
        157
      );
      text(
        "Se desbloquea el recorrido para recuperar el Diamante Aurora.",
        width / 2,
        184
      );
    } else {
      fill(210, 115, 105);
      textSize(28);
      text("EL ARCHIVO CERRO", width / 2, 112);
      fill(255);
      textSize(16);
      text("Rios no reunio pruebas suficientes a tiempo.", width / 2, 157);
      text("La investigacion sigue por una ruta alternativa:", width / 2, 184);
      text(
        "una acusación apresurada o la huida del culpable.",
        width / 2,
        210
      );
    }

    textSize(15);
    text("Pruebas reunidas: " + this.puntos + " / 5", width / 2, 248);
    fill(125, 84, 43);
    rect(310, 280, 180, 42, 6);
    fill(255);
    textSize(17);
    text("REINICIAR", width / 2, 307);
    pop();
  }

  reproducirEfecto(sonido) {
    if (sonido) {
      sonido.setVolume(0.65);
      sonido.play();
    }
  }

  terminar(resultado) {
    this.estado = resultado;

    if (musicaSuspenso && !musicaSuspenso.isPlaying()) {
  musicaSuspenso.setVolume(0.7);
  musicaSuspenso.loop();
}
  }

  mousePressed() {
    if (this.estado == "inicio") {
      if (mouseX > 310 && mouseX < 490 && mouseY > 320 && mouseY < 362) {
        this.iniciar();
      }
    } else if (this.estado == "ganar") {
      if (mouseX > 310 && mouseX < 490 && mouseY > 280 && mouseY < 322) {
        this.iniciar();
      }
    } else if (this.estado == "perder") {
      if (mouseX > 310 && mouseX < 490 && mouseY > 280 && mouseY < 322) {
        this.iniciar();
      }
    }
  }
}
