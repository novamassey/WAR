
# WAR BROWSER BASED GAME

---
## **WAR** Card Game
>**War** is played by dividing a shuffled deck of cards equally amongst two players.  Each player flips their top card, the player with the higher value card wins and collects both played cards.  If the value of the cards is equal then you have entered **WAR** and each player deals a card face down followed by a card face up and the player with the higher value wins all cards in the play.
---
## Screen Shots of the Games State
---
### Start Page
>On the start page I used a keyframe animation in css to make the game title appear slowly on screen and then stay on screen, awaiting for a click event.  Once clicked there is another fade-away keyframe animation defined in the css but called in the javascript.  The  element was removed after the animation so the game board could be accessed.

<img src = "https://i.imgur.com/5eQHFb2.png" width="700">

### Initial Board

>This board displays the player deck and the computer deck on the outer edges of the screen.  The two cards in the middle represent the first play, the left card for player and the right card of the computer.

<img src = "https://i.imgur.com/FMY0zLG.png" width="700">

### Game in Play
>This board shows the game in play, the "play" button revels the cards pulled from the player deck and computer deck. There are score data displayed in the number of cards in the player deck and computer deck.

<img src = "https://i.imgur.com/w4jytvH.png"  width="700">

### **WAR** Event
>This board shows the **WAR** deck, two cards pulled from the player's deck and the computer's deck. On clicking the button, which text has now been changed to **WAR** a random index will chose the player and computer hand to compare.

<img src = "https://i.imgur.com/ajkNQLX.png" width="700">

### Winner Declared
>This is the final board that has a winning message for the computer who has accumulated all 52 cards in their deck.

<img  src = "https://i.imgur.com/iHBVfRx.png" width="700">

## Technology Used:
 * HTML
 * CSS-_including keyframe animations_
 * CSS card deck library
 * Javascript

 ## Getting Started
 >Here is a link to my project:

 [WAR by Nova Massey](https://novamassey.github.io/WAR/)


Steps
* Click anywhere on start page to start the game
* Click the play button to play the game/compare cards until either player or computer has all 52 cards.

## Next Steps
>Items I would like to explore next on this project are:
* be able to click the **WAR** cards to flip them, rather than relying on the button and random index
* explore further use of keyframe animations, css transitions to make interaction with the page more engaging
* create a **WAR** page that uses an interval or setTimeOut function to display on a full page **THIS MEANS WAR!**
* possible incorporation of gifs to maket the page more entertaining


