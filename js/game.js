let app;

if (innerWidth <= 767) {
  app = new PIXI.Application({
    backgroundColor: 0x800080,
    autoResize: true,
    resolution: devicePixelRatio,
    width: 320,
    height: 600
  });
}
else {
  app = new PIXI.Application({
    backgroundColor: 0x800080,
    autoResize: true,
    resolution: devicePixelRatio,
    width: 320,
    height: 600
  });
}

let level = 1;
let tempo = 20;
let containerscore;

const containerMenu = new PIXI.Container();
app.stage.addChild(containerMenu);
document.body.appendChild(app.view);

const containerRetry = new PIXI.Container();
app.stage.addChild(containerRetry);
document.body.appendChild(app.view);

const startText = new PIXI.Text('Start game', {
  fontFamily: 'Windows',
  fontSize: 50,
  fill: '#fff'
});
startText.anchor.set(0.5);
startText.x = app.screen.width / 2;
startText.y = 150;
startText.interactive = true;
startText.cursor = 'pointer';
containerMenu.addChild(startText);
startText.on('pointerdown', startGame);

const thumbTest = PIXI.Sprite.from('./img/thumb1.png');
thumbTest.anchor.set(0.5);
thumbTest.x = app.screen.width / 2;
thumbTest.y = 250;
thumbTest.interactive = true;
thumbTest.cursor = 'pointer';
containerMenu.addChild(thumbTest);
thumbTest.on('pointerdown', startGame);

function startGame() {
  let switchTime = false;

  containerMenu.destroy();

  tempo = tempo + 10;

  const containerGamer = new PIXI.Container();
  app.stage.addChild(containerGamer);
  document.body.appendChild(app.view);

  startText.text = `Time: ${tempo}`;
  startText.style.fontSize = 28;
  startText.interactive = false;
  containerGamer.addChild(startText);

  const levelText = new PIXI.Text('Level: ' + level, {
    fontFamily: 'Windows',
    fill: '#fff'
  });
  levelText.anchor.set(0.5);
  levelText.x = app.screen.width / 2;
  levelText.y = 100;
  levelText.style.fontSize = 28;
  containerGamer.addChild(levelText);

  // ? SOUND
  const soundCard = PIXI.sound.Sound.from('./sound/card.mp3');
  soundCard.volume = .1;
  const soundWin = PIXI.sound.Sound.from('./sound/Applause2.ogg');
  soundWin.volume = .1;
  const soundOk = PIXI.sound.Sound.from('./sound/Item2.ogg');
  soundOk.volume = .1;

  // ^LÓGICA
  const thumb = PIXI.Sprite.from('./img/thumb.png');

  const sprite1 = PIXI.Sprite.from('./img/sprite1.jpg');
  const sprite2 = PIXI.Sprite.from('./img/sprite2.jpg');
  const sprite3 = PIXI.Sprite.from('./img/sprite3.jpg');
  const sprite4 = PIXI.Sprite.from('./img/sprite4.jpg');
  const sprite5 = PIXI.Sprite.from('./img/sprite5.jpg');
  const sprite6 = PIXI.Sprite.from('./img/sprite6.jpg');

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

  let localTeste = 200;

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
      return numero * 100.8;
    }
    else {
      return numero * 100.8;
    }
  }

  // Parte de trás da carta
  function criandoBack(color, index, thumb) {
    const card_back = new PIXI.Graphics();
    typeof color === 'string' ? card_back.beginFill(color) : card_back.beginTextureFill({ texture: color.texture });
    if (innerWidth <= 767) {
      card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? (300 + localTeste) : (200 + localTeste) : (100 + localTeste) : (0 + localTeste), 100, 100, 10);
    }
    else {
      card_back.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? (300 + localTeste) : (200 + localTeste) : (100 + localTeste) : (0 + localTeste), 100, 100, 10)
    }
    card_back.endFill();
    containerGamer.addChild(card_back);
  }

  // Parte da frente da carta
  function criandoFront(index) {
    const card_front = new PIXI.Graphics();
    card_front.beginTextureFill({ texture: thumb.texture });
    if (innerWidth <= 767) {
      card_front.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? (300 + localTeste) : (200 + localTeste) : (100 + localTeste) : (0 + localTeste), 100, 100, 10)
    }
    else {
      card_front.drawRoundedRect(cordenadasX(index), (index >= 3) ? (index >= 6) ? (index >= 9) ? (300 + localTeste) : (200 + localTeste) : (100 + localTeste) : (0 + localTeste), 100, 100, 10)
    }
    card_front.state.data = card[index].tras;
    card_front.interactive = true;
    card_front.buttonMode = true;
    card_front.on('pointerdown', vanish);
    containerGamer.addChild(card_front);
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
          level = level + 1;
          containerGamer.destroy();
          switchTime = true;
          startGame();
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
        }, 150)
      }
    }
  }

  const timerBug = setInterval(() => {
    console.log("Ta pegando")
    if (tempo <= 0 || switchTime === true) {
      clearInterval(timerBug);
      if (tempo <= 0) {
        containerGamer.destroy();
        fimJogo();
      }
    }
    else {
      tempo = tempo - 1;
      startText.text = `Time: ` + tempo;
    }
  }, 1000)

};

function fimJogo() {
  console.log("Fim de jogo");

  const containerscore = new PIXI.Container();
  app.stage.addChild(containerscore);
  // window.location.reload();

  const startText1 = new PIXI.Text(`High level: ${level}\n\nRetry?`, {
    fontFamily: 'Windows',
    fontSize: 50,
    fill: '#fff',
    align: 'center'
  });
  // startText.text = `level: ${tempo}`;
  startText1.anchor.set(0.5);
  startText1.x = app.screen.width / 2;
  startText1.y = 150;
  startText1.style.fontSize = 28;
  startText1.interactive = true;
  startText1.cursor = 'pointer';
  containerscore.addChild(startText1);
  startText1.on('pointerdown', () => {
    level = 1;
    tempo = 20;
    containerscore.destroy();
    startGame();
  });
}