/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookup = {
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14, 
};

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
console.log(masterDeck);
/*----- app's state (variables) -----*/
let shuffledDeck, playerDeck, computerDeck, playerHand, computerHand, playerWarDeck, computerWarDeck, playerScore, computerScore, winner;


/*----- cached element references -----*/
// const playGame = document.getElementById('play');
const warCards = document.querySelectorAll('.war');

/*----- event listeners -----*/
// playGame.addEventListener('click', play);
// warCards.addEventListener('click', renderBoard);

/*----- functions -----*/
initialize();

function initialize() {
  shuffledDeck = getNewShuffledDeck();
  playerDeck = [];
  computerDeck = [];
  playerHand = [];
  computerHand = [];
  playerWarDeck = [];
  computerWarDeck = [];
  playerScore = 0;
  computerScore = 0;
  winner = null;
  deal();
  // renderScreen ();
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
  shuffledDeck.forEach(function(card, index) {
    if(index % 2 === 0){
      playerDeck.push(card);
    }else{
      computerDeck.push(card);
    }
  });
}

// function play(e) {
//   playerHand = playerDeck.shift();
//   computerHand = computerDeck.shift();
//   for ( let i = 0; i < playerHand.length; i++)  { 
//         for( let j  =  0; j < computerHand.length;  j++) {
//           if (playerHand[i].points === computerHand[j].points){
//             playerWarDeck = playerDeck.splice(0, 2);//take two cards from deck to warDeck
//             computerWarDeck = computerDeck.splice(0, 2);
//             //need function to wait for clicked card to determine which cards to compare
            

//           }else if (playerHand[i].points > computerHand[j].points) {
//             playerDeck.push(playerHand[i] && computerHand[j]);
//             playerScore++;
//           }else{(playerHand[i].points < computerHand[j].points)  {
//             computerDeck.push(playerHand[i] && computerHand[j]);
//             computerScore++;
//           }
//         }
//   }
  

  





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
//