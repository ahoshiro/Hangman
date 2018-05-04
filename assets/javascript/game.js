// alert ("hello world");
(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

    function setup() {
        /* start config options */
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 6;
        words = ["nirvana", "pealjam", "stp", "aliceinchains", "gorillaz", "soundgarden", "foofighters", "zombie", "templeofthedog", "radiohead", 
                "redhotchillipeppers", "greenday", "weezer", "nineinchnails", "deftones", "tool", "sublime", "korn", "faithnomore", "garbage", "inxs"];
        messages = {
            win: 'You win! You really know your stuff!',
            lose: 'Game over! Go study some more 90s alternative rock bands!',
            guessed: ' already guessed, try again pizza boy...',
            validLetter: 'Please enter a letter from A-Z'
        };

        // console.log(availableLetters);
        // console.log(words);
        // console.log(messages.win);
        /* end config options */

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;

        /* choose a word */
        currentWord = words[Math.floor(Math.random() * words.length)];

        // console.log(currentWord);

        /* make #man and #output blank, create vars for later access */
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);

        // Resets the hangman picture
        document.getElementById("hangmanIcons").src = "assets/images/Hangman-0.png";
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;

    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = '';
        
    };

    /* main guess function when user clicks #guess */
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                        
                    }
                }
                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    
                    if (lives === 6) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-0.png";}
                    
                    else if (lives === 5) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-1.png";}
                                
                        
                    else if (lives === 4) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-2.png";}
                            
                    else if (lives === 3) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-3.png";}
                                
                    else if (lives === 2) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-4.png";}
                                    
                    else if (lives === 1) {
                        document.getElementById("hangmanIcons").src = "assets/images/Hangman-5.png";}
                                                            
                    else if (lives === 0) 
                        {document.getElementById("hangmanIcons").src = "assets/images/Hangman-6.png";
                        gameOver();}
                }
            }
            /* not a valid letter, error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* no letter entered, error */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());


