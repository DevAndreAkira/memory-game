let app;

if (innerWidth <= 767) {
  app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    autoResize: true,
    resolution: devicePixelRatio,
    width: 235,
    height: 415
  });
}
else {
  app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    autoResize: true,
    resolution: devicePixelRatio,
    width: 320,
    height: 620
  });
}

document.body.appendChild(app.view);

// ? SOUND
const soundCard = PIXI.sound.Sound.from('./sound/card.mp3');
soundCard.volume = .1;
const soundWin = PIXI.sound.Sound.from('./sound/Applause2.ogg');
soundWin.volume = .1;
const soundOk = PIXI.sound.Sound.from('./sound/Item2.ogg');
soundOk.volume = .1;

// // & AJUSTANDO TAMANHO DE TELA
// // Resize function window
// function resize() {
//   app.renderer.resize(window.innerWidth - '17', window.innerHeight);
// }
// resize();

// window.onresize = () => {
//   resize();
// }

// ^LÓGICA

let colorCards = ['0xff0000', '0x00ffff', '0x0000ff', '0xff00ff', '0xffff00', '0x00FF00'];
// let colorCards = ['red', 'ciano', 'blue'];
let numeroCard = 0;
let card = {};
let tentativas = 0;
let guardando1 = 0;
let guardando2 = 0;
let pontos = 0;

let teste = 0;

function cordenadasX(numero) {
  if (numero >= 3) {
    numero = teste;
    teste = teste + 1;
    if (teste % 3 === 0) {
      teste = 0;
    }
  }
  if (innerWidth <= 767) {
    return numero * 80;
  }
  else {
    return numero * 105;
  }
}

function cordenadasY(numero) {
  return numero * -150;
}

function criandoBack(color, index) {
  const card_back = new PIXI.Graphics();
  card_back.beginFill(color);
  if (innerWidth <= 767) {
    // card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 240 : 160 : 80 : 0, 50, 75, 10)
    card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 315 : 210 : 105 : 0, 75, 100, 10)
  }
  else {
    card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 465 : 310 : 155 : 0, 100, 150, 10)
  } card_back.endFill();
  app.stage.addChild(card_back);
}

function criandoFront(index) {
  const card_front = new PIXI.Graphics();
  card_front.beginFill(0x2d2d2d);
  if (innerWidth <= 767) {
    // card_front.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 240 : 160 : 80 : 0, 50, 75, 10)
    card_front.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 315 : 210 : 105 : 0, 75, 100, 10)
  }
  else {
    card_front.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 465 : 310 : 155 : 0, 100, 150, 10)
  }
  card_front.state.data = card[index].tras;
  card_front.interactive = true;
  card_front.buttonMode = true;
  card_front.on('pointerdown', vanish);
  app.stage.addChild(card_front);
}

const duplicateCharacters = [...colorCards, ...colorCards];
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

shuffledArray.forEach((e, i) => {
  card[i] = {
    frente: shuffledArray[i],
    tras: (shuffledArray[i] === '0xff0000' ? '1' : shuffledArray[i] === '0x00ffff' ? '2' : shuffledArray[i] === '0x0000ff' ? '3' : shuffledArray[i] === '0xff00ff' ? '4' : shuffledArray[i] === '0xffff00' ? '5' : shuffledArray[i] === '0x00FF00' ? '6' : '')
  }
  criandoBack(shuffledArray[i], i);
})

shuffledArray.forEach((e, i) => {
  criandoFront(i);
})

function vanish() {
  soundCard.play();

  if (tentativas === 0) {
    tentativas = tentativas + 1;
    guardando1 = this;
    this.alpha = 0;
    this.interactive = false;
  }
  else {
    guardando2 = this;
    if (guardando2.state.data === guardando1.state.data) {
      pontos = pontos + 1;
      if (pontos === colorCards.length) {
        soundWin.play();
        alert("Parabéns!");
      }
      soundOk.play();
      tentativas = 0;
      this.alpha = 0;
      guardando1.interactive = false;
      guardando2.interactive = false;
    }
    else {
      tentativas = 0;
      this.alpha = 0;
      setTimeout(() => {
        guardando1.alpha = 1;
        guardando2.alpha = 1;
        guardando1.interactive = true;
        guardando2.interactive = true;
      }, 250)
    }
  }
  console.log(this.state.data)
}