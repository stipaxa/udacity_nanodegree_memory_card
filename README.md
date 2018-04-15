# udacity_nanodegree_memory_card

## How the game works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

### Game Behavior

Criteria | Meets specifications
--- | ---- 
Memory Game Logic | The game randomly shuffles the cards. A user wins once all cards have successfully been matched.
Congratulations Popup | When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.
Restart Button | A restart button allows the player to reset the game board, the timer, and the star rating.
Star Rating | The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it should display 3 stars. After some number of moves, it should change to a 2 star rating. After a few more moves, it should change to a 1 star rating.
Timer | When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.
Move Counter | Game displays the current number of moves a user has made.

#### Addition functionality
Animation when cards are hovered, clicked, unsuccessfully matched, and successfully matched.

[based on UDACITY PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/591/view)
