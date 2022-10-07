/*<------------CONSTANTS----------->*/
blackjack var: holds integer equal to 21, can use it for if checks


/*<------------STATE VARIABLES----------->*/
-wager variable to hold amount allowed to be bet
-variable that holds an array for player hand
-variable that holds array for dealer hand
-variable that holds array for all cards
-variable that holds winner state

/*<------------CACHED ELEMENTS----------->*/
hit button: to get another card
reset button: resets game by calling on an initialization function
evaluation button
header: most likely to say who wins
modal: Might be something extra if the player runs out of money to wager(maybe)
-variable that will display current card count for player
-variable that will hold current card count for dealer(maybe)

/*<------------EVENT LISTENERS----------->*/
click event on hit button: will invoke a function to place another number in the playerhand arr and also update the ui with this number added
-click event on the evaluation button that compare dealer hand/ player hand only when called

/*<------------FUNCTIONS----------->*
-hit function: possibly choose a random number from the card arr and push it into the player array. Then call the function to iterated over the player arr and update the ui.
-function that initializes the game: puts to two numbers from deck array into both hands array, gives wager amount set number
-function that iterates over player/dealer hand array to render cards to the ui each time it is called
-functions that looks at current data and evaluates who the winners is. It will not be a callback, which gives the player to take hits
-bust function: callback most likely in the update function to see if the player array exceeds 21 at any point