# Blackjack 😊
Browser version of the popular card game blackjack. The goal of the game is to get to or as close as you can to 21 without going over (blackjack).
Face cards are worth 10 and the Ace can either be 1 or 11 depending on what works better for the player. If you do exceed 21, you "bust" and automatically lose, 
the amount you bet from your bank. Other wise whoever has the highest number without going over 21 wins, 
either the player or dealer.

# Showcase

![Intro Screen](/assets/images/intro.png?raw=true "Optional Title")

You can not interact with the game until you place your bet located in the input field every round. 
It must be an integer and it can not exceed what you have already in the bank. If these conditions aren't meant
the submit button to enter your bet will not work. After you do, the HIT and STAND button will be enabled and you can
begin playing. The dealer holds two cards, but the other is only revealed after the player stands, so choose carefully.
Take a HIT to increase your chances of drawing closer to 21 or even blackjack. Click STAND to compare your hand to the dealers.
If you lose, you lose your bet, if you win you keep your bet and win the amount you bet.

![Outro Screen](/assets/images/game-over.png?raw=true "Optional Title")

If you hit zero in your bank, the game is over and you will be unable to interact with the DOM elements
on the board or input a wager amount. You must press the reset button, which will be indicated by the button
to get the user's attention.

# Technologies Used
- JavaScript
- HTML
- CSS
- CardStarter CSS Library

[Try it out here.](https://jcameren.github.io/sei-project-1/)

# Improvements

1. Definitely responsiveness. I definitely took a lot of time to make sure the game logic was at MVP before the deadline approached and didn't really
get into breakpoints and media queries. It's really only meant for desktops amd laptop viewports. So re-visiting this and using some responsive
units or media queries would elevate this project.(*COMPLETED*)

2. Ace Card Value: In the app, the ace card is set only to hold a value of 11. I think adding a feature to make it toggle between two values depending on the hand
would complete this from a logic perspective.

3. Input Alert: A feature to improve the UX aspect would be to alert the user to their input error. For example, if the user entered a number greater
than whats in their bank, an alert in the DOM would appear and read as that. And if their bet input was not a number, it would read as that as well.
(*COMPLETED*)
