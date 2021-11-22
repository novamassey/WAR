/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
// const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = [
  {rank:'02', points: 2},
  {rank:'03', points: 3},
  {rank:'04', points: 4},
  {rank:'05', points: 5},
  {rank:'06', points: 6},
  {rank:'07', points: 7},
  {rank:'08', points: 8},
  {rank:'09', points: 9},
  {rank:'10', points: 10},
  {rank:'J', points: 11},
  {rank:'Q', points: 12},
  {rank:'K', points: 13},
  {rank:'A', points: 14}, 
];


// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck, playerDeck, computerDeck, playerHand, computerHand, playerScore, computerScore, winner;


/*----- cached element references -----*/
const playGame = document.getElementById('.play');
const warCards = document.querySelectorAll('.war');

/*----- event listeners -----*/
playGame.addEventListener('click', playGame);
warCards.addEventListener('click', renderBoard);

/*----- functions -----*/
function initialize();


function initialize() {
  shuffledDeck = getNewShuffledDeck();
  playerDeck = [];
  computerDeck = [];
  playerHand = [];
  computerHand = [];
  playerScore = 0;
  computerScore = 0;
  winner = null;
  renderScreen ();
  deal();
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    cardLookup.forEach(function(rank, points) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
         value: cardLookUp.points //(rank === 'A' ? 11 : 10)
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
  for(let i = 0; i < shuffledDeck.length; i++) {
    if (i % 2 === 0) {
      playerDeck.push();
    }else { 
      computerDeck.push();
    }
  };

function play(e) {
  playerHand = playerDeck.shift();
  computerHand = computerDeck.shift();
  for ( let i = 0; i < playerHand.length; i++)  { 
        for( let j  =  0; j < computerHand.length;  j++) {
          if (playerHand[i].points > computerHand[j].points) {
            playerDeck.push(playerHand[i] && computerHand[j]);
            playerScore++;
          }else if (playerHand[i].points < computerHand[j].points)  {
            computerDeck.push(playerHand[i] && computerHand[j]);
            computerScore++;
          }else{
            // PLAY WAR FUNCTION
          }
        }
  }
  
 
    
  
  }

  


// function buildMasterDeck() {
//   const deck = [];
//   // Use nested forEach to generate card objects
//   suits.forEach(function(suit) {
//     ranks.forEach(function(rank) {
//       deck.push({
//         // The 'face' property maps to the library's CSS classes for cards
//         face: `${suit}${rank}`,
//         // Setting the 'value' property for game of blackjack, not war
//          value: Number(rank) || cardLookUp[rank] //(rank === 'A' ? 11 : 10)
//       });
//     });
//   });
//   return deck;
// }


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