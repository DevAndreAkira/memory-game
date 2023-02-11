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

const sprite1 = PIXI.Sprite.from('./img/sprite1.jpg');
const sprite2 = PIXI.Sprite.from('./img/sprite2.jpg');
const sprite3 = PIXI.Sprite.from('./img/sprite3.jpg');
const sprite4 = PIXI.Sprite.from('./img/sprite4.jpg');
const sprite5 = PIXI.Sprite.from('./img/sprite5.jpg');
const sprite6 = PIXI.Sprite.from('./img/sprite6.jpg');


// sprite1.width = 150;
// sprite2.width = 150;
// sprite3.width = 150;
// sprite4.width = 150;
// sprite5.width = 150;
// sprite6.width = 150;

// Determino o número de cores que terá nas cartas
let colorCards = [
  sprite1, 
  sprite2, 
  sprite3, 
  sprite4, 
  sprite5, 
  sprite6
];
let card = {};
let tentativas = 0;
let guardando1 = 0;
let guardando2 = 0;
let pontos = 0;

let teste = 0;

// Função que irá retornar à posição x=0 a cada 3 cartas
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
    return numero * 100;
  }
}

// Parte de trás da carta
function criandoBack(color, index) {
  const card_back = new PIXI.Graphics();
  typeof color === 'string' ? card_back.beginFill(color) : card_back.beginTextureFill({ texture: color.texture });
  if (innerWidth <= 767) {
    card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 315 : 210 : 105 : 0, 75, 100, 10);
  }
  else {
    card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? 465 : 310 : 155 : 0, 100, 150, 10)
  } 
  card_back.endFill();
  app.stage.addChild(card_back);
}

// Parte da frente da carta
function criandoFront(index) {
  const card_front = new PIXI.Graphics();
  card_front.beginFill(0x2d2d2d);
  if (innerWidth <= 767) {
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

// Duplicando o array de cores e embaralhando
const duplicateCharacters = [...colorCards, ...colorCards];
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

// Gerando as cartas e setando um número conforme sua cor ou imagem
shuffledArray.forEach((e, i) => {
  card[i] = {
    frente: shuffledArray[i],
    tras: (shuffledArray[i] === sprite1 ? '1' : shuffledArray[i] === sprite2 ? '2' : shuffledArray[i] === sprite3 ? '3' : shuffledArray[i] === sprite4 ? '4' : shuffledArray[i] === sprite5 ? '5' : shuffledArray[i] === sprite6 ? '6' : '')
  }
  criandoBack(shuffledArray[i], i);
})

shuffledArray.forEach((e, i) => {
  criandoFront(i);
})

// Função dispara ao clicar na carta
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
      }, 50)
    }
  }
}