/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  '02' : 2,
  '03' : 3,
  '04' : 4,
  '05' : 5,
  '06' : 6,
  '07' : 7,
  '08' : 8,
  '09' : 9,
  '10' : 10,
  'J' : 11,
  'Q' : 12,
  'K' : 13,
  'A': 14, 
};


// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck, playerDeck, computerDeck, playerHand, computerHand, playerScore, computerScore, winner;


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
function initialize();

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
         value: Number(rank) || cardLookUp[rank] //(rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function initialize() {
  shuffledDeck = getNewShuffledDeckplayer;
  playerDeck = [];
  computerDeck = [];
  playerHand = [];
  computerHand = [];
  playerScore = 0;
  computerScore = 0;
  winner = null;
  renderScreen ();
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || cardLookup[rank]
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function deal() {
  shuffledDeck.forEach(function(card, index){
    if (card[index] % 2 === 0) {
      playerDeck.push();
    }else { 
      computerDeck.push();
    }
  });

function play() {

  
}









// function renderNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   shuffledDeck = getNewShuffledDeck();
//   renderDeckInContainer(shuffledDeck, shuffledContainer);
// }




// function renderDeckInContainer(deck, container) {
//   container.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

// renderNewShuffledDeck();