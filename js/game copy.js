// console.clear()

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  autoResize: true,
  resolution: devicePixelRatio,
});
document.body.appendChild(app.view);

// // ! CONTAINERS - Acho q não precisa...
// let container = new PIXI.Container();
// app.stage.addChild(container)



// ? SOUND
const soundCard = PIXI.sound.Sound.from('../sound/card.mp3');

// & AJUSTANDO TAMANHO DE TELA
// Resize function window
function resize() {
  app.renderer.resize(window.innerWidth - '17', window.innerHeight);
  card_back.position.set(app.screen.width / 2, app.screen.height / 2);
  card_front.position.set(app.screen.width / 2, app.screen.height / 2);
}

window.onresize = () => {
  resize();
}

// ^LÓGICA

let colorCards = ['0xff0000', '0x00ffff', '0x0000ff'];

let arrayFront = [];

function cordenadasX(numero) {
  return numero * -100;
}

function cordenadasY(numero) {
  return numero * -150;
}

const card_back = new PIXI.Graphics();
const card_front = new PIXI.Graphics();

function criandoBack(color, index, jindex) {
  card_back.beginFill(color);
  card_back.drawRoundedRect(cordenadasX(index), cordenadasY(jindex), 100, 150, 10);
  card_back.endFill();
  app.stage.addChild(card_back);
}

function criandoFront(index, jindex) {
  card_front.beginFill(0x2d2d2d);
  card_front.drawRoundedRect(cordenadasX(index), cordenadasY(jindex), 100, 150, 10)
  arrayFront.push(card_front);
}

colorCards.forEach((e, i) => {
  colorCards.forEach((e, j) => {
    criandoBack(colorCards, i, j);
    criandoFront(i, j);
  })
})

arrayFront.forEach((e, i) => {
  arrayFront[i].interactive = true;
  arrayFront[i].buttonMode = true;
  app.stage.addChild(e);
})

arrayFront[0].on('pointerdown', onClick);

function onClick() {
  console.log(this)
  soundCard.play();
}


// criandoBack(colorCards[1]);
criandoFront();
resize();


const grid = document.querySelector('.grid');

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`AEEEE, GANHOU CARAIO!`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

window.onload = () => {
  loadGame();
}
