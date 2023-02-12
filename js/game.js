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

let nivel = 1;
let tempo = 50;

const containerMenu = new PIXI.Container();
app.stage.addChild(containerMenu);
document.body.appendChild(app.view);

const startText = new PIXI.Text('Iniciar', {
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

  const nivelText = new PIXI.Text('Nível: ' + nivel, {
    fontFamily: 'Windows',
    fill: '#fff'
  });
  nivelText.anchor.set(0.5);
  nivelText.x = app.screen.width / 2;
  nivelText.y = 100;
  nivelText.style.fontSize = 28;
  containerGamer.addChild(nivelText);

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
          nivel = nivel + 1;
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
      containerGamer.destroy();

      const containerMenu2 = new PIXI.Container();
      app.stage.addChild(containerMenu2);
      document.body.appendChild(app.view);

      const textRetry = new PIXI.Text(`Pontuação:  ${pontos}`);
      textRetry.anchor.set(.5);
      textRetry.x = app.screen.width / 2;
      textRetry.y = app.screen.height / 2;
      textRetry.interactive = true;
      textRetry.cursor = 'pointer';
      containerMenu2.addChild(textRetry);
      textRetry.on('pointerdown', startGame);
      containerMenu2.destroy();
    }
    else {
      tempo = tempo - 1;
      startText.text = `Time: ` + tempo;
    }
  }, 1000)

};